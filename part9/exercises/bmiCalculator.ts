const calculateBmi = (height: number, weight: number): string =>  {
  const bmi = weight / Math.pow(height/100, 2);
  if (bmi < 18.5) return 'underweight'
  else if (bmi>= 18.5 && bmi <=24.9) return 'Normal (healthy weight)'
  else return 'overweight'
}

console.log(calculateBmi(180, 74))