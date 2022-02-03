import {v1 as uuid} from 'uuid';
import patients from '../../data/patients';
import { NewPatient, Patient, PublicPatient, Entry } from '../types';
import { toNewEntry } from '../utils';

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

const addEntry = (id: string, entry: Entry ): Patient => {
  const patient = patients.find(patient => patient.id === id);
  if (!patient) {
    console.log('error');
    throw new Error('Patient not found');
  }

  const patientIndex = patients.findIndex(patient => patient.id === id);
  const newEntry = { ...toNewEntry(entry), id: uuid() };
  patients[patientIndex] = { ...patient, entries: patient.entries.concat(newEntry) };
  return patients[patientIndex];
};

export default { getPatients, getPatientsPublic, addPatient, getPatientById, addEntry };