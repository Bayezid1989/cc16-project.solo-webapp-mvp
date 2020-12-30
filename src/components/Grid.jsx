import React from "react";
import { Image } from "cloudinary-react";

export default function Grid({ markers, panTo }) {
  let images = markers.map((marker, index) => {
    const lat = marker.lat;
    const lng = marker.lng;
    return (
      // <div className="image-wrapper" key={index}>
      <Image
        key={index}
        className="image"
        cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
        publicId={marker.image_path}
        crop="scale"
        onClick={() => {
          panTo({ lat, lng });
        }}
      />
      // </div>
    );
  });
  return <div className="grid">{images}</div>;
}
