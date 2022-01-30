import {v1 as uuid} from 'uuid';
import patients from '../../data/patients';
import { Patient, nonSensitivePatient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getnonSensitivePatients = (): nonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const addPatient = (object: Patient): Patient => {
  const id = uuid();
  const newPatient: Patient = { ...object, id: id};
  patients.push(newPatient);
  console.log(newPatient);
  return newPatient;
};

export default { getPatients, getnonSensitivePatients, addPatient };