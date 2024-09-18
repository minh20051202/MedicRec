import { FHIR_CLIENT, createFHIRBundle } from "../utils/manageResource.ts";
import * as fs from "fs";

const newPatient = {
  resourceType: "Patient",
  name: [
    {
      use: "official",
      family: "Doe",
      given: ["John"],
    },
  ],
  gender: "male",
  birthDate: "1990-01-01",
  address: [
    {
      use: "home",
      line: ["123 Main St"],
      city: "Anytown",
      state: "CA",
      postalCode: "12345",
      country: "USA",
    },
  ],
};

// Create a new patient
async function createPatient() {
  try {
    const result = await FHIR_CLIENT.create("Patient", newPatient);
    console.log("Created patient:", JSON.stringify(result, null, 2));
    return result.id;
  } catch (error) {
    console.error("Error creating patient:", error);
  }
}

// Read a patient's data
async function readPatient(patientId) {
  try {
    const patient = await FHIR_CLIENT.read("Patient", patientId);
    console.log("Retrieved patient:", JSON.stringify(patient, null, 2));
  } catch (error) {
    console.error("Error reading patient:", error);
  }
}

// Update a patient's data
async function updatePatient(patientId) {
  try {
    const patient = await FHIR_CLIENT.read("Patient", patientId);
    patient.telecom = [{ system: "phone", value: "555-0123", use: "home" }];
    const updatedPatient = await FHIR_CLIENT.update(
      "Patient",
      patientId,
      patient
    );
    console.log("Updated patient:", updatedPatient);
  } catch (error) {
    console.error("Error updating patient:", error);
  }
}

async function searchPatients(params) {
  try {
    const results = await FHIR_CLIENT.search("Patient", params);
    console.log("Search results:", results);
  } catch (error) {
    console.error("Error searching patients:", error);
  }
}

async function runExample() {
  const patientId = await createPatient();

  if (patientId) {
    await readPatient(patientId);

    // await updatePatient(patientId);

    // await searchPatients({ family: "Doe", gender: "male" });
  }
}

// runExample();

const patientResource = {
  resourceType: "Patient",
  id: "example",
  name: [
    {
      use: "official",
      family: "Nguyen",
      given: ["Van", "A"],
    },
  ],
  gender: "male",
  birthDate: "1974-12-25",
};

const observationResource = {
  resourceType: "Observation",
  id: "blood-pressure",
  status: "final",
  code: {
    coding: [
      {
        system: "http://loinc.org",
        code: "85354-9",
        display: "Blood pressure panel",
      },
    ],
  },
  subject: {
    reference: "Patient/example",
  },
  effectiveDateTime: "2023-09-06T09:30:00Z",
  component: [
    {
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "8480-6",
            display: "Systolic blood pressure",
          },
        ],
      },
      valueQuantity: {
        value: 120,
        unit: "mm[Hg]",
        system: "http://unitsofmeasure.org",
        code: "mm[Hg]",
      },
    },
    {
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "8462-4",
            display: "Diastolic blood pressure",
          },
        ],
      },
      valueQuantity: {
        value: 80,
        unit: "mm[Hg]",
        system: "http://unitsofmeasure.org",
        code: "mm[Hg]",
      },
    },
  ],
};

const bundle = createFHIRBundle([patientResource, observationResource]);

// Đọc bundle từ file JSON
const readBundle = () => {
  const data = fs.readFileSync("fhir_bundle.json", "utf8");
  return JSON.parse(data);
};

const loadedBundle = readBundle();
console.log("Đã đọc FHIR Bundle từ file:");
console.log(JSON.stringify(loadedBundle, null, 2));
