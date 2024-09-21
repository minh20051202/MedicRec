const FHIR_CLIENT = (() => {
    const BASE_URL = "https://server.fire.ly";
    const HEADERS = {
      "Content-Type": "application/fhir+json",
      Accept: "application/fhir+json",
    };
  
  
    const handleResponse = async (response) => {
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Error: ${response.status} - ${error}`);
      }
      return response.json();
    };
  
  
    const fetchWithOptions = (url, method, body = null) => {
      const options = {
        method,
        headers: HEADERS,
      };
      if (body) options.body = JSON.stringify(body);
      return fetch(url, options).then(handleResponse);
    };
  
  
    return {
      create: (resourceType, resourceData) =>
        fetchWithOptions(`${BASE_URL}/${resourceType}`, "POST", resourceData),
  
  
      read: (resourceType, resourceId) =>
        fetchWithOptions(`${BASE_URL}/${resourceType}/${resourceId}`, "GET"),
  
  
      update: (resourceType, resourceId, updatedData) =>
        fetchWithOptions(
          `${BASE_URL}/${resourceType}/${resourceId}`,
          "PUT",
          updatedData
        ),
  
  
      delete: async (resourceType, resourceId) => {
        await fetchWithOptions(
          `${BASE_URL}/${resourceType}/${resourceId}`,
          "DELETE"
        );
        return { status: "Resource deleted successfully" };
      },
  
  
      search: (resourceType, params) =>
        fetchWithOptions(
          `${BASE_URL}/${resourceType}?${new URLSearchParams(params)}`,
          "GET"
        ),
    };
  })();
  
  
  const createFHIRBundle = (resources) => {
    return {
      resourceType: "Bundle",
      type: "collection",
      entry: resources.map((resource) => ({
        resource: resource,
      })),
    };
  };
  export { FHIR_CLIENT, createFHIRBundle };