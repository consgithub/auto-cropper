import React, { useRef, useState } from 'react';
import './Uploader.css';

function Uploader({ onImageSelected }) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [cameraFileName, setCameraFileName] = useState("No file chosen");
  
  const handleFileChange = (event, inputType) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      if (inputType === 'file') {
        setFileName(file.name);
      } else {
        setCameraFileName(file.name);
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelected(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  return (
    <div className="image-uploader">
      <div className="upload-option">
        <button onClick={triggerFileInput} className="upload-button">
          Select Image from Device
        </button>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => handleFileChange(e, 'file')} 
          ref={fileInputRef}
          className="hidden-input"
        />
        <span className="file-name">{fileName}</span>
      </div>
      
      <div className="upload-option">
        <label className="camera-button">
          Take Photo with Camera
          <input 
            type="file" 
            accept="image/*" 
            capture="environment"
            onChange={(e) => handleFileChange(e, 'camera')} 
            className="hidden-input"
          />
        </label>
        <span className="file-name">{cameraFileName}</span>
      </div>
    </div>
  );
}

export default Uploader;