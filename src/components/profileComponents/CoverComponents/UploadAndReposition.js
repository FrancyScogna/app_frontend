import React, { useEffect, useRef, useState } from "react";
import { ButtonBase, Typography, useTheme } from "@mui/material";
import { Check, Delete } from "@mui/icons-material";
import ReactCrop from "react-easy-crop";

const UploadAndReposition = ({
  selectedImage,
  setSelectedImage,
  setSelectedOperation,
  setCoverCropTmp,
  setCoverImgTmp,
  setLoadingOperation,
}) => {
  const theme = useTheme();
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
      {selectedImage && (
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
    </>
  );
};

export default UploadAndReposition;
