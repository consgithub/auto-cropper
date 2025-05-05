import React from 'react';
import './Preview.css';

function Preview({ originalImage, croppedImage }) {
  const downloadCroppedImage = () => {
    if (croppedImage) {
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        const link = document.createElement('a');
        link.href = croppedImage;
        link.download = 'cropped-image.png';
        
        if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
          window.open(croppedImage);
        } else {
          link.click();
        }
      } else {
        const link = document.createElement('a');
        link.href = croppedImage;
        link.download = 'cropped-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };
  
  return (
    <div className="image-preview">
      <div className="preview-container">
        <div className="preview-item">
          <h3>Original Image</h3>
          <img src={originalImage} alt="Original" className="preview-image" />
        </div>
        
        {croppedImage && (
          <div className="preview-item">
            <h3>Cropped Image</h3>
            <img src={croppedImage} alt="Cropped" className="preview-image" />
            <button onClick={downloadCroppedImage} className="download-button">
              Download Cropped Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Preview;