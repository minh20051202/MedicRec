import React, { useState } from "react";
import createPatientBundle from "./taohs"; // Adjust import
import styles from "./formHoSo.module.css"; // Import CSS module

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
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Patient Information</h2>

      <label htmlFor="patient-name">Name:</label>
      <input
        className={styles.inputField}
        type="text"
        id="patient-name"
        required
      />
      <br />
      <br />

      <label htmlFor="patient-gender">Gender:</label>
      <select className={styles.inputField} id="patient-gender" required>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <br />
      <br />

      <label htmlFor="patient-birthdate">Birthdate:</label>
      <input
        className={styles.inputField}
        type="date"
        id="patient-birthdate"
        required
      />
      <br />
      <br />

      <label htmlFor="patient-address">Address:</label>
      <input
        className={styles.inputField}
        type="text"
        id="patient-address"
        required
      />
      <br />
      <br />

      <h2 className={styles.formTitle}>Encounter Information</h2>
      <label htmlFor="encounter-id">Encounter ID:</label>
      <input
        className={styles.inputField}
        type="text"
        id="encounter-id"
        required
      />
      <br />
      <br />

      <label htmlFor="encounter-type">Type:</label>
      <input
        className={styles.inputField}
        type="text"
        id="encounter-type"
        required
      />
      <br />
      <br />

      <label htmlFor="encounter-start">Start Time:</label>
      <input
        className={styles.inputField}
        type="datetime-local"
        id="encounter-start"
        required
      />
      <br />
      <br />

      <label htmlFor="encounter-end">End Time:</label>
      <input
        className={styles.inputField}
        type="datetime-local"
        id="encounter-end"
        required
      />
      <br />
      <br />

      <label htmlFor="encounter-reason">Reason:</label>
      <input
        className={styles.inputField}
        type="text"
        id="encounter-reason"
        required
      />
      <br />
      <br />

      <h2 className={styles.formTitle}>Observation Information</h2>
      <label htmlFor="observation-id">Observation ID:</label>
      <input
        className={styles.inputField}
        type="text"
        id="observation-id"
        required
      />
      <br />
      <br />

      <label htmlFor="observation-code">Observation Code:</label>
      <input
        className={styles.inputField}
        type="text"
        id="observation-code"
        required
      />
      <br />
      <br />

      <label htmlFor="observation-value">Value:</label>
      <input
        className={styles.inputField}
        type="text"
        id="observation-value"
        required
      />
      <br />
      <br />

      <label htmlFor="observation-unit">Unit:</label>
      <input
        className={styles.inputField}
        type="text"
        id="observation-unit"
        required
      />
      <br />
      <br />

      <h2 className={styles.formTitle}>Coverage Information</h2>
      <label htmlFor="coverage-id">Coverage ID:</label>
      <input
        className={styles.inputField}
        type="text"
        id="coverage-id"
        required
      />
      <br />
      <br />

      <label htmlFor="coverage-type">Coverage Type:</label>
      <input
        className={styles.inputField}
        type="text"
        id="coverage-type"
        required
      />
      <br />
      <br />

      <label htmlFor="coverage-subscriber">Subscriber ID:</label>
      <input
        className={styles.inputField}
        type="text"
        id="coverage-subscriber"
        required
      />
      <br />
      <br />

      <label htmlFor="coverage-payor">Payor:</label>
      <input
        className={styles.inputField}
        type="text"
        id="coverage-payor"
        required
      />
      <br />
      <br />

      <h2 className={styles.formTitle}>Medication Statement Information</h2>
      <label htmlFor="medication-id">Medication Statement ID:</label>
      <input
        className={styles.inputField}
        type="text"
        id="medication-id"
        required
      />
      <br />
      <br />

      <label htmlFor="medication-name">Medication Name:</label>
      <input
        className={styles.inputField}
        type="text"
        id="medication-name"
        required
      />
      <br />
      <br />

      <label htmlFor="medication-dosage">Dosage:</label>
      <input
        className={styles.inputField}
        type="text"
        id="medication-dosage"
        required
      />
      <br />
      <br />

      <label htmlFor="medication-frequency">Frequency:</label>
      <input
        className={styles.inputField}
        type="text"
        id="medication-frequency"
        required
      />
      <br />
      <br />

      <label htmlFor="secret-key">Secret key for encryption:</label>
      <input
        className={styles.inputField}
        type="text"
        id="secret-key"
        minLength={16}
        maxLength={16}
        pattern=".{16}"
        required
      />
      <br />
      <br />

      <span id="message" className={styles.message}>
        {message}
      </span>
      <br />
      <br />

      <button className={styles.submit} type="submit">
        Submit
      </button>
    </form>
  );
};

export default TaoHoSo;
