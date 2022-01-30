interface exerciseCalculatorInput {
  exerciseHours: Array<number>;
  target: number;
}

const parseArgumentsExercise = (args: Array<string>): exerciseCalculatorInput => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const numericInput = args.slice(2).map(s => Number(s));
  numericInput.map(e => {
    if (isNaN(e)) throw new Error('Provided values were not numbers');
  });

  return {
    exerciseHours: numericInput.slice(1),
    target: numericInput[0]
  };
};

interface exerciseCalculatorResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (exerciseHours: Array<number>, target: number): exerciseCalculatorResult => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(h => h > 0).length;
  const average = exerciseHours.reduce(function(a, b){return a + b;})/periodLength;
  const success = (average >= target);

  let rating, ratingDescription;
  if (average < 0.5 * target) rating = 1, ratingDescription = 'bad';
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
};

try {
  const { exerciseHours, target } = parseArgumentsExercise(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (error: unknown) {
  let errorMessage;
  if (error instanceof Error) {
    errorMessage = 'Error: ' + error.message;
  }
  console.log(errorMessage);
}