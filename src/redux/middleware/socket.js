export const socketMiddleware= (socket)=>(params)=>(next)=>(action)=>{
    const {dispatch, getState}= params
    const {type} =action
    switch(type){
        case 'socket/connet':
            socket.connect()
            socket.on('open', ()=>{})
            socket.on('message', ()=>{})
            socket.on('close', ()=>{})
            break
        case "socket/disconnect":
            socket.disconnect()
            break
        default:
            break
    }
    return next (action)
}

