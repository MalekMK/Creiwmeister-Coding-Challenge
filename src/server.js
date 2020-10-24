import express from 'express';
import routes from "./routes.js"
import cors from 'cors';

const app = express();
app.use(cors());

app.use(routes);
app.listen(3001, () =>  console.log('Server Started!')) // starting the server