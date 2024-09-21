"use client";

import React, { createContext } from "react";
import { WalletContextType } from "../../types/contexts/WalletContextType.d.ts";

const WalletContext = createContext<WalletContextType>(null!);

export default WalletContext;
