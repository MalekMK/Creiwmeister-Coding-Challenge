import express from 'express';

const routes = express.Router();

routes.get('/', async (request, response) => {
    return response.json({"message": "success"});    
});

routes.get('/id/:userId', async (request, response) => {
    return response.json({"id": request.params.userId});
});

routes.get('/from/:startDate/to/:endDate', async (request, response) => {
    return response.json({"start": request.params.startDate,"end": request.params.endDate});
});

export default routes;