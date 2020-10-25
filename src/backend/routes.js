import express from "express";
import {
  FilterAbsencesList,
  FilterAbsencesListById,
  FilterAbsencesListByDate,
} from "./absenses.js";

const routes = express.Router();

routes.get("/", async (request, response) => {
  const userId = Number(request.query.userId);
  const startDate = request.query.startDate;
  const endDate = request.query.endDate;
  if (startDate || endDate) { // if we have startDate and/or endDate parameter
    const filterAbs = await FilterAbsencesListByDate(startDate, endDate, userId);
    return response.json(filterAbs);
  } else if (userId) { // if we have an userId parameter
    const filterUser = await FilterAbsencesListById(userId);
    return response.json(filterUser);
  } else { // if we don't have any parameter
    const absences = await FilterAbsencesList();
    return response.json(absences);
  }
});
export default routes;
