import {defineStore} from 'pinia'
import type {Ref} from 'vue'
import {inject, ref} from 'vue'
import type {Authorized, Context, Extension} from '@own3d/sdk/types'
import {useContext} from '@own3d/sdk/context'
import {useAuth} from '@own3d/sdk/auth'
import {useSocket} from '@own3d/sdk/socket'

export const useExtensionStore = defineStore('extension', () => {
    const user: Ref<Authorized | null> = ref(null)
    const context: Ref<Context | null> = ref(null)

    const extension: Extension = inject('extension') as Extension
    const {onContext} = useContext(extension)
    const {onAuthorized} = useAuth(extension)
    const {on} = useSocket(extension)

    /**
     * Receive context updates in real time
     *
     * context - the new context object
     * changed - the array of keys that changed in this update
     *
     * Example: { environment: 'production', language: 'en', forms?: { ... } }
     */
    onContext((newContext, changed) => {
        for (const key of changed) {
            context.value = {...context.value, [key]: newContext[key]}
        }
    }, {immediate: true})

    /**
     * Internal listener for the authorization event, which is triggered by the extension
     */
    onAuthorized((_user: Authorized) => {
        user.value = _user
    })

    /**
     * Receive streaming platform and extension events in real time
     *  (e.g. subscriptions, donations, chat events, remote-config updates).
     *
     * See Event Types in NotifySub for full list of event types.
     * See Message Protocol → Message Reference for full schema and fragment types for chat messages.
     */
    on('notifysub', (data) => {
        // todo: handle notifysub events here if needed
        console.log('Received notifysub event:', data)
    })

    return {
        extension,
        user,
        context,
    }
})