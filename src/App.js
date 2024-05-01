import { Analytics } from '@vercel/analytics/react';

import React, { useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Box, Container } from '@mui/material';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);
  const [fireStarted, setFireStarted] = useState(false);
  const inputRef = useRef(null);  // Create a ref for the file input

  useEffect(() => {
    // Check if running on a mobile device
    const userAgent = typeof window.navigator === "undefined" ? '' : navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    if (isMobile) {
      // Adjust additional mobile-specific settings if necessary
    }
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: 'image/*,application/pdf',
    noClick: true,  // Prevent default click behavior on the dropzone
    noKeyboard: true,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      setFireStarted(true);
      setTimeout(() => setFireStarted(false), 5000);
    }
  });

  const onImageClick = () => {
    // Programmatically click the hidden file input when image is clicked
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <Box className="App" sx={{ bgcolor: 'primary.dark', color: 'grey.300' }}>
      <Container maxWidth="sm" sx={{ width: '100vw', maxWidth: '100%' }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontFamily: 'Pacifico, cursive', // Use the Pacifico font
          fontSize: {
            xs: '4rem', // Smaller devices
            sm: '6rem' // Larger devices
          },
          color: 'transparent', // Hide the original text color
          background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)', // Rainbow gradient
          WebkitBackgroundClip: 'text', // Apply gradient to text only
          WebkitTextFillColor: 'transparent', // Transparent fill for text
          lineHeight: 'normal', // Adjust line height to prevent clipping
          paddingBottom: '0.2em' // Add padding to give space for descenders
        }}
      >
        Bonfirapy
      </Typography>



        <Typography variant="h5" gutterBottom>
          Celebrating the end of a chapter?
        </Typography>
        <Box {...getRootProps({ className: 'dropzone' })} sx={{ border: '2px dashed grey.500' }}>
          <input {...getInputProps({ ref: inputRef })} />
          {isDragActive ?
            <Typography>Drop the files here...</Typography> :
            <Typography>Burn what you want!</Typography>
          }
          <Box component="img" src={fireStarted ? '/fire.gif' : '/firewood2.gif'} alt="Fire Status" onClick={onImageClick} className="fire-image"/>
        </Box>
        {files.length > 0 && (
          <Box mt={2}>
            <Typography variant="h6">Files:</Typography>
            {files.map(file => (
              <Typography key={file.name}>{file.name} - {file.size} bytes</Typography>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;
