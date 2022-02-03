import { NewPatient, Gender, Entry, NewEntry, HealthCheckRating } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name ' + name);
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn ' + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation ' + occupation);
  }
  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender ' + gender);
  }
  return gender;
};

type inputFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: Entry[] };

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries}: inputFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: entries
  };
  return newPatient;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)){
    throw new Error('Incorrect or missing specialist ' + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<string> => {
  if (diagnosisCodes && !Array.isArray(diagnosisCodes)){
    throw new Error('Incorrect diagnosis codes');
  }
  return diagnosisCodes;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (healthCheckRating===undefined || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating ' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseDischarge = (discharge: any): { date: string, criteria: string } => {
  if (!discharge 
    || !discharge.date
    || !isDate(discharge.date)
    || !discharge.criteria
    || !isString(discharge.criteria)
    ) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};

const parseEmployerName = (employer: unknown): string => {
  if (!employer || !isString(employer)){
    throw new Error('Incorrect or missing employer ' + employer);
  }
  return employer;
};

const parseSickLeave = (sickLeave: any): { startDate: string, endDate: string } => {
  if (sickLeave
    && (
      !sickLeave.startDate
      || !isDate(sickLeave.startDate)
      || !sickLeave.endDate
      || !isDate(sickLeave.endDate)
    )) {
    throw new Error('Incorrect sick leave');
  }
  return sickLeave;
};

export const toNewEntry = (entry: any): NewEntry => {
  const baseEntry = {
    description: parseDescription(entry.description),
    specialist: parseSpecialist(entry.specialist),
    diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
    date: parseDate(entry.date)
  };

  switch (entry.type) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
      };
    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: parseDischarge(entry.discharge)
      };
    case 'OccupationalHealthcare':
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(entry.employerName),
        sickLeave: parseSickLeave(entry.sickLeave)
      };
    default:
      throw new Error('Invalid entry');
  }
};

export default toNewPatient;