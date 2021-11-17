import express from 'express'

class Server {
	// app 타입 지정
	public app: express.Application
	
	// 생성자
	constructor() {
		this.app = express()
	}
}

const server = new Server().app
server.set('port', 3000) 
server.listen(server.get('port'), ()=> {
	console.log(`${server.get('port')} server is Running`)
}).on('error',err => {
    console.log(`Error message ${err}`);
})