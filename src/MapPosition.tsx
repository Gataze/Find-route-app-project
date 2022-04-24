import React from "react";

type NewProps = any;

export const MapPosition: React.FC<NewProps> = (props) => {
  const handleOnChange = (event: Event) => {
    const { onChange } = props;
    // pass the values to the parent component
    if (event.target instanceof HTMLInputElement) {
      onChange(event.target.name, event.target.value);
    }
  };

  const { lat, lng, zoom } = props;

  return (
    <>
      <div>
        Zoom:
        <input
          onChange={() => handleOnChange}
          name="zoom"
          type="number"
          value={zoom}
        />
      </div>
      <div>
        Latitude:
        <input
          onChange={() => handleOnChange}
          name="lat"
          type="number"
          value={lat}
        />
      </div>
      <div>
        Longitude:
        <input
          onChange={() => handleOnChange}
          name="lng"
          type="number"
          value={lng}
        />
      </div>
    </>
  );
};
