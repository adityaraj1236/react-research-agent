import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import dotenv from 'dotenv';
import resarchRoutes from './routes/resarchRoutes.ts';

dotenv.config();
const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json()) ; 

app.get('/' ,(req: express.Request, res: express.Response) => {
    res.send('Hello World!');
})




//pehle routes baad mein server listen karna chahiye,
//  taki server start hone se pehle saare routes define ho jayein

app.use('/v1/api' , resarchRoutes) ; 

server.listen(3000 ,()=>{
    console.log('Server is running on port 3000');
});