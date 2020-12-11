import React, { useCallback, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

export default function Post({
  setClickedPlace,
  clickedPlace,
  isPostModal,
  setIsPostModal,
}) {
  const [imageUrl, setImageUrl] = useState();
  const [owner, setOwner] = useState();
  const [hunter, setHunter] = useState();
  const [comment, setComment] = useState();
  const [favorite, setFavorite] = useState(false);
  const [handmade, setHandmade] = useState(false);

  const submitPostData = useCallback(async () => {
    try {
      const getRes = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            language: "en",
            latlng: `${clickedPlace.lat},${clickedPlace.lng}`,
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          },
        }
      );
      let locality;
      let country;
      for (let result of getRes.data.results) {
        if (
          !locality &&
          (result.types[0] === "locality" ||
            result.types[0] === "postal_town" ||
            result.types[0] === "administrative_area_level_4" ||
            result.types[0] === "administrative_area_level_3" ||
            result.types[0] === "administrative_area_level_2" ||
            result.types[0] === "administrative_area_level_1")
        )
          locality = result.address_components[0].long_name;
        if (!country && result.types[0] === "country")
          country = result.address_components[0].long_name;
      }

      const body = {
        image_url: imageUrl,
        lat: clickedPlace.lat,
        lng: clickedPlace.lng,
        owner: owner,
        hunter: hunter,
        comment: comment,
        city: locality,
        country: country,
        favorite: favorite,
        handmade: handmade,
      };
      const postRes = await axios.post("/api/magnet", body);
      if (postRes.status === 200) window.location.reload();
    } catch (err) {
      console.log("Error at axios.post", err);
    }
  });

  return (
    <div className="modal-wrapper">
      <Modal isOpen={isPostModal} onRequestClose={() => setIsPostModal(false)}>
        <h4 className="modal-title">Add Magnet</h4>
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
              if (imageUrl && owner && hunter && comment) {
                submitPostData();
              } else {
                alert("Input all the information!");
              }
            }}
          ></img>
          <img
            className="submit-button"
            src="/icons/cancel.svg"
            data-dismiss="modal"
            onClick={() => {
              setIsPostModal(false);
              setClickedPlace(null);
            }}
          ></img>
        </div>
      </Modal>
    </div>
  );
}
