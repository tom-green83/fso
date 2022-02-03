import { Formik, Form, Field } from "formik";
import { Grid, Button } from "semantic-ui-react";
import React from "react";
import { useStateValue } from "../state";
import { HospitalEntry } from "../types";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";

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
          const errors: { [field: string]: string } = {};
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.discharge.date) {
            errors.dischargeDate = requiredError;
          }
          if (!values.discharge.criteria) {
            errors.dischargeCriteria = requiredError;
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
                  placeholder="Date"
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
                  placeholder="Discharge date"
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