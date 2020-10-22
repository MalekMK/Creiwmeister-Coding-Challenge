import {members, absences} from './api.js';
let absencesList = await absences(); 
let membersList = await members();
let fullAbscencesList = absencesList.map(abs => Object.assign(abs, membersList.find(member => member.userId == abs.userId)));
fullAbscencesList.forEach((elt,index) => elt.id=index)


export async function FilterAbscencesList() 
{
    return fullAbscencesList;     
}

export async function FilterAbsencesListById(Id)
{
    return fullAbscencesList.map((elt) => elt.userId == Id ? elt : null ).filter(val => val !== null);
}

export async function FilterAbsencesListByDate(startDate, endDate)
{
    startDate =  new Date(startDate)
    endDate =  new Date(endDate).setHours(24)
    return fullAbscencesList.map((elt) => (new Date(elt.startDate) >= startDate && new Date(elt.endDate) <= endDate ) ? elt : null ).filter(val => val !== null);
}