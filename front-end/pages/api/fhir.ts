// pages/api/fhir/[...path].js
export default async function handler(req, res) {
  const { method, query, body } = req;
  const { path } = query;

  // Construct the full URL for the FHIR server
  const url = `https://server.fire.ly/${path.join("/")}${
    req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : ""
  }`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/fhir+json",
      Accept: "application/fhir+json",
    },
  };

  // Only include body for non-GET requests
  if (method !== "GET" && body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // Set CORS headers
    res.setHeader(
      "Access-Control-Allow-Origin",
      process.env.ALLOWED_ORIGIN || "*"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight requests
    if (method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error in FHIR API route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
