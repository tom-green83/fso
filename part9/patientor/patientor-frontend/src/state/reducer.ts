import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_CURRENT_PATIENT";
      payload: Patient;
    };

export const setPatientList = (patientsFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientsFromApi
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const setCurrentPatient = (patientFromApi: Patient): Action => {
  return {
    type: "SET_CURRENT_PATIENT",
    payload: patientFromApi
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_CURRENT_PATIENT":
      return {
        ...state,
        currentPatient: action.payload        
      };
    default:
      return state;
  }
};
