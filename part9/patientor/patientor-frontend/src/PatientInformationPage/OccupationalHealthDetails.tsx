import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Icon } from "semantic-ui-react";
import DiagnosisNames from "./DiagnosisNames";

const OccupationalHealthDetails: React.FC<{entry: OccupationalHealthcareEntry}> = ({ entry }) => {
  return (
    <div className='entrydetails'>
      <h2>{entry.date} <Icon className='stethoscope' size='large' />{entry.employerName}</h2>
      <em>{entry.description}</em>
      {entry.sickLeave &&
      <div>
        <strong>Sick leave</strong>
        <div>Start date: {entry.sickLeave?.startDate}</div>
        <div>End date: {entry.sickLeave?.startDate}</div>
      </div>
      }      
      <DiagnosisNames diagnosisCodes={entry.diagnosisCodes} />
    </div>
  );
};

export default OccupationalHealthDetails;