import React, { useRef, useEffect, useState } from 'react';
import { findCropBoundaries } from './CropperAlgorithm';
import './Cropper.css';

function Cropper({ originalImage, onCropComplete }) {
  const canvasRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [options, setOptions] = useState({
    threshold: 20,
    detectDark: true,
    detectLight: true
  });
  
  useEffect(() => {
    if (originalImage) {
      const image = new Image();
      image.src = originalImage;
      
      image.onload = () => {
        const canvas = canvasRef.current;
        canvas.width = image.width;
        canvas.height = image.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
      };
    }
  }, [originalImage]);
  
  const handleOptionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : parseInt(value, 10)
    }));
  };
  
  const processImage = () => {
    setIsProcessing(true);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    const boundaries = findCropBoundaries(
      imageData.data, 
      canvas.width, 
      canvas.height,
      options
    );
    
    const croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = boundaries.width;
    croppedCanvas.height = boundaries.height;
    
    const croppedCtx = croppedCanvas.getContext('2d');
    
    croppedCtx.drawImage(
      canvas, 
      boundaries.left, boundaries.top, 
      boundaries.width, boundaries.height,
      0, 0, 
      boundaries.width, boundaries.height
    );
    
    const croppedDataURL = croppedCanvas.toDataURL('image/png');
    onCropComplete(croppedDataURL);
    
    setIsProcessing(false);
  };
  
  return (
    <div className="image-cropper">
      <canvas ref={canvasRef} className="hidden-canvas"></canvas>
      
      <div className="cropping-options">
        <h3>Cropping Options</h3>
        
        <div className="option-row">
          <label>
            <input 
              type="checkbox" 
              name="detectDark" 
              checked={options.detectDark}
              onChange={handleOptionChange}
            />
            Detect Black Backgrounds
          </label>
        </div>
        
        <div className="option-row">
          <label>
            <input 
              type="checkbox" 
              name="detectLight" 
              checked={options.detectLight}
              onChange={handleOptionChange}
            />
            Detect White Backgrounds
          </label>
        </div>
        
        <div className="option-row">
          <label>
            Colour Tolerance:
            <input 
              type="range" 
              name="threshold" 
              min="5" 
              max="50" 
              value={options.threshold}
              onChange={handleOptionChange}
            />
            {options.threshold}
          </label>
        </div>
      </div>
      
      <button 
        onClick={processImage} 
        disabled={!originalImage || isProcessing}
        className="crop-button"
      >
        {isProcessing ? 'Processing...' : 'Auto-Crop Image'}
      </button>
    </div>
  );
}

export default Cropper;