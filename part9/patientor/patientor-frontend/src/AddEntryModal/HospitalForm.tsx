import { Formik, Form, Field } from "formik";
import { Grid, Button } from "semantic-ui-react";
import React from "react";
import { useStateValue } from "../state";
import { HospitalEntry } from "../types";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { isDate } from '../utils';

interface Props {
  onSubmit: (values: Omit<HospitalEntry, 'id'>)=> void;
  onCancel: () => void;
}

const HospitalForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
      <Formik 
        initialValues={{
          description: '',
          date: '',
          specialist: '',
          diagnosisCodes: [],
          discharge: {
            date: '',
            criteria: ''
          },
          type: 'Hospital'
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
          const formatError = "Wrong format";
          // Find a less manual way of defining the error object
          const errors: { description: string, date: string, specialist: string, discharge: {date: string, criteria: string} } = 
          { description: '', date: '', specialist: '', discharge: {date: '', criteria: ''}};
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
          if (!values.discharge.date) {
            errors.discharge.date = requiredError;
          } else if (!isDate(values.discharge.date)) {
            errors.discharge.date = formatError;
          }
          if (!values.discharge.criteria) {
            errors.discharge.criteria = requiredError;
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
                  label="Discharge date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}                
                />
                <Field
                  label="Discharge criteria"
                  placeholder="Discharge criteria"
                  name="discharge.criteria"
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

export default HospitalForm;