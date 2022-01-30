import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(404).json({error: 'malformatted parameters'});
  } else {
    res.send({
      weight: weight,
      height: height,
      bmi: calculateBmi(height, weight)
    });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});