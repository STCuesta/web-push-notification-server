class BaseController{

    private registeredEndpoints:any[]=[]
    constructor(private app:any){
    }

    init(){
        this.registeredEndpoints.forEach(item=>{
            console.log(item)
            if(this.app[item.protocol])
                this.app[item.protocol](item.path,item.func)
            else
                console.log("No protocol found: ",item.protocol)
        })
    }

    register(protocol:string,path:(string | RegExp),func:any){
        this.registeredEndpoints.push({protocol,path,func})
    }
}

export default BaseController;