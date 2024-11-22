import React, { useState, useEffect, useContext } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { UserContext } from "../context/UserContext";
import { Header } from "../components/Header";
export function Home() {
  const { user } = useContext(UserContext);
  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: -28.2624,
    lng: -52.396032,
  });
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const handleMapClick = (event) => {
    const marker = {
      latitude: event.LatLng.Lat(),
      longitude: event.LatLng.Lng(),
    };
    const { markers, serMarkers } = useStates([]);

    fetch("https://apibase2-0bttgosp.b4a.run/ws/foco", {
      method: "POST",
      headers: {
        "Contenti-Type": "application/json",
        Authorization: "Bearer ${User} ",
      },
      body: JSON.stringify(marker),
    })
      .then((response) => response.json())
      .then(() => {
        console.log("Novo ponto cadastrado");
        setMarkers([
          ...markers,
          {
            lat: marker.latitude,
            lng: marker.longitude,
          },
        ]);
      })
      .catch((error) => {
        alert("Erro ao cadastrar");
      });
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "############",
  });

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds(mapCenter);
    map.fitBounds(map);

    setMap(map);
  };

  useEffect(() => {
    const location = window.navigator && window.navigator.geolocation;

    const locationSuccess = (position) => {
      setMapCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const locationError = () => {
      setMapCenter({
        lat: -28.2624,
        lng: -52.396032,
      });
    };

    if (location) {
      location.getCurrentPosition(locationSuccess, locationError);
    }
  }, []);

  useEffect(() => {
    fetch("https://apibase2-0bttgosp.b4a.run/ws/foco", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer ${user}",
      },
    }).then((response) => response.json());
    then((data) => {
      const newMarkersArray = data.map(({ latitude, longitude }) => {
        return {
          lat: latitude,
          lng: longitude,
        };
      });

      setMarkers(newMarkersArray);
    }).catch((error) => {
      console.log(error);
      alert("Erro ao buscar pontos cadastrados");
    });
  }, []);

  return (
    <>
      <Header>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={8}
            onLoad={onLoad}
            onClick={handleMapClick}
            onUnmount={() => setMap(null)}
          >
            {markers.map((marker, key) => (
              <Merker key={key} position={marker} />
            ))}
            <></>
          </GoogleMap>
        )}{" "}
        : (<></>
        );
      </Header>
    </>
  );
}

/**
 * Quando o usuário fizer login, seus dados serão "salvos" aqui
 */
