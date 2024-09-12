import {
  uploadToIPFS,
  retrieveFromIPFS,
} from "../utils/IPFSPinningAndRetrieving.js";
import { encryptData, decryptData } from "../utils/encryptAndDecrypt.js";

const data = `{
	"resourceType" : "Patient",
	"identifier" : [{ Identifier }],
	"active" : <boolean>,
	"name" : [{ HumanName }],
	"telecom" : [{ ContactPoint }],
	"gendaaer" : "<code>",
	"birthDate" : "<date>",
	"deceasedBoolean" : <boolean>,
	"deceasedDateTime" : "<dateTime>",
	"address" : [{ Address }],
	"maritalStatusaa" : { CodeableConcept },
	"multipleBirthBoolean" : <boolean>,
	"multipleBirthInteger" : <integer>,
	"photo" : [{ Attachment }],
	"contact" : [{
	  "relationship" : [{ CodeableConcept }],
	  "name" : { HumanName },
	  "telecom" : [{ ContactPoint }],
	  "address" : { Address },
	  "gender" : "<code>",
	  "organization" : { Reference(Organization) },
	  "period" : { Period }
	}],
	"communication" : [{
	  "language" : { CodeableConcept },
	  "preferred" : <boolean>
	}],
	"generalPractitioner" : [{ Reference(Organization|Practitioner|
	 PractitionerRole) }],
	"managingOrganization" : { Reference(Organization) },
	"link" : [{
	  "other" : { Reference(Patient|RelatedPerson) },
	  "type" : "<code>"
	}],
	 "resourceType" : "BiologicallyDerivedProduct",
  // from Resource: id, meta, implicitRules, and language
  // from DomainResource: text, contained, extension, and modifierExtension
  "productCategory" : { Coding }, // organ | tissue | fluid | cells | biologicalAgent
  "productCode" : { CodeableConcept }, // A code that identifies the kind of this biologically derived product
  "parent" : [{ Reference(BiologicallyDerivedProduct) }], // The parent biologically-derived product
  "request" : [{ Reference(ServiceRequest) }], // Request to obtain and/or infuse this product
  "identifier" : [{ Identifier }], // Instance identifier
  "biologicalSourceEvent" : { Identifier }, // An identifier that supports traceability to the event during which material in this product from one or more biological entities was obtained or pooled
  "processingFacility" : [{ Reference(Organization) }], // Processing facilities responsible for the labeling and distribution of this biologically derived product
  "division" : "<string>", // A unique identifier for an aliquot of a product
  "productStatus" : { Coding }, // available | unavailable
  "expirationDate" : "<dateTime>", // Date, and where relevant time, of expiration
  "collection" : { // How this product was collected
    "collector" : { Reference(Practitioner|PractitionerRole) }, // Individual performing collection
    "source" : { Reference(Organization|Patient) }, // The patient who underwent the medical procedure to collect the product or the organization that facilitated the collection
    // collected[x]: Time of product collection. One of these 2:
    "collectedDateTime" : "<dateTime>",
    "collectedPeriod" : { Period }
  },
  "storageTempRequirements" : { Range }, // Product storage temperature requirements
  "property" : [{ // A property that is specific to this BiologicallyDerviedProduct instance
    "type" : { CodeableConcept }, // R!  Code that specifies the property
    // value[x]: Property values. One of these 9:
    "valueBoolean" : <boolean>,
    "valueInteger" : <integer>,
    "valueCodeableConcept" : { CodeableConcept },
    "valuePeriod" : { Period },
    "valueQuantity" : { Quantity },
    "valueRange" : { Range },
    "valueRatio" : { Ratio },
    "valueString" : "<string>",
    "valueAttachment" : { Attachment }
  }],
   "resourceType" : "Substance",
  // from Resource: id, meta, implicitRules, and language
  // from DomainResource: text, contained, extension, and modifierExtension
  "identifier" : [{ Identifier }], // Unique identifier
  "instance" : <boolean>, // R!  Is this an instance of a substance or a kind of one
  "status" : "<code>", // active | inactive | entered-in-error
  "category" : [{ CodeableConcept }], // What class/type of substance this is
  "code" : { CodeableReference(SubstanceDefinition) }, // R!  What substance this is
  "description" : "<markdown>", // Textual description of the substance, comments
  "expiry" : "<dateTime>", // When no longer valid to use
  "quantity" : { Quantity(SimpleQuantity) }, // Amount of substance in the package
  "ingredient" : [{ // Composition information about the substance
    "quantitaaay" : { Ratio }, //â Optional amount (concentration)
    // subaaaastaaance[x]: A component of the substance. One of these 2:
    "substanceCodeaâbleaaCoaaaaââancepaaat" : { CodeableConcept },
    "substanceReferaaenaaaâaaaaceaaaaấsaeeeaaeaaeeedđ" : { Reference(Substance) }
  }]
  }`;

const secretKey = "your-secret-keys";
const encrypted = encryptData(data, secretKey);
const url = await uploadToIPFS(encrypted, "Patient");
console.log(url);
const retrievedData = await retrieveFromIPFS(url);
const decryptedData = decryptData(retrievedData, secretKey);
console.log(decryptedData);
