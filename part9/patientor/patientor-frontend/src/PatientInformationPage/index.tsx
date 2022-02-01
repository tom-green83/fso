import React from "react";
import { useParams } from "react-router-dom";


const PatientInformationPage = () => {
  const { id } = useParams<{id: string}>();

  return (
    <>
      {id}
    </>
  );
};

export default PatientInformationPage;
