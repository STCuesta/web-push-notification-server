import BaseController from "../base/controller";
import { subscriptionDB } from "../subscription/db";
import * as webpush from 'web-push'
import { userInChannels } from "../channel/db";
import dotenv from "dotenv"

dotenv.config()

webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

class Message extends BaseController{
    constructor(app:any){
        super(app)
    }

    init(){
        this.register('post','/message/:from/:to',this.message.bind(this))
        super.init()
    }



    sendPushMessage(uuid:string,message:any){
        console.log("Send notification:>",message)
        webpush.sendNotification(subscriptionDB[uuid],JSON.stringify({
            title:message.sender,
            body:message.text
        })).catch(e=>{
            console.log(e.message)
        })
    }

    message(req:any,res:any){
        const uuid = req.param("to")
        const message = req.body
        console.log("To:>",uuid)
        console.log("Message:>",message)
        console.log("Subscriptions:>",subscriptionDB)
        if(subscriptionDB[uuid]){
            this.sendPushMessage(uuid,message)
        }else if(userInChannels[uuid]){
           const users_uuid =  Object.keys(userInChannels[uuid]);
           for(let i =0,length = users_uuid.length;i<length;i++){
               if(subscriptionDB[users_uuid[i]]){
                   this.sendPushMessage(users_uuid[i],message)
               }
           }
        }
        res.status(200).send({success:true})
    }

}

export default Message