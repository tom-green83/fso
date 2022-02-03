import React from "react";
import { Diagnosis } from "../types";
import { useStateValue } from "../state";

const DiagnosisNames: React.FC<{diagnosisCodes: Array<Diagnosis['code']>|undefined }> = ({ diagnosisCodes }) => {
  if (diagnosisCodes === undefined) return null;

  const [{ diagnoses }] = useStateValue();
  const renderName = (code: string): string|null => {
    const foundDiagnosis = Object.values(diagnoses).find(diagnosis => diagnosis.code === code);
    return foundDiagnosis? foundDiagnosis.name: null;
  };
  
  return (
    <>
      <ul>
        {diagnosisCodes.map((code, index) => {
          return (
          <li key={index}>
            {code} {renderName(code)}
          </li>
          );
        })}
      </ul>
    </>
  );
};

export default DiagnosisNames;