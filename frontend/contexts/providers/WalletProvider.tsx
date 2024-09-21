"use client";

import React, { ReactNode, useContext, useState } from "react";
import { Blockfrost, Lucid } from "lucid-cardano";
import WalletContext from "../../contexts/components/WalletContext.ts";
import LucidContext from "../../contexts/components/LucidContext.ts";
import type { LucidContextType } from "../../types/contexts/LucidContextType.d.ts";

type Props = {
  children: ReactNode;
};

const WalletProvider = function ({ children }: Props) {
  const { setLucid } = useContext<LucidContextType>(LucidContext);

  const connect = async function () {
    try {
      const lucid: Lucid = await Lucid.new(
        new Blockfrost(
          "https://cardano-preprod.blockfrost.io/api/v0/",
          "preprodh3jIigZGB80cyTy7528a6Q3n1yR8NUwT"
        ),
        "Preprod"
      );
      lucid.selectWallet(await window.cardano.eternl.enable());
      setLucid(lucid);
    } catch (error) {
      console.log(error);
    }
  };

  const disconnect = async function () {
    try {
      setLucid(null!);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
