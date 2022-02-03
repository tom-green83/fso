import React from "react";
import { HealthCheckEntry } from "../types";
import { Icon } from "semantic-ui-react";

const HealthCheckDetails: React.FC<{entry: HealthCheckEntry}> = ({ entry }) => {
  const ratingToIcon = (rating: number): string => {
    switch (rating) {
      case 0: return 'green heart';
      case 1: return 'yellow heart';
      default: return '';
    }
  };

  return (
    <div className='entrydetails'>
      <h2>{entry.date} <Icon className='user md' size='large' /></h2>
      <em>{entry.description}</em><br/>
      <Icon className={ratingToIcon(entry.healthCheckRating)} />
  </div>
  );
};

export default HealthCheckDetails;