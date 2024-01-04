import React, { useState } from 'react';
import QRCode from 'qrcode.react';

function App() {
  const [url, setUrl] = useState('');
  const [generated, setGenerated] = useState(false);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    setGenerated(false); // Reset generated flag when URL changes
  };

  const generateQRCode = () => {
    setGenerated(true);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={handleInputChange}
        style={{ padding: '10px', marginRight: '10px' }}
      />
      <button onClick={generateQRCode}>Generate QR Code</button>

      <div style={{ marginTop: '30px' }}>
        {generated && url && <QRCode value={url} size={200} />}
      </div>
    </div>
  );
}

export default App;
