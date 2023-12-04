import React, { useEffect, useRef, useState } from "react";
import {
  ButtonBase,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close, Edit } from "@mui/icons-material";
import getCroppedImg from "./CoverComponents/cropLib";
import UploadAndReposition from "./CoverComponents/UploadAndReposition";
import nullCoverImage from "../../images/cover-1500x500.png";
import { flexbox } from "@mui/system";

function Cover({ user, isGuestProfile }) {
  const theme = useTheme();
  const downIpad = useMediaQuery(theme.breakpoints.down("ipad"));
  const [loading, setLoading] = useState(true);
  const [showEditButton, setShowEditButton] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [loadingOperation, setLoadingOperation] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [openCoverImage, setOpenCoverImage] = useState(false);
  const [divWidth, setDivWidth] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [lockEditButton, setLockEditButton] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [coverImgTmp, setCoverImgTmp] = useState(null);
  const [coverCropTmp, setCoverCropTmp] = useState(null);

  const showHideEditButton = (boolean) => {
    if (!isGuestProfile) {
      setShowEditButton(boolean);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setLockEditButton(false);
  };

  const onClickEditButton = (event) => {
    setLockEditButton(true);
    setAnchorEl(event.currentTarget);
  };

  const onClickUpload = () => {
    inputCoverRef.current.click();
    handleClose();
  };

  const inputCoverRef = useRef();

  const onSelectCoverFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setSelectedImage(reader.result);
      });
    }
    inputCoverRef.current.value = null;
  };

  useEffect(() => {
    async function cropImage() {
      if (coverImgTmp && coverCropTmp) {
        const crpImage = await getCroppedImg(coverImgTmp, coverCropTmp);
        setCroppedImage(crpImage);
        setLoadingOperation(false);
      }
    }
    cropImage();
  }, [coverImgTmp, coverCropTmp]);

  useEffect(() => {
    const div = document.getElementById("divMain");
    setDivWidth(div ? div.clientWidth : null);

    async function cropImage() {
      if (user.coverCrop && user.cover) {
        const crpImage = await getCroppedImg(user.cover, user.coverCrop);
        setCroppedImage(crpImage);
        setLoading(false);
      }else{
        setCroppedImage(nullCoverImage);
        setLoading(false);
      }
    }
    cropImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const div = document.getElementById("divMain");
      setDivWidth(div ? div.clientWidth : null);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onClickCover = () => {
    setOpenCoverImage(true);
  };

  const handleCloseCover = () => {
    setOpenCoverImage(false);
  };

  const onClickCoverDownIpad = (event) => {
    console.log(showEditButton);
    console.log(selectedOperation);
    if(!isGuestProfile && selectedOperation === null){
        setAnchorEl(event.currentTarget);
    }else{
        setOpenCoverImage(true);
    }
  }

  const onClickToShowCover = () => {
    handleClose();
    setOpenCoverImage(true);
  }

  return (
    <div
      id="divMain"
      style={{
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        display: "flex",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        overflow: "hidden",
        zIndex: 1,
        width: "100%",
      }}
      onMouseOver={() => showHideEditButton(true)}
      onMouseOut={() => !lockEditButton && showHideEditButton(false)}
    >
      {!loading && !loadingOperation && selectedOperation === null && (
        <>
          <img
            alt={`Copertina di ${user.nickname}`}
            src={croppedImage}
            onClick={downIpad ? onClickCoverDownIpad : onClickCover}
            style={{ width: "100%", position: "absolute", zIndex: 1 }}
          />
        </>
      )}
      <Skeleton
        height={divWidth / 3}
        width={divWidth}
        style={{ zIndex: 0 }}
        variant="rectangular"
      />
      <Dialog open={openCoverImage} fullWidth onClose={handleCloseCover}>
        <div style={{ display: "flex", flexDirection: "column", margin: "5px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <IconButton
              onClick={() => setOpenCoverImage(false)}
              style={{ position: "relative", marginLeft: "auto" }}
            >
              <Close style={{ fontSize: "20px", color: theme.palette.primary.dark }} />
            </IconButton>
          </div>
          <div style={{display: "flex", alignItems: "center"}}>
            <img alt={`Copertina di ${user.nickname}`} src={coverImgTmp ? coverImgTmp : user.cover} style={{ width: "100%", zIndex: 2 }} />
          </div>
        </div>
      </Dialog>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {downIpad && (user.cover || coverImgTmp) && <MenuItem onClick={onClickToShowCover}>Visualizza copertina</MenuItem>}
        <MenuItem onClick={onClickUpload}>Carica foto</MenuItem>
        <MenuItem disabled={(user.cover || coverImgTmp) ? false : true}>Riposiziona</MenuItem>
        <MenuItem disabled={(user.cover || coverImgTmp) ? false : true}>Elimina</MenuItem>
      </Menu>

      <input
        type="file"
        accept="images"
        ref={inputCoverRef}
        style={{ display: "none" }}
        onChange={onSelectCoverFile}
      />
      {selectedImage && (
        <UploadAndReposition
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setSelectedOperation={setSelectedOperation}
          setCoverImgTmp={setCoverImgTmp}
          setCoverCropTmp={setCoverCropTmp}
          setLoadingOperation={setLoadingOperation}
        />
      )}

      {showEditButton && selectedOperation === null && !downIpad && (
        <ButtonBase
          style={{
            position: "absolute",
            right: "5px",
            bottom: "5px",
            borderRadius: "10px",
            padding: "3px",
            backgroundColor: theme.palette.primary.light,
            zIndex: 1,
          }}
          onClick={onClickEditButton}
        >
          <Edit style={{ fontSize: "15px", color: theme.palette.primary.dark }} />
          <Typography style={{ fontSize: "13px", marginLeft: "3px", color: theme.palette.primary.dark }}>
            Modifica copertina
          </Typography>
        </ButtonBase>
      )}
    </div>
  );
}

export default Cover;
