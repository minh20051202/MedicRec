"use client";

import React, { createContext } from "react";
import type { LucidContextType } from "../../types/contexts/LucidContextType.d.ts";

const LucidContext = createContext<LucidContextType>(null!);

export default LucidContext;
