import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Icon } from "semantic-ui-react";
import DiagnosisNames from "./DiagnosisNames";

const OccupationalHealthDetails: React.FC<{entry: OccupationalHealthcareEntry}> = ({ entry }) => {
  return (
    <div className='entrydetails'>
      <h2>{entry.date} <Icon className='stethoscope' size='large' /></h2>
      <em>{entry.description}</em>
      <DiagnosisNames diagnosisCodes={entry.diagnosisCodes} />
    </div>
  );
};

export default OccupationalHealthDetails;