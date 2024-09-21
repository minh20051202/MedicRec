"use client";

import React, { createContext } from "react";
import type { SmartContractContextType } from "../../types/contexts/SmartContractContextType.d.ts";
const SmartContractContext = createContext<SmartContractContextType>(null!);

export default SmartContractContext;
