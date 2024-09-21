import { FHIR_CLIENT, createFHIRBundle } from "../lib/manageResource";
import { encryptData } from "../lib/encryptAndDecrypt";
import { uploadToIPFS } from "../lib/IPFSPinningAndRetrieving";
export default async function createPatientBundle() {
  const patient = {
    name: (document.getElementById("patient-name") as HTMLInputElement).value,
    gender: (document.getElementById("patient-gender") as HTMLInputElement)
      .value,
    birthDate: (
      document.getElementById("patient-birthdate") as HTMLInputElement
    ).value,
    address: (document.getElementById("patient-address") as HTMLInputElement)
      .value,
  };
  const patientResource = await FHIR_CLIENT.create("Patient", patient);
  const encounter = {
    encounterId: (document.getElementById("encounter-id") as HTMLInputElement)
      .value,
    encounterType: (
      document.getElementById("encounter-type") as HTMLInputElement
    ).value,
    encounterStart: (
      document.getElementById("encounter-start") as HTMLInputElement
    ).value,
    encounterEnd: (document.getElementById("encounter-end") as HTMLInputElement)
      .value,
    encounterReason: (
      document.getElementById("encounter-reason") as HTMLInputElement
    ).value,
  };
  const encounterResource = await FHIR_CLIENT.create("Encounter", encounter);

  const observation = {
    observationId: (
      document.getElementById("observation-id") as HTMLInputElement
    ).value,
    observationCode: (
      document.getElementById("observation-code") as HTMLInputElement
    ).value,
    observationValue: (
      document.getElementById("observation-value") as HTMLInputElement
    ).value,
    observationUnit: (
      document.getElementById("observation-unit") as HTMLInputElement
    ).value,
  };
  const observationResource = await FHIR_CLIENT.create(
    "Observation",
    observation
  );
  const coverage = {
    coverageId: (document.getElementById("coverage-id") as HTMLInputElement)
      .value,
    coverageType: (document.getElementById("coverage-type") as HTMLInputElement)
      .value,
    coverageSubcriber: (
      document.getElementById("coverage-subscriber") as HTMLInputElement
    ).value,
    coveragePayor: (
      document.getElementById("coverage-payor") as HTMLInputElement
    ).value,
  };
  const coverageResource = await FHIR_CLIENT.create("Coverage", coverage);
  const medicationStatement = {
    medicationStatementId: (
      document.getElementById("medicationStatement-id") as HTMLInputElement
    ).value,
    medicationStatementName: (
      document.getElementById("medicationStatement-name") as HTMLInputElement
    ).value,
    medicationStatementDosage: (
      document.getElementById("medicationStatement-dosage") as HTMLInputElement
    ).value,
    medicationStatementFrequency: (
      document.getElementById(
        "medicationStatement-frequency"
      ) as HTMLInputElement
    ).value,
  };
  const medicationStatementResource = await FHIR_CLIENT.create(
    "Medication Statement",
    medicationStatement
  );

  const secretKey = (document.getElementById("secret-key") as HTMLInputElement)
    .value;

  const FhirBundle = createFHIRBundle([
    patientResource,
    encounterResource,
    observationResource,
    coverageResource,
    medicationStatementResource,
  ]);

  const encryptedPatientData = encryptData(secretKey, FhirBundle);

  const ipfsUrl = await uploadToIPFS("Bundle", encryptedPatientData);

  console.log(ipfsUrl);
}