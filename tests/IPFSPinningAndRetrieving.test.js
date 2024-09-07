import {
  uploadToIPFS,
  retrieveFromIPFS,
} from "../src/utils/IPFSPinningAndRetrieving.js";
import { FHIR_CLIENT, createFHIRBundle } from "../src/utils/manageResource.js";

uploadToIPFS();
