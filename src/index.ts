import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

const app = express();
const server = createServer(app);

app.use(cors());

app.get('/' ,(req: express.Request, res: express.Response) => {
    res.send('Hello World!');
})




//pehle routes baad mein server listen karna chahiye, taki server start hone se pehle saare routes define ho jayein

server.listen(3000 ,()=>{
    console.log('Server is running on port 3000');
});