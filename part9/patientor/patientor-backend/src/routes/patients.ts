import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req,res) => {
  res.send(patientService.getnonSensitivePatients());
});

router.post('/', (req,res) => {
  res.send(patientService.addPatient(req.body));
});

export default router;