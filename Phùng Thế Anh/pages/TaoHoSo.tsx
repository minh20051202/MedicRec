import React, { useState } from "react";
import createPatientBundle from "./taohs"; // Adjust import

const TaoHoSo: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createPatientBundle(); // Call the function to create the patient bundle
      setMessage("Hồ sơ đã được gửi thành công!");
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Đã có lỗi xảy ra! Vui lòng thử lại.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="form-title">Patient Information</h2>

      <label htmlFor="patient-name">Name:</label>
      <input type="text" id="patient-name" required />
      <br />
      <br />

      <label htmlFor="patient-gender">Gender:</label>
      <select id="patient-gender" required>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <br />
      <br />

      <label htmlFor="patient-birthdate">Birthdate:</label>
      <input type="date" id="patient-birthdate" required />
      <br />
      <br />

      <label htmlFor="patient-address">Address:</label>
      <input type="text" id="patient-address" required />
      <br />
      <br />

      {/* Encounter Form */}
      <h2 className="form-title">Encounter Information</h2>
      <label htmlFor="encounter-id">Encounter ID:</label>
      <input type="text" id="encounter-id" required />
      <br />
      <br />

      <label htmlFor="encounter-type">Type:</label>
      <input type="text" id="encounter-type" required />
      <br />
      <br />

      <label htmlFor="encounter-start">Start Time:</label>
      <input type="datetime-local" id="encounter-start" required />
      <br />
      <br />

      <label htmlFor="encounter-end">End Time:</label>
      <input type="datetime-local" id="encounter-end" required />
      <br />
      <br />

      <label htmlFor="encounter-reason">Reason:</label>
      <input type="text" id="encounter-reason" required />
      <br />
      <br />

      {/* Observation Form */}
      <h2 className="form-title">Observation Information</h2>
      <label htmlFor="observation-id">Observation ID:</label>
      <input type="text" id="observation-id" required />
      <br />
      <br />

      <label htmlFor="observation-code">Observation Code:</label>
      <input type="text" id="observation-code" required />
      <br />
      <br />

      <label htmlFor="observation-value">Value:</label>
      <input type="text" id="observation-value" required />
      <br />
      <br />

      <label htmlFor="observation-unit">Unit:</label>
      <input type="text" id="observation-unit" required />
      <br />
      <br />

      {/* Coverage Form */}
      <h2 className="form-title">Coverage Information</h2>
      <label htmlFor="coverage-id">Coverage ID:</label>
      <input type="text" id="coverage-id" required />
      <br />
      <br />

      <label htmlFor="coverage-type">Coverage Type:</label>
      <input type="text" id="coverage-type" required />
      <br />
      <br />

      <label htmlFor="coverage-subscriber">Subscriber ID:</label>
      <input type="text" id="coverage-subscriber" required />
      <br />
      <br />

      <label htmlFor="coverage-payor">Payor:</label>
      <input type="text" id="coverage-payor" required />
      <br />
      <br />

      {/* MedicationStatement Form */}
      <h2 className="form-title">Medication Statement Information</h2>
      <label htmlFor="medication-id">Medication Statement ID:</label>
      <input type="text" id="medication-id" required />
      <br />
      <br />

      <label htmlFor="medication-name">Medication Name:</label>
      <input type="text" id="medication-name" required />
      <br />
      <br />

      <label htmlFor="medication-dosage">Dosage:</label>
      <input type="text" id="medication-dosage" required />
      <br />
      <br />

      <label htmlFor="medication-frequency">Frequency:</label>
      <input type="text" id="medication-frequency" required />
      <br />
      <br />

      {/* Secret Key */}
      <label htmlFor="secret-key">Secret key for encryption:</label>
      <input
        type="text"
        id="secret-key"
        minLength={16}
        maxLength={16}
        pattern=".{16}"
        required
      />
      <br />
      <br />
      <span id="message">{message}</span>
      <br />
      <br />

      {/* Submit Button */}
      <button className="submit" type="submit">
        Submit Medication
      </button>
      <span>{message}</span>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TaoHoSo;