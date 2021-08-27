class BaseMiddleware{

    private registeredFunctions:any[]=[]
        constructor(private app:any){
    }

    init(){
        this.registeredFunctions.forEach(item=>{
            if(item.path)
                this.app.use(item.path,item.func)
            else{
                this.app.use(item.func)
            }
        })
    }

    register(func:any,path?:(string | RegExp),){
        this.registeredFunctions.push({path,func})
    }
}
export default BaseMiddleware;