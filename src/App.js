import React, { useState } from 'react';
import Uploader from './Uploader';
import Cropper from './Cropper';
import Preview from './Preview';
import './App.css';

function App() {
    const [originalImage, setOriginalImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    
    const handleImageSelected = (imageData) => {
      setOriginalImage(imageData);
      setCroppedImage(null); 
    };
    
    return (
      <div className="App">
        <h1>Auto Image Cropper</h1>
        <p className="app-description">
          Upload images from your device or take a photo. 
          The tool will automatically detect and remove unnecessary areas like black bars.
        </p>
        
        <Uploader onImageSelected={handleImageSelected} />
        
        {originalImage && (
          <Cropper 
            originalImage={originalImage} 
            onCropComplete={setCroppedImage} 
          />
        )}
        
        {originalImage && (
          <Preview 
            originalImage={originalImage}
            croppedImage={croppedImage}
          />
        )}
      </div>
    );
  }
  
  export default App;