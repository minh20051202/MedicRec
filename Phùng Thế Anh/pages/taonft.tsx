import Head from 'next/head';
import { useState } from 'react';
import Image from 'next/image';

export default function ContactUs() {
  const [isWalletPopupVisible, setWalletPopupVisible] = useState(false);

  const toggleWalletPopup = () => {
    setWalletPopupVisible(!isWalletPopupVisible);
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contact Us</title>
        <link rel="stylesheet" href="/taonft.css" />
      </Head>

      <header>
        <div className="logo-container">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/LogoUTC.jpg/640px-LogoUTC.jpg"
            alt="Hospital Logo"
            width={80}
            height={80}
          />
          <h1 className="fade-in">MedicRec</h1>
        </div>

        <nav>
          <a href="/home" className="menu-item">Home</a>
          <div className="dropdown">
            <a href="/service" className="menu-item">Service</a>
            <div className="dropdown-content">
              <a href="/taohoso">Tạo hồ sơ</a>
              <a href="/taonft">Tạo NFT</a>
              <a href="#">Update NFT</a>
            </div>
          </div>
          <a href="/about" className="menu-item">About</a>
        </nav>

        <div className="wallet-container">
          <button id="connect-wallet-btn" onClick={toggleWalletPopup}>Connect wallet</button>
        </div>

        {isWalletPopupVisible && (
          <div>
            <div id="overlay" className="overlay"></div>
            <div id="wallet-popup" className="wallet-popup">
              <div className="wallet-popup-content">
                <span id="close-popup" className="close" onClick={toggleWalletPopup}>
                  &times;
                </span>
                <h2 style={{ marginBottom: '15px' }}>Connect to your wallet</h2>
                <button id="lucid-connect" style={{ borderRadius: '30px', fontSize: '15px' }}>
                  Connect with Lucid
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="test">
        <div className="container">
          <div className="character-container">
            <img src="/about-3 (1).png" alt="The Designer" />
            <div className="character-label"></div>
          </div>

          <div className="form-container">
            <h2>Tạo NFT</h2>
            <form enctype="multipart/form-data">
              <input type="text" className="input-field" placeholder="Name" required />
              <label htmlFor="image-upload">Upload Image:</label>
              <input type="file" id="image-upload" className="input-field" accept="image/*" required />
              <label htmlFor="patient-gender">mediaType</label>
              <select className="input-field" id="patient-gender" required>
                <option value="image/png">image/png</option>
                <option value="image/jpg">image/jpg</option>
                <option value="image/jpeg">image/jpeg</option>
              </select>
              <input type="url" className="input-field" placeholder="patientInfoUrl" required />
              <textarea className="input-field" placeholder="description"></textarea>
              <button type="submit" className="submit-btn">Send</button>
            </form>
          </div>

          <div className="character-container">
            <img src="/about-3 (1).png" alt="The Developer" />
            <div className="character-label"></div>
          </div>
        </div>
      </div>

      <section className="footer">
        <div className="box">
          <h2 className="logo"><span>Quay </span>lại đầu trang</h2>
          <a href="/home">Home</a>
        </div>

        <h1 className="credit">
          Được tạo bởi <span>MedicRec.</span> Nhằm hỗ trợ bệnh viện lưu trữ hồ sơ bệnh án phi tập trung.
        </h1>
      </section>
    </>
  );
}
