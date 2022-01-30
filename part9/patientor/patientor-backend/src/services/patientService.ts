import patients from '../../data/patients';
import { Patient, nonSensitivePatient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getnonSensitivePatients = (): nonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

export default {getPatients, getnonSensitivePatients};