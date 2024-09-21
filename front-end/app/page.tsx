import React, { lazy } from "react";
const MedicRec = lazy(() => import("../src/components/MedicRec.tsx"));

const Home: React.FC = () => {
  return (
    <div>
      <div>
        <h2>Tạo NFT</h2>
        <MedicRec />
      </div>
    </div>
  );
};

export default Home;
