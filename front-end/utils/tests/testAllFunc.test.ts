import { FHIR_CLIENT, createFHIRBundle } from "../patient/manageResource.ts";
import {
  uploadToIPFS,
  retrieveFromIPFS,
} from "../patient/IPFSPinningAndRetrieving.ts";
import { encryptData, decryptData } from "@/lib/encryptAndDecrypt.ts";
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
    return result;
  } catch (error) {
    console.error("Error creating patient:", error);
  }
}

async function runExample() {
  const patientResource = await createPatient();
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
  const secretKey = "1234567890123456";
  const bundleResource = createFHIRBundle([
    patientResource,
    observationResource,
  ]);
  const encryptedBundle = await encryptData(bundleResource, secretKey);
  const url = await uploadToIPFS("Bundle", encryptedBundle);
  console.log("IPFS URL:", url);
}
runExample();

async function runExample2() {
  const patientResource = await createPatient();
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
  const secretKey = "1234567890123456";
  const bundleResource = createFHIRBundle([
    patientResource,
    observationResource,
  ]);
  const encryptedBundle = await encryptData(bundleResource, secretKey);
  const url = await uploadToIPFS("Bundle", encryptedBundle);

  const data = await retrieveFromIPFS(url || "");

  const decryptedData = await decryptData(data, secretKey);
  console.log(decryptedData);
}
