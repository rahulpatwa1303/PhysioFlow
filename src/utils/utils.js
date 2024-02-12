export const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let backgroundColor = '#';
  
    // Generate random background color
    for (let i = 0; i < 6; i++) {
      backgroundColor += letters[Math.floor(Math.random() * 16)];
    }
  
    // Determine text color based on background brightness
    const hexToRgb = (hex) =>
      hex.match(/[A-Za-z0-9]{2}/g).map((v) => parseInt(v, 16));
  
    const rgb = hexToRgb(backgroundColor);
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
  
    const textColor = brightness > 128 ? '#000000' : '#FFFFFF';
  
    return { backgroundColor, textColor };
  };