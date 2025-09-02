// Image utility functions
export const handleImageError = (e) => {
  console.warn('Image failed to load:', e.target.src);
  e.target.style.display = 'none';
  // You could set a fallback image here
  // e.target.src = '/assets/fallback-image.jpg';
};

export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Clipboard utility with fallback
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // Modern browsers with secure context
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      } catch (err) {
        document.body.removeChild(textArea);
        throw err;
      }
    }
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

// File download utility
export const downloadFile = (url, filename) => {
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('Download failed:', err);
    return false;
  }
};

// Check if file exists
export const checkFileExists = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (err) {
    return false;
  }
};

// Validate resume file
export const validateResumeFile = async () => {
  const resumeUrl = '/assets/Sujith_Resume.pdf';
  const exists = await checkFileExists(resumeUrl);
  
  if (!exists) {
    console.warn('Resume file not found:', resumeUrl);
    return false;
  }
  
  return resumeUrl;
};
