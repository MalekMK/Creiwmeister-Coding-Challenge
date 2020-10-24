import {members, absences} from './api.js';
let absencesList = await absences(); // creating the list of absenses from JSON file
let membersList = await members();  // creating the list of members from JSON file
let fullAbsencesList = absencesList.map(abs => Object.assign(abs, membersList.find(member => member.userId == abs.userId)));
fullAbsencesList.forEach((elt,index) => elt.id=index)  // merging the properties to get one JSON object

//filtering all the absenses
export async function FilterAbsencesList() 
{
    return fullAbsencesList; 
}

//filtering the absenses of a specific userId
export async function FilterAbsencesListById(Id)
{
    return fullAbsencesList.map((elt) => elt.userId == Id ? elt : null ).filter(val => val !== null); 
}

//filtering the absenses between two dates
export async function FilterAbsencesListByDate(startDate, endDate)
{
    startDate =  new Date(startDate)
    endDate =  new Date(endDate).setHours(24)
    return fullAbsencesList.map((elt) => (new Date(elt.startDate) >= startDate && new Date(elt.endDate) <= endDate ) ? elt : null ).filter(val => val !== null);
}