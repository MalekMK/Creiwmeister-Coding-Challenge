import express from "express";
import {
  FilterAbsencesList,
  FilterAbsencesListById,
  FilterAbsencesListByDate,
} from "./filters.js";

const routes = express.Router();

routes.get("/", async (request, response) => {
  const userId = Number(request.query.userId);
  const startDate = request.query.startDate;
  const endDate = request.query.endDate;
  if (userId) {
    const filterUser = await FilterAbsencesListById(userId);
    return response.json(filterUser);
  } else if (startDate || endDate) {
    const filterAbs = await FilterAbsencesListByDate(startDate, endDate);
    return response.json(filterAbs);
  } else {
    const absences = await FilterAbsencesList();
    return response.json(absences);
  }
});
export default routes;
