import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req,res) => {
  console.log('Patient data endpoint');
  res.send(patientService.getnonSensitivePatients());
});

export default router;