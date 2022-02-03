import React from "react";
import axios from "axios";
import { Icon, Button } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal/AddEntryModal";

import { apiBaseUrl } from "../constants";
import { useStateValue, setCurrentPatient, addPatient } from "../state";
import { NewEntry, Patient } from "../types";
import { useParams } from "react-router-dom";

const PatientInformationPage = () => {
  const { id } = useParams<{id: string}>();
  const [ { currentPatient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  // const submitEntry = (newEntry: NewEntry): void => {
  //   console.log(newEntry);
  // };

  const submitEntry = async (values: NewEntry) => {
    if (!currentPatient) return null;
    try {
        const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${currentPatient.id}/entries`,
        values
      );
      dispatch(addPatient(newPatient));
      dispatch(setCurrentPatient(newPatient));
      // closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  React.useEffect(() => {
    if (!currentPatient || currentPatient.id!==id) {
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
      <AddEntryModal
        modalOpen={modalOpen}
        error={error}
        onSubmit={submitEntry}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
      <h3>entries</h3>
      {currentPatient.entries && currentPatient.entries.map(entry => <EntryDetails key={entry.id} entry={entry}/>)}
    </>
  );
};

export default PatientInformationPage;
