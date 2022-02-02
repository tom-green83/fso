import {v1 as uuid} from 'uuid';
import patients from '../../data/patients';
import { NewPatient, Patient, PublicPatient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsPublic = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const addPatient = (object: NewPatient): Patient => {
  const id = uuid();
  const newPatient: Patient = { ...object, id: id};
  patients.push(newPatient);
  console.log(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient => {
  const patient = patients.find(patient => patient.id === id);
  if (patient) {
    return patient;
  } else {
    throw new Error('Patient not found');
  }
};

export default { getPatients, getPatientsPublic, addPatient, getPatientById };