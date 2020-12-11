import React, { useCallback, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

export default function EditDelete({
  selectedMarker,
  setSelectedMarker,
  isEditModal,
  setIsEditModal,
}) {
  const [imageUrl, setImageUrl] = useState();
  const [owner, setOwner] = useState();
  const [hunter, setHunter] = useState();
  const [comment, setComment] = useState();
  const [favorite, setFavorite] = useState(false);
  const [handmade, setHandmade] = useState(false);

  const submitEditData = useCallback(async () => {
    try {
      const body = {};
      if (imageUrl) body.image_url = imageUrl;
      if (owner) body.owner = owner;
      if (hunter) body.hunter = hunter;
      if (comment) body.comment = comment;
      if (favorite) body.favorite = true;
      if (handmade) body.handmade = true;
      const res = await axios.patch(`/api/magnet/${selectedMarker.id}`, body);
      if (res.status === 200) window.location.reload();
    } catch (err) {
      console.log("Error at axios.patch", err);
    }
  });

  const submitDelete = useCallback(async () => {
    try {
      const res = await axios.delete(`/api/magnet/${selectedMarker.id}`);
      if (res.status === 200) window.location.reload();
    } catch (err) {
      console.log("Error at axios.delete", err);
    }
  });

  return (
    <div className="modal-wrapper">
      <Modal isOpen={isEditModal} onRequestClose={() => setIsEditModal(false)}>
        <h4 className="modal-title">Edit or Delete</h4>
        <div className="modal-body">
          <input
            type="text"
            className="post-input"
            placeholder="Image URL"
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
          ></input>
          <input
            type="text"
            className="post-input"
            placeholder="Owner"
            onChange={(e) => {
              setOwner(e.target.value);
            }}
          ></input>
          <input
            type="text"
            className="post-input"
            placeholder="Hunter"
            onChange={(e) => {
              setHunter(e.target.value);
            }}
          ></input>
          <input
            type="text"
            className="post-input"
            placeholder="Comment"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></input>
          <span>Favorite?</span>
          <input
            type="checkbox"
            className="post-input"
            onChange={(e) => {
              setFavorite(!favorite);
            }}
          ></input>
          <span>Handmade?</span>
          <input
            type="checkbox"
            className="post-input"
            onChange={(e) => {
              setHandmade(!handmade);
            }}
          ></input>
        </div>
        <div className="modal-footer">
          <img
            className="submit-button"
            src="/icons/check.svg"
            onClick={() => {
              submitEditData();
            }}
          ></img>
          <img
            className="submit-button"
            src="/icons/delete.svg"
            onClick={() => {
              if (window.confirm("Are your sure to delete?")) submitDelete();
            }}
          ></img>
          <img
            className="submit-button"
            src="/icons/cancel.svg"
            onClick={() => {
              setSelectedMarker(null);
              setIsEditModal(false);
            }}
          ></img>
        </div>
      </Modal>
    </div>
  );
}
