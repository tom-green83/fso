import React from "react";
import { Entry } from "../types";
import HealthCheckDetails from "./HealthCheckDetails";
import HospitalDetails from "./HospitalDetails";
import OccupationalHealthDetails from "./OccupationalHealthDetails";
import { assertNever } from "../utils";
import './index.css';

const EntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry} />;
    case 'Hospital':
      return <HospitalDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;