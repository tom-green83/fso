import React from "react";
import { HospitalEntry } from "../types";
import { Icon } from "semantic-ui-react";
import DiagnosisNames from "./DiagnosisNames";

const HospitalDetails: React.FC<{entry: HospitalEntry}> = ({ entry }) => {
  return (
    <div className='entrydetails'>
      <h2>{entry.date} <Icon className='hospital' size='big'/></h2>
      <em>{entry.description}</em>
      <DiagnosisNames diagnosisCodes={entry.diagnosisCodes} />
    </div>
  );
};

export default HospitalDetails;