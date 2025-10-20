import {defineStore} from 'pinia'
import type {Ref} from 'vue'
import {inject, ref} from 'vue'
import type {Authorized, ChatMessage, Context, Extension, NotifySub} from '@own3d/sdk'
import {useAuth, useChat, useContext, useSocket} from '@own3d/sdk'

export const useExtensionStore = defineStore('extension', () => {
    const user: Ref<Authorized | null> = ref(null)
    const context: Ref<Context> = ref({} as Context)

    const extension: Extension = inject('extension') as Extension
    const {onContext} = useContext(extension)
    const {onAuthorized} = useAuth(extension)
    const {on} = useSocket(extension)
    const {onMessage} = useChat(extension)

    /**
     * Receive context updates in real time
     *
     * context - the new context object
     * changed - the array of keys that changed in this update
     *
     * Example: { environment: 'production', language: 'en', forms?: { ... } }
     */
    onContext(<T extends Partial<Context>>(newContext: T, changed: ReadonlyArray<keyof T>) => {
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
     * Receive streaming platform events in real time
     *  (e.g. follows, subscriptions, donations, etc.)
     *
     * See Event Types in NotifySub for full list of event types.
     */
    on('notifysub', (data: NotifySub) => {
        // todo: handle notifysub events here if needed
        console.log('Received notifysub event:', data)
    })

    /**
     * Receive streaming platform chat message events in real time
     *
     * See Message Protocol → Message Reference for full schema and fragment types for chat messages.
     */
    onMessage((data: ChatMessage) => {
        // todo: handle chat message events here if needed
        console.log('Received chat message event:', data)
    })

    return {
        extension,
        user,
        context,
    }
})