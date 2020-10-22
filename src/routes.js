import express from 'express';
import { FilterAbsencesList, FilterAbsencesListById, FilterAbsencesListByDate } from './filters.js';


const routes = express.Router();

routes.get('/', async (request, response) => {
    const absences = await FilterAbsencesList();
    return response.json(absences);   
});

routes.get('/id/:userId', async (request, response) => {
    const userId = Number(request.params.userId);
    const filterUser = await FilterAbsencesListById(userId);
    return response.json(filterUser);
});

routes.get('/from/:startDate/to/:endDate', async (request, response) => {
    const startDate = request.params.startDate;
    const endDate = request.params.endDate;
    const filterAbs = await FilterAbsencesListByDate(startDate,endDate);
    return response.json(filterAbs);
});

export default routes;