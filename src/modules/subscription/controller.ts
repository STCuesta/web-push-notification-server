import BaseController from "../base/controller";
import { subscriptionDB } from "./db";




class Subscription extends BaseController{
    constructor(app:any){
        super(app)
    }

    init(){
        this.register("post","/notification/subscription/:uuid/register",this._register.bind(this))
        this.register("get","/notification/subscription/:uuid/remove",this.unregister.bind(this))
        super.init()
    }

    _register(req:any,res:any){
        const uuid = req.param('uuid')
        const subscription = req.body
        subscriptionDB[uuid] = subscription
        res.status(200).send({success:true})
    }

    unregister(req:any,res:any){
        const uuid = req.param('uuid')
        subscriptionDB[uuid] = undefined
        res.status(200).send({success:true})
    }


}

export default Subscription;