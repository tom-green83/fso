import { Formik, Form, Field } from "formik";
import { Grid, Button } from "semantic-ui-react";
import React from "react";
import { useStateValue } from "../state";
import { OccupationalHealthcareEntry } from "../types";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { isDate } from '../utils';

interface Props {
  onSubmit: (values: Omit<OccupationalHealthcareEntry, 'id'>)=> void;
  onCancel: () => void;
}

const OccupationalHealthForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  const onSubmitOccupational = (values: Omit<OccupationalHealthcareEntry, 'id'>): void => {
    if (values.sickLeave && ((!values.sickLeave.startDate) || !(values.sickLeave.endDate))) {
      // sickLeave defined to remove from values
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sickLeave, ...others } = values;
      onSubmit(others);
    } else {
      onSubmit(values);
    }
  };

  return (
      <Formik 
        initialValues={{
          description: '',
          date: '',
          specialist: '',
          diagnosisCodes: [],
          employerName: '',
          sickLeave: {
            startDate: '',
            endDate: ''
          },
          type: 'OccupationalHealthcare'
        }}
        onSubmit={onSubmitOccupational}
        validate={values => {
          const requiredError = "Field is required";
          const bothRequiredError = "Both sick leave start and end dates are required.";
          const formatError = "Wrong format";
          const errors: { [field: string]: string } = {};
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          } else if (!isDate(values.date)){
            errors.date = formatError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (values.sickLeave) {
            if (values.sickLeave.startDate && !values.sickLeave.endDate) {
              errors['sickLeave.endDate'] = bothRequiredError;
            }
            if (!values.sickLeave.startDate && values.sickLeave.endDate) {
              errors['sickLeave.startDate'] = bothRequiredError;
            }
          }
          return errors;
        }}
        >
          {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
            return (
              <Form className="form ui">
                <Field
                  label="Description"
                  placeholder="Description"
                  name="description"
                  component={TextField}                
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}                
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="specialist"
                  component={TextField}                
                />
                <Field
                  label="Employer name"
                  placeholder="Employer name"
                  name="employerName"
                  component={TextField}                
                />
                <Field
                  label="Sick leave start date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}                
                />
                <Field
                  label="Sick leave start date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}                
                />       
                 <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                  />    
                <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
              </Form>
            );
          }}
        </Formik>
  );
};

export default OccupationalHealthForm;