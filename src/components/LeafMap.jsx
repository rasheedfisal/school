import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
  Popup,
} from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { MarkerIcon, SchoolMarkerIcon } from "../icons/MarkerIcon";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

import { useState, useEffect } from "react";
import { Globe2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";

const DefaultZoom = 8;

const schoolsLocation = [
  {
    name: "Cairo School of Management",
    address: "17B Obor Buildings, Salah Salem St",
    latlong: [30.036069973693323, 31.297988891601566],
  },
  {
    name: "Ahlan Arabic Centre",
    address: "7 Gamal Al Din Abou Al Mahasen",
    latlong: [30.001650967084316, 31.487503051757816],
  },
  {
    name: "Sakkara Language School Maadi",
    address: "X866+5C5",
    latlong: [29.92225486337381, 30.93063354492188],
  },
  {
    name: "Capital International Schools",
    address: "Area 17 KH",
    latlong: [30.02878884408324, 31.233100891113285],
  },
];

const LeafMap = ({ defaultLocation, setLocation }) => {
  const [selectedPosition, setSelectedPosition] = useState(defaultLocation);
  const [open, setOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setSelectedPosition([latitude, longitude]);
        setLocation([latitude, longitude]);
      });
    }
  }, [open]);

  useEffect(() => {
    if (open && isNotZero(selectedPosition)) {
      setShowMap(true);
    } else {
      setShowMap(false);
    }
  }, [selectedPosition]);

  const SearchBar = (props) => {
    const map = useMap(); // access to leaflet map
    const { provider } = props;

    useEffect(() => {
      const searchControl = new GeoSearchControl({
        provider,
        showMarker: true,
        autoClose: true,
      });

      map.addControl(searchControl); // this is how you add a control in vanilla leaflet
      return () => map.removeControl(searchControl);
    }, [props]);

    return null; // don't want anything to show up from this comp
  };

  const SchoolMarkers = () => {
    return schoolsLocation.map((loc, key) => {
      return (
        <Marker
          key={key}
          position={loc.latlong}
          // interactive={false}
          icon={SchoolMarkerIcon}
        >
          <Popup>{`${loc.name}, ${loc.address}`}</Popup>
        </Marker>
      );
    });
  };

  const Markers = () => {
    const map = useMapEvents({
      click(e) {
        setSelectedPosition([e.latlng.lat, e.latlng.lng]);
        setLocation([e.latlng.lat, e.latlng.lng]);
      },
    });

    return isNotZero(selectedPosition) ? (
      <Marker
        key={selectedPosition[0]}
        position={selectedPosition}
        // interactive={false}
        icon={MarkerIcon}
        draggable
        ondrag={handleMarkerDrag}
      />
    ) : null;
  };

  const handleMarkerDrag = (e) => {
    setSelectedPosition(e.latlng);
    setLocation(e.latlng);
  };

  const isNotZero = (obj) => {
    return obj[0] !== 0 && obj[1] !== 0;
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="transform hover:scale-110 text-blue-500 cursor-pointer self-center">
          <Globe2Icon className="h-7 w-7" />
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md overflow-y-scroll max-h-screen">
        <div className="pt-2 m-0">
          {showMap && (
            <MapContainer
              center={isNotZero(selectedPosition) ? selectedPosition : [0, 0]}
              // center={[19.61745, 37.21644]}
              zoom={DefaultZoom}
              style={{ height: "85vh" }}
            >
              {/* <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
              /> */}
              <TileLayer
                url={
                  "https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                }
                attribution="google maps"
              />
              <SearchBar provider={new OpenStreetMapProvider()} />
              <SchoolMarkers />
              <Markers />
            </MapContainer>
          )}
        </div>
        <DialogFooter>
          <button
            type="button"
            className={`bg-Teal text-white font-semibold py-1 px-1 border border-Teal rounded`}
            onClick={() => setOpen((prev) => !prev)}
          >
            {t("confirm")}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeafMap;
