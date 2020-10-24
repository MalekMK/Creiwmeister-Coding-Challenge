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
  if (userId) { // if we have an userId parameter
    const filterUser = await FilterAbsencesListById(userId);
    return response.json(filterUser);
  } else if (startDate || endDate) { // if we have startDate and/or endDate parameter
    const filterAbs = await FilterAbsencesListByDate(startDate, endDate);
    return response.json(filterAbs);
  } else { // if we don't have any parameter
    const absences = await FilterAbsencesList();
    return response.json(absences);
  }
});
export default routes;
