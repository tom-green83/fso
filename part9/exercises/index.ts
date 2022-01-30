import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({error: 'malformatted parameters'});
  } else {
    res.send({
      weight: weight,
      height: height,
      bmi: calculateBmi(height, weight)
    });
  }
});

app.post('/exercises', (req, res) => {
  try {
    const daily_exercises = req.body.daily_exercises;
    const target = req.body.target;
    if (!daily_exercises || !target) {
      throw new Error('parameters missing');
    }
    if (isNaN(Number(target))) throw new Error('malformatted parameters');
    daily_exercises.map((e: any) => {
      if (isNaN(Number(e))) throw new Error('malformatted parameters');
    });
    res.send(calculateExercises(daily_exercises, target));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }


});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});