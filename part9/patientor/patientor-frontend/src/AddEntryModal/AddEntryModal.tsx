import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import HealthCheckForm from './HealthCheckForm';
import HospitalForm from './HospitalForm';
import OccupationalHealthCheckForm from './OccupationalHealth';
import { NewEntry } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

  const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [entryType, setEntryType] = React.useState<string>('hospital');

  const renderForm = (entryType: string) => {
    switch (entryType) {
      case 'hospital':
        return <HospitalForm onCancel={onClose} onSubmit={onSubmit}/>;
      case 'healthcheck':
        return <HealthCheckForm />;
      case 'occupationalhealth':
        return <OccupationalHealthCheckForm />;
      default:
        return null;
    }
  };

    return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        <select name="entryType" value={entryType} onChange={(event => setEntryType(event.target.value))}>
          <option value="hospital">Hospital</option>
          <option value="healthcheck">Health check</option>
          <option value="occupationalhealth">Occupational Health</option>
        </select>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        {renderForm(entryType)}
      </Modal.Content>
    </Modal>
  );
};

export default AddPatientModal;
