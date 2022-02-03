import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req,res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req,res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.send(addedPatient);
  } catch (error) {
    // error is of type unkown and error.message cannot be accessed "without first asserting or narrowing to a more specific type"
    // res.status(400).send(error.message);
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

router.get('/:id', (req,res) => {
  try {
    res.send(patientService.getPatientById(req.params.id));
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }  
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientService.addEntry(req.params.id, req.body);
    res.send(patient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }  
  }
});

export default router;