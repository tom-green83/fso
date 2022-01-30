interface bmiInput {
  height: number;
  weight: number;
}

const parseArgumentsBmi = (args: Array<string>): bmiInput => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
}

export const calculateBmi = (height: number, weight: number): string =>  {
  const bmi = weight / Math.pow(height/100, 2);
  if (bmi < 18.5) return 'Underweight';
  else if (bmi>= 18.5 && bmi <=24.9) return 'Normal (healthy weight)';
  else return 'Overweight';
}

try {
  const { height, weight } = parseArgumentsBmi(process.argv);
  console.log(calculateBmi(height, weight));
  
} catch (error: unknown) {
  let errorMessage;
  if (error instanceof Error) {
    errorMessage = 'Error: ' + error.message;
  }
  console.log(errorMessage);
}