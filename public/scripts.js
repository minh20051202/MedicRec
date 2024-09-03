import { encryptData } from "../src/utils/encryptAndDecrypt";
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#myForm");
  if (!form) {
    console.error("Form element not found");
    return;
  }
  form.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(form);
      const rawJsonData = Object.fromEntries(formData.entries());
      const secretKey = rawJsonData["secret-key"];
      const filteredJsonData = Object.fromEntries(
        Object.entries(rawJsonData).filter(
          ([key, value]) => key !== "secret-key"
        )
      );
      const jsonString = JSON.stringify(filteredJsonData);
      const blob = new Blob([jsonString], { type: "application/json" });
      saveFile(blob, "patient.fhir.json");
      const encryptedData = encryptData(jsonString, secretKey);
      console.log(encryptedData);
    } catch (error) {
      console.error("Error processing form data:", error);
    }
  });
});

function saveFile(blob, fileName) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}
