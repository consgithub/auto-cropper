export function findCropBoundaries(imageData, width, height, options = {}) {
    const {
      threshold = 20,
      detectDark = true,
      detectLight = true
    } = options;
    
    const pixels = convertTo2DArray(imageData, width, height);
    
    const top = findTopEdge(pixels, width, height, threshold, detectDark, detectLight);
    const bottom = findBottomEdge(pixels, width, height, threshold, detectDark, detectLight);
    const left = findLeftEdge(pixels, width, height, threshold, detectDark, detectLight);
    const right = findRightEdge(pixels, width, height, threshold, detectDark, detectLight);
    
    return {
      top,
      right,
      bottom,
      left,
      width: right - left,
      height: bottom - top
    };
}
  
function convertTo2DArray(imageData, width, height) {
    const pixels = [];
    
    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        
        const r = imageData[index];
        const g = imageData[index + 1];
        const b = imageData[index + 2];
        const a = imageData[index + 3];
        
        row.push({ r, g, b, a });
      }
      pixels.push(row);
    }
    
    return pixels;
}
  
function isBackground(pixel, threshold = 20, detectDark = true, detectLight = true) {
    const isDark = detectDark && pixel.r <= threshold && pixel.g <= threshold && pixel.b <= threshold;
    
    const isLight = detectLight && pixel.r >= (255 - threshold) && pixel.g >= (255 - threshold) && pixel.b >= (255 - threshold);
    
    return isDark || isLight;
}
  
function findTopEdge(pixels, width, height, threshold = 20, detectDark = true, detectLight = true) {
    const rowThreshold = Math.floor(width * 0.95);
    
    for (let y = 0; y < height; y++) {
      let backgroundCount = 0;
      
      for (let x = 0; x < width; x++) {
        if (isBackground(pixels[y][x], threshold, detectDark, detectLight)) {
          backgroundCount++;
        }
      }
      
      if (backgroundCount < rowThreshold) {
        return Math.max(0, y);
      }
    }
    
    return 0; 
}
  
function findBottomEdge(pixels, width, height, threshold = 20, detectDark = true, detectLight = true) {
    const rowThreshold = Math.floor(width * 0.95);
    
    for (let y = height - 1; y >= 0; y--) {
      let backgroundCount = 0;
      
      for (let x = 0; x < width; x++) {
        if (isBackground(pixels[y][x], threshold, detectDark, detectLight)) {
          backgroundCount++;
        }
      }
      
      if (backgroundCount < rowThreshold) {
        return Math.min(height, y + 2);
      }
    }
    
    return height;
}
  
function findLeftEdge(pixels, width, height, threshold = 20, detectDark = true, detectLight = true) {
    const colThreshold = Math.floor(height * 0.95);
    
    for (let x = 0; x < width; x++) {
      let backgroundCount = 0;
      
      for (let y = 0; y < height; y++) {
        if (isBackground(pixels[y][x], threshold, detectDark, detectLight)) {
          backgroundCount++;
        }
      }
      
      if (backgroundCount < colThreshold) {
        return Math.max(0, x - 2);
      }
    }
    
    return 0;
}
  
function findRightEdge(pixels, width, height, threshold = 20, detectDark = true, detectLight = true) {
    const colThreshold = Math.floor(height * 0.95);
    
    for (let x = width - 1; x >= 0; x--) {
      let backgroundCount = 0;
      
      for (let y = 0; y < height; y++) {
        if (isBackground(pixels[y][x], threshold, detectDark, detectLight)) {
          backgroundCount++;
        }
      }
      
      if (backgroundCount < colThreshold) {
        return Math.min(width, x + 2);
      }
    }
    
    return width;
}