import express from 'express'
import UserRouter from "./api/route/UserRouter"

class Server {
	// app 타입 지정
	public app: express.Application
	
	// 생성자
	constructor() {
		this.app = express()	
	}
}

const server = new Server().app

server.use(UserRouter);
server.set('port', 3001) 
server.listen(server.get('port'), ()=> {
	console.log(`${server.get('port')} server is Running`)
}).on('error',err => {
    console.log(`Error message ${err}`);
})
