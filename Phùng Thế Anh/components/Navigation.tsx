import { CardanoWalletSelector } from "use-cardano";
import Link from 'next/link';

export const Navigation = () => {
  return (
    <nav className="flex h-24 items-center justify-between w-full py-2 fixed-nav" style={{ border: '2px solid #ccc', borderRadius: '10px' }}>
      <div className="flex-grow flex justify-center space-x-4"> 
        <Link href="/" className="menu-item" style={{ padding: '10px 20px', height: '100%', display: 'flex', alignItems: 'center' }}>
          Home
        </Link>
        <div className="dropdown">
          <Link href="/service" className="menu-item" style={{ padding: '10px 20px', height: '100%', display: 'flex', alignItems: 'center' }}>
            Service
          </Link>
          <div className="dropdown-content">
            <Link href="/TaoHoSo">Tạo hồ sơ</Link>
            <Link href="/taonft">Tạo NFT</Link>
            <Link href="/update-nft">Update NFT</Link>
          </div>
        </div>
        <Link href="/about" className="menu-item" style={{ padding: '10px 20px', height: '100%', display: 'flex', alignItems: 'center' }}>
          About
        </Link>
      </div>

      <div style={{ borderRadius: '5px', padding: '5px 10px', display: 'flex', alignItems: 'center', height: '100%' }}>
        <CardanoWalletSelector />
      </div>
    </nav>
  );
};
