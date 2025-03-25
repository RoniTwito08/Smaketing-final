import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PostImage from "../postImage/PostImage";
import "./ImageModal.css";

interface ImageModalProps {
  imageUrl: string;
  open: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="image-modal">
      <Box className="modal-box">
        <PostImage image={imageUrl} />
        <Button variant="contained" className="close-button" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ImageModal;
