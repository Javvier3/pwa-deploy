import React, { useState, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript, StandaloneSearchBox, Marker } from "@react-google-maps/api";
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const libraries = ["places"];

const Mapita = ({markers, setMarkers}) => {
  const [mapCenter, setMapCenter] = useState({ lat: 18.9261, lng: -99.23075 });
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const searchBox = useRef(null);

  const onMapClick = useCallback((e) => {
    setMarkers([
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    ]);
  }, []);

  const onSearchBoxLoad = useCallback((ref) => {
    searchBox.current = ref;
  }, []);

  const onPlacesChanged = useCallback(() => {
    const places = searchBox.current.getPlaces();

    if (places.length > 0) {
      const selectedPlace = places[0];
      const newMarkers = [
        {
          lat: selectedPlace.geometry.location.lat(),
          lng: selectedPlace.geometry.location.lng(),
        },
      ];
      setMarkers(newMarkers);

      // Update the map center to the selected place
      setMapCenter({
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      });

      // Clear the search box input
      setSearchBoxValue("");
    }
  }, []);

  const handleSearchBoxChange = (e) => {
    setSearchBoxValue(e.target.value);
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDkppVy9-h9bOb1DFPgPqmL1L8O-gmselo",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <StandaloneSearchBox
        onLoad={onSearchBoxLoad}
        onPlacesChanged={onPlacesChanged}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            type="text"
            placeholder="Busca la ubicación que desees"
            value={searchBoxValue}
            onChange={handleSearchBoxChange}
            prefix={<SearchOutlined />}
            style={{marginBottom:"10px", width:"2c  0vw"}}
          />
        </Space>
      </StandaloneSearchBox>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "60vh", // Ajusta la altura según tus necesidades
        }}
        zoom={14}
        center={mapCenter}
        onClick={onMapClick}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Mapita;
