import { uuid } from "uuidv4";
import BaseController from "../base/controller";
import { channelList, userInChannels } from "./db";




class Channel extends BaseController{
    constructor(app:any){
        super(app)
    }

    init(){
        this.register('get','/channels',this.list.bind(this))
        this.register('post','/channel/create',this.create.bind(this))
        this.register('get','/channel/:user_uuid/join/:channel_uuid',this.join.bind(this))
        this.register('get','/channel/:user_uuid/disjoin/:channel_uuid',this.disjoin.bind(this))
        super.init()
    }

    list(req:any,res:any){
        req.status(200).send({success:true,channels:channelList})
    }

    create(req:any,res:any){
        channelList.push({
            uuid,
            name:req.body.name
        })
        res.status(200).send({success:true})
    }

    join(req:any,res:any){
        const user_uuid = req.param('user_uuid')
        const channel_uuid = req.param('channel_uuid')
        if(!userInChannels[channel_uuid])
            userInChannels[channel_uuid] = {}
        userInChannels[channel_uuid][user_uuid] = true
        res.status(200).send({success:true})
    }

    disjoin(req:any,res:any){
        const user_uuid = req.param('user_uuid')
        const channel_uuid = req.param("chanel_uuid")
        if(userInChannels[channel_uuid] && userInChannels[channel_uuid][user_uuid]){
            userInChannels[channel_uuid][user_uuid] = undefined;
        }
        res.status(200).send({success:true})
    }

}

export default Channel