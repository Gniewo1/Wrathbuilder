import React, { useRef } from 'react';
import placeholder from '../../images/Placeholder.png';

function ImageComponent({ onImageSelect }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = React.useState(placeholder);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onImageSelect(file); 
    }
  };

  return (
    <div style={{ display: 'grid', justifyItems: 'center', marginTop: '20px', marginRight:'40px' }}>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: '337px', height: '500px', objectFit: 'cover' }}
        />
      )}
      <button type="button" onClick={handleButtonClick} style={{ marginTop: '10px', width: '300px', height: '50px' }}>
        Change Image
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default ImageComponent;

