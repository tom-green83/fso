import { Formik, Form, Field } from "formik";
import { Grid, Button } from "semantic-ui-react";
import React from "react";
import { useStateValue } from "../state";
import { HealthCheckEntry } from "../types";
import { TextField, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { isDate, isHealthCheckRating } from '../utils';

interface Props {
  onSubmit: (values: Omit<HealthCheckEntry, 'id'>)=> void;
  onCancel: () => void;
}

const HealthCheckForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
      <Formik 
        initialValues={{
          description: '',
          date: '',
          specialist: '',
          diagnosisCodes: [],
          healthCheckRating: 0,
          type: 'HealthCheck'
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
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
          if (!(isHealthCheckRating(values.healthCheckRating))) {
            errors.healthCheckRating = 'Rating between 0 and 3 required';
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
                  label="Health Check Rating"
                  name="healthCheckRating"
                  component={NumberField}
                  min={0}
                  max={3}
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

export default HealthCheckForm;