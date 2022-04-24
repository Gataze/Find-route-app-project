// import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import H from "@here/maps-api-for-javascript";
import { useEffect, useRef, useState } from "react";
// import onResize from "simple-element-resize-detector";

type NewProps = {
  lat: number;
  lng: number;
  onMapViewChange: (zoom: number, lat: number, lng: number) => void;
  zoom: Number;
};

export const UserForm: React.FC<NewProps> = (props) => {
  const key = "iRlqOJYRE5_3AlvbQcOgZbRzQkr358KBNCDYYTFbTOE";
  // const url = `https://geocode.search.hereapi.com/v1/geocode?apikey=${key}&q=5+Rue+Daunou%2C+75000+Paris%2C+France`;
  // const mapURL = `https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=${key}&c=52.431,13.3845`;

  const routeURL = `https://router.hereapi.com/v8/routes?apiKey=${key}&transportMode=car&origin=52.5308,13.3847&destination=52.5323,13.3789&return=polyline`;

  const polyline = useFetch(routeURL);
  console.log(polyline);

  const inputEl = useRef() as React.MutableRefObject<HTMLDivElement>;

  // const handleMapViewChange = (ev: any) => {
  //   const { onMapViewChange } = props;
  //   if (ev.newValue && ev.newValue.lookAt) {
  //     const lookAt = ev.newValue.lookAt;
  //     // adjust precision
  //     const lat = Math.trunc(lookAt.position.lat * 1e7) / 1e7;
  //     const lng = Math.trunc(lookAt.position.lng * 1e7) / 1e7;
  //     const zoom = Math.trunc(lookAt.zoom * 1e2) / 1e2;
  //     onMapViewChange(zoom, lat, lng);
  //   }
  // };

  //

  //Platform
  const platform = new H.service.Platform({
    apikey: key,
  });

  console.log(platform);

  useEffect(() => {
    // let map: any = null;
    // if (!map) {
    //   console.log("egge");
    const platform = new H.service.Platform({
      apikey: `${key}`,
    });

    //   const layers = platform.createDefaultLayers();

    //   map = new H.Map(inputEl.current!, layers.vector.normal.map, {
    //     pixelRatio: window.devicePixelRatio,
    //     center: { lat: 0, lng: 0 },
    //     zoom: 2,
    //   });

    //   onResize(inputEl.current, () => {
    //     map.getViewPort().resize();
    //   });
    // }
    // // attach the listener
    // map.addEventListener("mapviewchange", handleMapViewChange);
    // // add the interactive behaviour to the map
    // new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // let timeout;

    // const { lat, lng, zoom } = props;

    // if (map) {
    //   // prevent the unnecessary map updates by debouncing the
    //   // setZoom and setCenter calls
    //   clearTimeout(timeout);
    //   timeout = setTimeout(() => {
    //     map.setZoom(zoom);
    //     map.setCenter({ lat, lng });
    //   }, 1000);
    // }

    var defaultLayers = platform.createDefaultLayers();

    // Step 2: initialize a map - this map is centered over Berlin
    var map = new H.Map(inputEl.current, defaultLayers.vector.normal.map, {
      center: { lat: 52.516, lng: 13.3779 },
      zoom: 13,
      pixelRatio: window.devicePixelRatio || 1,
    });

    function calculateRouteFromAtoB(platform: H.service.Platform) {
      var router = platform.getRoutingService(undefined, 8),
        routeRequestParams = {
          routingMode: "fast",
          transportMode: "car",
          origin: "50.5160,13.3779", // Brandenburg Gate
          destination: "52.5206,13.3862", // Friedrichstraße Railway Station
          return:
            "polyline,turnByTurnActions,actions,instructions,travelSummary",
        };

      router.calculateRoute(routeRequestParams, onSuccess, onError);
    }

    function addRouteShapeToMap(route: any) {
      route.sections.forEach((section: any) => {
        // decode LineString from the flexible polyline
        let linestring = H.geo.LineString.fromFlexiblePolyline(
          section.polyline
        );

        // Create a polyline to display the route:
        let polyline = new H.map.Polyline(linestring, {
          style: {
            lineWidth: 6,
            strokeColor: "rgba(0, 128, 255, 0.7)",
          },
        });
        // Add the polyline to the map
        map.addObject(polyline);
        // And zoom to its bounding rectangle

        map.getViewModel().setLookAtData({
          bounds: polyline.getBoundingBox(),
        });
      });
    }

    function onSuccess(result: any) {
      var route = result.routes[0];

      addRouteShapeToMap(route);
      addSummaryToPanel(route);
      // addManueversToMap(route);
    }

    function onError(error: Error) {
      alert("Can't reach the remote server");
    }

    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    function addSummaryToPanel(route: any) {
      let duration = 0,
        distance = 0;

      route.sections.forEach((section: any) => {
        distance += section.travelSummary.length;
        duration += section.travelSummary.duration;
      });

      var summaryDiv = document.createElement("div"),
        content =
          "<b>Total distance</b>: " +
          distance +
          "m. <br />" +
          "<b>Travel Time</b>: " +
          toMMSS(duration) +
          " (in current traffic)";

      summaryDiv.style.fontSize = "small";
      summaryDiv.style.marginLeft = "5%";
      summaryDiv.style.marginRight = "5%";
      summaryDiv.innerHTML = content;
      inputEl.current.appendChild(summaryDiv);
    }

    function toMMSS(duration: any) {
      return (
        Math.floor(duration / 60) + " minutes " + (duration % 60) + " seconds."
      );
    }

    calculateRouteFromAtoB(platform);
  }, []);

  console.log(props);

  return (
    <div
      ref={inputEl}
      style={{ position: "relative", width: "100%", height: "500px" }}
    />

    // <div>
    //   <h2>Maps</h2>

    //   <form>
    //     <label>Miejsce początkowe:</label>
    //     <input type="text" />
    //     <label>Miejsce docelowe:</label>
    //     <input type="text" />
    //     {/* <img src={data.url} alt="ss" /> */}
    //   </form>

    //   <Link to="/routeDetails">Show route</Link>
    // </div>
  );
};
