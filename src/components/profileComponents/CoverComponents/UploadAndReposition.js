import React, { useEffect, useRef, useState } from "react";
import { ButtonBase, Dialog, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ArrowBack, ArrowLeft, Check, Delete } from "@mui/icons-material";
import ReactCrop from "react-easy-crop";
import Cropper from "react-easy-crop";

const UploadAndReposition = ({
  selectedImage,
  setSelectedImage,
  setSelectedOperation,
  setCoverCropTmp,
  setCoverImgTmp,
  setLoadingOperation,
}) => {
  const theme = useTheme();
  const downIpad = useMediaQuery(theme.breakpoints.down("ipad"));
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const imgRef = useRef(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [contWidth, setContWidth] = useState(null);
  const [contHeight, setContHeight] = useState(null);

  useEffect(() => {
    setSelectedOperation("upload");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const div = document.getElementById("divMain");
    setContWidth(div ? div.clientWidth : null);
    setContHeight(div ? div.clientWidth / 3 : null);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const div = document.getElementById("divMain");
      setContWidth(div ? div.clientWidth : null);
      setContHeight(div ? div.clientWidth / 3 : null);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onImageLoaded = (image) => {
    imgRef.current = image;
  };

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  //Funzione di backend che permette il caricamento della cropped area nel db e
  //il caricamento dell'immagine in s3
  const onClickConfirm = () => {
    setLoadingOperation(true);
    const image = selectedImage;
    console.log(croppedArea)
    setSelectedImage(null);
    setTimeout(() => {
      setCoverImgTmp(image);
      setCoverCropTmp(croppedArea);
      setSelectedOperation(null);
      setSelectedImage(null);
    }, 2000);
  };

  const onClickClose = () => {
    setSelectedOperation(null);
    setSelectedImage(null);
  };

  return (
    <>
      {(selectedImage && !downIpad) && (
        <div id="divMain" style={{ width: "100%", height: contHeight, position: "absolute" }}>
          <ReactCrop
            image={selectedImage}
            crop={crop}
            zoom={zoom}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onImageLoaded={onImageLoaded}
            onCropComplete={onCropComplete}
            objectFit="cover"
            cropSize={{ width: contWidth, height: contHeight }}
            showGrid={false}
          />
          <div style={{ display: "flex", position: "absolute", bottom: "5px", right: "5px" }}>
            <ButtonBase
              style={{
                position: "relative",
                bottom: "0px",
                borderRadius: "10px",
                padding: "3px",
                backgroundColor: theme.palette.primary.light,
              }}
              onClick={onClickConfirm}
            >
              <Check style={{ fontSize: "15px", color: theme.palette.primary.dark }} />
              <Typography style={{ fontSize: "13px", marginLeft: "3px", color: theme.palette.primary.dark }}>
                Conferma
              </Typography>
            </ButtonBase>
            <div style={{ width: "10px" }} />
            <ButtonBase
              style={{
                position: "relative",
                bottom: "0px",
                borderRadius: "10px",
                padding: "3px",
                backgroundColor: theme.palette.primary.light,
              }}
              onClick={onClickClose}
            >
              <Delete style={{ fontSize: "15px", color: theme.palette.primary.dark }} />
              <Typography style={{ fontSize: "13px", marginLeft: "3px", color: theme.palette.primary.dark }}>
                Annulla
              </Typography>
            </ButtonBase>
          </div>
        </div>
      )}
      {(selectedImage && downIpad) && 
      <Dialog open fullScreen>
        <DialogTitle style={{padding: "0px", position: "absolute", display: "flex", width: "100%", zIndex: "10", backgroundColor: theme.palette.background.paper}}>
            <IconButton style={{marginRight: "auto"}} onClick={onClickClose}>
                <ArrowBack />
            </IconButton>
            <IconButton style={{alignContent: "center"}} onClick={onClickConfirm}>
                <Typography fontSize={17}>Save</Typography>
                <Check />
            </IconButton>
        </DialogTitle>
        <DialogContent style={{padding: "0px", display: "flex", justifyContent: "center"}}>
        <Cropper
            style={{containerStyle: {width: contWidth, position: "relative"}}}
            image={selectedImage}
            crop={crop}
            zoom={zoom}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onImageLoaded={onImageLoaded}
            onCropComplete={onCropComplete}
            showGrid={false}
            mediaProps={{width: contWidth}}
            cropSize={{ width: contWidth, height: contHeight }}
        />
        </DialogContent>
      </Dialog>
      }
    </>
  );
};

export default UploadAndReposition;
