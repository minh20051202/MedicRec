// Đảm bảo hàm createFhirBundle nằm trước khi sử dụng
function createFhirBundle(values) {
  return {
      resourceType: "Bundle",
      type: "transaction",
      entry: [
          {
              fullUrl: "urn:uuid:" + values.patientID,
              resource: {
                  resourceType: "Patient",
                  id: values.patientID,
                  name: [{
                      use: "official",
                      text: values.patientName
                  }],
                  gender: values.patientGender,
                  birthDate: values.patientBirthdate,
                  address: [{
                      text: values.patientAddress
                  }]
              },
              request: {
                  method: "POST",
                  url: "Patient"
              }
          },
          // Các entry khác...
      ]
  };
}

// Đảm bảo rằng bạn gọi hàm sau khi định nghĩa
document.getElementById('tao_ho_so').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const values = {
      patientID: document.getElementById('patient-id').value,
      patientName: document.getElementById('patient-name').value,
      // Lấy các giá trị khác từ form...
  };
  
  // Gọi hàm createFhirBundle sau khi đã định nghĩa nó
  const fhirBundle = createFhirBundle(values);
  
  console.log(JSON.stringify(fhirBundle, null, 2));
});