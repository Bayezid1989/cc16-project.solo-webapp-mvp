import React from "react";

export default function Grid({ markers, panTo }) {
  let images = markers.map((marker, index) => {
    const lat = marker.lat;
    const lng = marker.lng;
    return (
      <div className="image-wrapper" key={index}>
        <img
          src={marker.image_url}
          alt=""
          className="image"
          onClick={() => {
            panTo({ lat, lng });
          }}
        />
      </div>
    );
  });
  return <div className="grid">{images}</div>;
}
