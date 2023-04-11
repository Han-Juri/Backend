import { messagesModel } from '../db/models/messages.model.js'

export default class MessagesManager{

    async sendMessage(){
        try {
            const newMessage = await messagesModel.create(obj)
            return newMessage
        } catch(error) {
            console.log(error)
        }
    }

    async getMessages() {
        try {
            const messages = await messagesModel.find()
            return messages
        } catch(error){
            console.log(error)
        }
    }
}