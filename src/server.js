import express from 'express';
import routes from "./routes.js"

const app = express();

app.use(routes);
app.listen(3001, () =>  console.log('Server Started!')) // starting the server