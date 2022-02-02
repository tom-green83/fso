import React from "react";
import axios from "axios";
import { Icon } from "semantic-ui-react";


import { apiBaseUrl } from "../constants";
import { useStateValue, setCurrentPatient } from "../state";
import { Patient } from "../types";
import { useParams } from "react-router-dom";

const PatientInformationPage = () => {
  const { id } = useParams<{id: string}>();
  const [ { currentPatient }, dispatch] = useStateValue();
  
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
    </>
  );
};

export default PatientInformationPage;
