interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const exerciseHours = [3, 0, 2, 4.5, 0, 3, 1];
const target = 2;

const calculateExercises = (exerciseHours: Array<number>, target: number): Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(h => h > 0).length;
  const average = exerciseHours.reduce(function(a, b){return a + b})/periodLength;
  const success = (average >= target);

  let rating, ratingDescription;
  if (average < 0.5 * target) rating = 1, ratingDescription = 'needs a lot of work';
  else if (average < target) rating = 2, ratingDescription = 'not too bad but could be better';
  else rating = 3, ratingDescription = 'excellent';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average };
}

console.log(calculateExercises(exerciseHours, target))