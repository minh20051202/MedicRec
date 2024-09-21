import { CardanoWalletSelector } from "use-cardano";
import Link from 'next/link';

export const Navigation = () => {
  return (
    <nav className="flex h-24 items-center justify-between w-full py-2 fixed-nav" style={{ border: '2px solid #ccc', borderRadius: '10px' }}>
  
  <div className="flex-grow flex justify-center space-x-4"> 
    <a href="http://localhost:4202/" className="menu-item" style={{ padding: '10px 20px', height: '100%', display: 'flex', alignItems: 'center' }}>Home</a>
    <div className="dropdown">
      <a href="Service.html" className="menu-item" style={{ padding: '10px 20px', height: '100%', display: 'flex', alignItems: 'center' }}>Service</a>
      <div className="dropdown-content">
        <a href="/taohoso">Tạo hồ sơ</a>
        <a href="/taonft">Tạo NFT</a>
        <a href="#">Update NFT</a>
      </div>
    </div>
    <a href="About.html" className="menu-item" style={{ padding: '10px 20px', height: '100%', display: 'flex', alignItems: 'center' }}>About</a>
  </div>

  <div style={{ borderRadius: '5px', padding: '5px 10px', display: 'flex', alignItems: 'center', height: '100%' }}>
    <CardanoWalletSelector />
  </div>

</nav>
  );
};
