import React, { useState } from "react";
import createPatientBundle from "./taohs"; // Adjust import
import styles from "./formHoSo.module.css"; // Import CSS module

const TaoHoSo: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [ipfsUrl, setIpfsUrl] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const PatientBundle = await createPatientBundle();
      setIpfsUrl(PatientBundle || "Không có dữ liệu IPFS URL");
      setMessage("Hồ sơ đã được gửi thành công!");
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Đã có lỗi xảy ra! Vui lòng thử lại.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Patient Information</h2>

      <label htmlFor="patient-name" className={styles.label}>
        Name:
      </label>
      <input
        className={styles.inputField}
        type="text"
        id="patient-name"
        required
      />
      <br />

      <label htmlFor="patient-gender" className={styles.label}>
        Gender:
      </label>
      <select
        className={`${styles.inputField} ${styles.select}`}
        id="patient-gender"
        required
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <br />

      <label htmlFor="patient-birthdate" className={styles.label}>
        Birthdate:
      </label>
      <input
        className={styles.inputField}
        type="date"
        id="patient-birthdate"
        required
      />
      <br />

      <label htmlFor="patient-address" className={styles.label}>
        Address:
      </label>
      <input
        className={styles.inputField}
        type="text"
        id="patient-address"
        required
      />
      <br />

      <h2 className={styles.formTitle}>Encounter Information</h2>
      <label htmlFor="encounter-id" className={styles.label}>
        Encounter ID:
      </label>
      <input
        className={styles.inputField}
        type="text"
        id="encounter-id"
        required
      />
      <br />

      <label htmlFor="encounter-type" className={styles.label}>
        Type:
      </label>
      <input
        className={styles.inputField}
        type="text"
        id="encounter-type"
        required
      />
      <br />

      <label htmlFor="encounter-start" className={styles.label}>
        Start Time:
      </label>
      <input
        className={styles.inputField}
        type="datetime-local"
        id="encounter-start"
        required
      />
      <br />

      <label htmlFor="encounter-end" className={styles.label}>
        End Time:
      </label>
      <input
        className={styles.inputField}
        type="datetime-local"
        id="encounter-end"
        required
      />
      <br />

      <label htmlFor="encounter-reason" className={styles.label}>
        Reason:
      </label>
      <input
        className={styles.inputField}
        type="text"
        id="encounter-reason"
        required
      />
      <br />

      <h2 className={styles.formTitle}>Observation Information</h2>
      <label htmlFor="observation-id" className={styles.label}>
        Observation ID:
      </label>
      <input
        className={styles.inputField}
        type="text"
        id="observation-id"
        required
      />
      <br />

      <label htmlFor="observation-code" className={styles.label}>
        Observation Code:
      </label>
      <input
        className={styles.inputField}
        type="text"
        id="observation-code"
        required
      />
      <br />

      <label htmlFor="observation-value" className={styles.label}>
        Value:
      </label>
      <input
        className={styles.inputField}
        type="text"
        id="observation-value"
        required
      />
      <br />

      <label htmlFor="observation-unit" className={styles.label}>
        Unit:
      </label>
      <input
        className={styles.inputField}
        type="text"
        id="observation-unit"
        required
      />
      <br />

      <h2 className={styles.formTitle}>Coverage Information</h2>
      <label htmlFor="coverage-id" className={styles.label}>
        Coverage ID:
      </label>
      <input
        className={styles.inputField}
        type="text"
        id="coverage-id"
        required
      />
      <br />

      <label htmlFor="coverage-type" className={styles.label}>
        Coverage Type:
      </label>
      <input
        className={styles.inputField}
        type="text"
        id="coverage-type"
        required
      />
      <br />

      <label htmlFor="coverage-subscriber" className={styles.label}>
        Subscriber ID:
      </label>
      <input
        className={styles.inputField}
        type="text"
        id="coverage-subscriber"
        required
      />
      <br />

      <label htmlFor="coverage-payor" className={styles.label}>
        Payor:
      </label>
      <input
        className={styles.inputField}
        type="text"
        id="coverage-payor"
        required
      />
      <br />

      <h2 className={styles.formTitle}>Medication Statement Information</h2>
      <label htmlFor="medication-id" className={styles.label}>
        Medication Statement ID:
      </label>
      <input
        className={styles.inputField}
        type="text"
        id="medication-id"
        required
      />
      <br />

      <label htmlFor="medication-name" className={styles.label}>
        Medication Name:
      </label>
      <input
        className={styles.inputField}
        type="text"
        id="medication-name"
        required
      />
      <br />

      <label htmlFor="medication-dosage" className={styles.label}>
        Dosage:
      </label>
      <input
        className={styles.inputField}
        type="text"
        id="medication-dosage"
        required
      />
      <br />

      <label htmlFor="medication-frequency" className={styles.label}>
        Frequency:
      </label>
      <input
        className={styles.inputField}
        type="text"
        id="medication-frequency"
        required
      />
      <br />

      <label htmlFor="secret-key" className={styles.label}>
        Secret key for encryption:
      </label>
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

      <span id="message" className={styles.message}>
        {message}
      </span>
      <br />

      <button className={styles.submit} type="submit">
        Submit
      </button>
      <p className={styles["nft-result-value"]}>{ipfsUrl}</p>
    </form>
  );
};

export default TaoHoSo;
