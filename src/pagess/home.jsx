import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useContext } from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { UserContext } from "../context/UserContext";

export function Home() {
  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: -28.2624,
    lng: -52.396032,
  });

  const [markers, setMarkers] = useState([]);

  const { user } = useContext(UserContext);

  const containerStyle = {
    width: "100%",
    height: "80%",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds(mapCenter);
    map.fitBounds(bounds);

    setMap(map);
  };

  const handleMapClick = (event) => {
    const marker = {
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng(),
    };

    fetch("https://apibase2-0bttgosp.b4a.run/ws/foco", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
      body: JSON.stringify(marker),
    })
      .then((response) => response.json())
      .then(() => {
        console.log("Novo ponto cadastrado com sucesso!");
        setMarkers([
          ...markers,
          { lat: marker.latitude, lng: marker.longitude },
        ]);
      })
      .catch((error) => {
        alert("Erro ao cadastrar novo ponto");
      });
  };

  // Pega a localização atual do usuário
  useEffect(() => {
    console.log("Carregou o componente");
    const location = window.navigator && window.navigator.geolocation;

    const locationSucess = (position) => {
      console.log(position);
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
      console.log("Entrou no if");
      location.getCurrentPosition(locationSucess, locationError);
    }
  }, []);

  //carregar todos os marcadores do usuario da API
  useEffect(() => {
    fetch("https://apibase2-0bttgosp.b4a.run/ws/foco", {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${user}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const newMarkerArray = data.map(({ latitude, longitude }) => {
          return {
            lat: latitude,
            lng: longitude,
          };
        });

        setMarkers(newMarkerArray);
      })
      .catch((error) => {
        console.log(error);
        alert("Erro ao buscar pontos cadastrados");
      });
  }, []);

  return (
    <>
      <Header />

      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={10}
          onLoad={onLoad}
          onClick={handleMapClick}
          onUnmount={() => setMap(null)}
        >
          {markers.map((marker, key) => (
            <Marker key={key} position={marker} />
          ))}
        </GoogleMap>
      )}
    </>
  );
}
