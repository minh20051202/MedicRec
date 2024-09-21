"use client";

import React, { createContext } from "react";
import { LucidContextType } from "../../types/contexts/LucidContextType.d.ts";

const LucidContext = createContext<LucidContextType>(null!);

export default LucidContext;
