import React from "react";
import axios from "axios";
import { Icon } from "semantic-ui-react";


import { apiBaseUrl } from "../constants";
import { useStateValue, setCurrentPatient } from "../state";
import { Patient, Entry } from "../types";
import { useParams } from "react-router-dom";

const PatientInformationPage = () => {
  const { id } = useParams<{id: string}>();
  const [ { currentPatient, diagnoses }, dispatch] = useStateValue();

  React.useEffect(() => {
    if (!currentPatient || currentPatient.id!==id) {
      void axios.get<void>(`${apiBaseUrl}/patients/${id}`);
      const fetchPatient = async() => {
        try {
          const {data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
          dispatch(setCurrentPatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };
       void fetchPatient();
    }
  }, [dispatch]);

  const genderToIconName = (gender: string) => {
    switch (gender){
      case 'male': return 'mars';
      case 'female': return 'venus';
      case 'other': return 'genderless';
      default: return 'genderless';
    }
  };

  const renderEntry = (entry: Entry) => {
    return (
      <div key={entry.id}>
        {entry.date} <em>{entry.description}</em>
        {renderDiagnosisCodes(entry.diagnosisCodes)}
      </div>
    );
  };

  const renderDiagnosisCodes = (diagnosisCodes: string[]|undefined) => {
    const renderName = (code: string): string|null => {
      const foundDiagnosis = Object.values(diagnoses).find(diagnosis => diagnosis.code === code);
      return foundDiagnosis? foundDiagnosis.name: null;
    };
    
    return (
      <>
      {diagnosisCodes && 
        <ul>
         {diagnosisCodes.map((code, index) => {
           return (
            <li key={index}>
              {code} {renderName(code)}
            </li>
           );
         })}
        </ul>
        }
      </>
    );
  };

if (!currentPatient) {
    return null;
  }
  return (
    <>
      <h1>
        {currentPatient.name} <Icon name={genderToIconName(currentPatient.gender)}/>
      </h1>
        <div>ssn: {currentPatient.ssn}</div>
        <div>occupation: {currentPatient.occupation}</div>
      <h3>entries</h3>
      {currentPatient.entries.map(entry => renderEntry(entry))}
    </>
  );
};

export default PatientInformationPage;
