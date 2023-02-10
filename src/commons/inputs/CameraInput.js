import React, { useState } from 'react';
import { ImageInput, useInput, useRecordContext } from 'react-admin';
import { Box, makeStyles } from '@material-ui/core';
import { ImageField } from '@semapps/field-components';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import EnableCaptureButton from "../buttons/EnableCaptureButton";
import { useFormState } from 'react-final-form';
import CloseIcon from '@material-ui/icons/Close';
import { mobileAndTabletCheck } from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .react-html5-camera-photo': {
      zIndex: 99,
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }
  },
  cameraContainer: {
    textAlign: 'center',
    marginBottom: 20,
  },
  closeIcon: {
    zIndex: 999,
    position: 'fixed',
    top: 8,
    right: 8
  }
}));

const CameraInput = props => { 
  const classes = useStyles();

  const [captureEnabled, setCaptureEnabled] = useState(false);
  const [dataUri, setDataUri] = useState('');
  const [captureInProgress, setCaptureInProgress] = useState(false);

  const {input} = useInput(props);
  input.value = (captureInProgress && dataUri) ? dataUri : input.value;
  
  const {values} = useFormState();
  values[props.source] = input.value;

  const recordContext = useRecordContext();
  recordContext[props.source] = input.value;

  const handleTakePhotoAnimationDone = dataUri => {
    setCaptureInProgress(true);
    setDataUri(dataUri);
    setCaptureEnabled(false);
  }

  const handleClickEnableCapture = () => {
    setCaptureEnabled(!captureEnabled);
  }
  
  const handleClick = () => {
    setCaptureInProgress(false);
    setDataUri('');
  }

  return (
    <Box className={classes.root}>
      <Box onClick={handleClick}>
        <ImageInput {...props} accept="image/*">
          <ImageField record={recordContext} source="src" />
        </ImageInput>
      </Box>
      { mobileAndTabletCheck() &&
        <Box className={classes.cameraContainer}>
          <EnableCaptureButton handleClickOnEnableCaptureButton = {handleClickEnableCapture} />
          { captureEnabled &&
            // https://github.com/mabelanger/react-html5-camera-photo
            <>
              <Camera  
                onTakePhotoAnimationDone = {handleTakePhotoAnimationDone} 
                idealFacingMode = {FACING_MODES.ENVIRONMENT}
                idealResolution = {{width: 640, height: 480}}
                imageType = {IMAGE_TYPES.JPG}
                imageCompression = {0.97}
                isMaxResolution = {true}
                sizeFactor = {1}
              />
              <CloseIcon className={classes.closeIcon} onClick={handleClickEnableCapture} />
            </>
          }
        </Box>
      }
    </Box>
  )
}

export default CameraInput;
