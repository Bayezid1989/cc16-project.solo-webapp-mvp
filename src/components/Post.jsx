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
      <Modal
        isOpen={isPostModal}
        onRequestClose={() => setIsPostModal(false)}
        overlayClassName={{
          base: "overlay-base",
          afterOpen: "overlay-after",
          beforeClose: "overlay-before",
        }}
        className={{
          base: "content-base",
          afterOpen: "content-after",
          beforeClose: "content-before",
        }}
        closeTimeoutMS={200}
      >
        <div className="modal-header">
          <h2 className="modal-title">Add Magnet</h2>
        </div>
        <div className="modal-body">
          <input
            type="text"
            className="modal-input"
            placeholder="Image URL"
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
          ></input>
          <input
            type="text"
            className="modal-input"
            placeholder="Owner"
            onChange={(e) => {
              setOwner(e.target.value);
            }}
          ></input>
          <input
            type="text"
            className="modal-input"
            placeholder="Hunter"
            onChange={(e) => {
              setHunter(e.target.value);
            }}
          ></input>
          <input
            type="text"
            className="modal-input modal-comment"
            placeholder="Comment"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></input>
          <div className="modal-input">
            <label className="check-label" htmlFor="post-check-favorite">
              Favorite
            </label>
            <input
              id="post-check-favorite"
              type="checkbox"
              className="checkbox"
              onChange={() => {
                setFavorite(!favorite);
              }}
            ></input>
          </div>
          <div className="modal-input">
            <label className="check-label" htmlFor="post-check-handmade">
              Handmade
            </label>
            <input
              id="post-check-handmade"
              type="checkbox"
              className="checkbox"
              onChange={() => {
                setHandmade(!handmade);
              }}
            ></input>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="submit-button green modal-button"
            onClick={() => {
              if (imageUrl && owner && hunter && comment) {
                submitPostData();
              } else {
                alert("Input all the information!");
              }
            }}
          >
            Add
          </button>
          <button
            className="submit-button grey modal-button"
            onClick={() => {
              setIsPostModal(false);
              setClickedPlace(null);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
