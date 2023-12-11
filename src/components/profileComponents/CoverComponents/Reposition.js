import React, { useEffect, useRef, useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ArrowBack, Check, Delete } from "@mui/icons-material";
import ReactCrop from "react-easy-crop";
import Cropper from "react-easy-crop";

const Reposition = ({
  coverImage,
  setCoverCropTmp,
  setCoverImgTmp,
  setLoadingOperation,
  setSelectedOperation
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
    const div = document.getElementById("divMain");
    const width = div ? div.clientWidth : null;
    const height = div ? div.clientWidth / 3 : null
    setContWidth(width);
    setContHeight(height);
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

  //Funzione di backend che permette il caricamento della cropped area nel db (l'immagine è la stessa)
  const onClickConfirm = () => {
    setLoadingOperation(true);
    const image = coverImage;
    setSelectedOperation(null);
    setTimeout(() => {
      setCoverImgTmp(image);
      setCoverCropTmp(croppedArea);
    }, 2000);
  };

  const onClickClose = () => {
    setSelectedOperation(null);
  };

  return (
    <>
      {(!downIpad) && (
        <div id="divMain" style={{ width: "100%", height: contHeight, position: "absolute" }}>
          <ReactCrop
            image={coverImage}
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
          <Button
              variant="contained"
              style={{
                position: "absolute",
                right: "90px",
                bottom: "5px",
                padding: "4px",
                zIndex: 1
              }}
              onClick={onClickConfirm}
            >
              <Typography style={{display: "flex", flexDirection: "row", alignItems: "center", fontSize: "11px", fontWeight: "bolder"}}>
                <Check style={{ fontSize:"12px", marginRight: "2px", marginBottom: "2px" }} />
                Salva
              </Typography>
            </Button>
            <div style={{ width: "10px" }} />
            <Button
              variant="contained"
              style={{
                position: "absolute",
                right: "5px",
                bottom: "5px",
                padding: "4px",
                zIndex: 1,
              }}
              onClick={onClickClose}
            >
              <Typography style={{display: "flex", flexDirection: "row", alignItems: "center", fontSize: "11px", color: theme.palette.customColors.delete, fontWeight: "bolder"}}>
                <Delete style={{ fontSize:"12px", marginRight: "2px", marginBottom: "2px" }} />
                Annulla
              </Typography>
            </Button>
          </div>
        </div>
      )}
      {(downIpad) && 
      <Dialog open fullScreen>
        <DialogTitle style={{padding: "0px", position: "absolute", display: "flex", width: "100%", zIndex: "10", backgroundColor: theme.palette.background.paper}}>
            <IconButton style={{marginRight: "auto"}}  onClick={onClickClose}>
                <ArrowBack />
            </IconButton>
            <IconButton style={{alignContent: "center", borderRadius: "30px"}} onClick={onClickConfirm}>
                <Typography style={{fontSize: "16px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                  <Check style={{marginBottom: "2px", fontSize: "18px"}} />
                  Save
                </Typography>
            </IconButton>
        </DialogTitle>
        <DialogContent style={{padding: "0px", display: "flex", justifyContent: "center"}}>
        <Cropper
            style={{containerStyle: {width: contWidth, position: "relative"}}}
            image={coverImage}
            crop={crop}
            zoom={zoom}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onImageLoaded={onImageLoaded}
            onCropComplete={onCropComplete}
            showGrid={false}
            mediaProps={{width: contWidth}}
            objectFit="horizontal-cover"
            cropSize={{ width: contWidth, height: contHeight }}
        />
        </DialogContent>
      </Dialog>
      }
    </>
  );
};

export default Reposition;
