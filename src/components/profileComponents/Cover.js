import React, { useEffect, useRef, useState } from "react";
import {
  Button,
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
import { AddPhotoAlternate, Close, Delete, Edit, Height, InsertPhoto } from "@mui/icons-material";
import getCroppedImg from "./CoverComponents/cropLib";
import UploadAndReposition from "./CoverComponents/UploadAndReposition";
import nullCoverImage from "../../images/cover-1500x500.png";
import Reposition from "./CoverComponents/Reposition";
import DeleteCoverDialog from "./CoverComponents/DeleteCoverDialog";
import { lightenHexColor } from "../../libs/utilFunctions";
import ShowCoverImage from "./CoverComponents/ShowCoverImage";

function Cover({ user, isGuestProfile }) {
  const theme = useTheme();
  const downIpad = useMediaQuery(theme.breakpoints.down("ipad"));
  const downDesktop = useMediaQuery(theme.breakpoints.down("desktop"));
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

  const onClickCoverDownIpad = (event) => {
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

  const onClickReposition = () => {
    setSelectedOperation("reposition"); 
    handleClose();
  }

  const onClickDelete = () => {
    setSelectedOperation("delete");
    handleClose();
  }

  const menuItems = [
    {
      key: "view-cover", 
      text: "Visualizza copertina", 
      icon: <InsertPhoto style={{fontSize: "16px", marginRight: "2px", color: theme.palette.primary.dark}} />,
      displayCondition: !downDesktop ? "none" : "flex",
      disabledContition: false,
      fn: onClickToShowCover
    },
    {
      key: "upload-cover", 
      text: "Carica foto", 
      icon: <AddPhotoAlternate style={{fontSize: "16px", marginRight: "2px"}} />,
      displayCondition: "flex",
      disabledContition: false,
      fn: onClickUpload
    },
    {
      key: "reposition-cover", 
      text: "Riposiziona", 
      icon: <Height style={{fontSize: "16px", marginRight: "2px"}} />,
      displayCondition: "flex",
      disabledContition: (user.cover || coverImgTmp) ? false : true,
      fn: onClickReposition
    },
    {
      key: "delete-cover", 
      text: "Elimina", 
      icon: <Delete style={{fontSize: "16px", marginRight: "2px"}} />,
      displayCondition: "flex",
      disabledContition: (user.cover || coverImgTmp) ? false : true,
      fn: onClickDelete
    },
  ]

  return (
    <div
      id="divMain"
      style={{
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        display: "flex",
        overflow: "hidden",
        zIndex: 1,
        width: "100%",
      }}
      onMouseOver={() => showHideEditButton(true)}
      onMouseOut={() => !lockEditButton && showHideEditButton(false)}
    >
      {!loading && !loadingOperation && (selectedOperation === null || selectedOperation === "delete") && (
        <>
          <img
            alt={`Copertina di ${user.nickname}`}
            src={croppedImage}
            onClick={downDesktop ? onClickCoverDownIpad : onClickCover}
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
      <ShowCoverImage nickname={user.nickname} src={coverImgTmp ? coverImgTmp : user.cover} open={openCoverImage} setOpen={setOpenCoverImage} />
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.key}
            style={{fontSize: "14px", color: lightenHexColor(theme.palette.primary.dark, 20), display: item.displayCondition }}
            disabled={item.disabledContition}
            onClick={item.fn}
          >
            {item.icon}
            {item.text}
          </MenuItem>
        ))}
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
      {selectedOperation === "reposition" && 
        <Reposition 
          coverImage={coverImgTmp ? coverImgTmp : user.cover} 
          setCoverCropTmp={setCoverCropTmp}
          setCoverImgTmp={setCoverImgTmp} 
          setLoadingOperation={setLoadingOperation}
          setSelectedOperation={setSelectedOperation}
        />
      }
      {selectedOperation === "delete" &&
        <DeleteCoverDialog
          setSelectedOperation={setSelectedOperation}
        />
      }

      {showEditButton && selectedOperation === null && !downDesktop && (
        <Button
        variant="contained"
        style={{
          position: "absolute",
          right: "5px",
          bottom: "5px",
          padding: "4px",
          zIndex: 1,
        }}
        onClick={onClickEditButton}
        >
          <Typography style={{display: "flex", flexDirection: "row", alignItems: "center", fontSize: "11px", fontWeight: "bolder"}}>
            <Edit style={{ fontSize:"12px", marginRight: "2px", marginBottom: "2px" }} />
            Modifica Copertina
          </Typography>
        </Button>
      )}
    </div>
  );
}

export default Cover;
