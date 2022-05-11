import H from "@here/maps-api-for-javascript";
import onResize from "simple-element-resize-detector";
import { useEffect, useRef, useState } from "react";
import { useRouteDetails } from "../../context/RouteDetailsProvider";
import { key } from "../../credentials/credentials";
import {
  addRouteShapeToMap,
  addSummaryToContext,
  toMMSS,
} from "../../utils/MapUtils";
import useFetch from "../../hooks/useFetch";

const Map: React.FC<any> = ({ data }) => {
  console.log("data from new Map", data);

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }} />
  );
};

const MapHoc = (MapComponent: any) => {
  // const { currentRoute } = useRouteDetails();

  // const startUrl = `https://geocode.search.hereapi.com/v1/geocode?apikey=${key}&q=szczecin`;
  // const stopUrl = `https://geocode.search.hereapi.com/v1/geocode?apikey=${key}&q=gorzów`;

  // const { data, error, isPending } = useFetch(startUrl, stopUrl);

  const [data, setData] = useState("Hello");

  // const data = 1;
  // console.log(data);
  // const { dispatch, setCurrentRoute } = useRouteDetails();
  // const refEl = useRef() as React.MutableRefObject<HTMLDivElement>;

  // useEffect(() => {
  //   const {
  //     items: [
  //       {
  //         address: { label: exactStartPlace },
  //         position: { lat: startLat, lng: startLng },
  //       },
  //     ],
  //   } = data ? data![0] : null;
  //   const {
  //     items: [
  //       {
  //         address: { label: exactStopPlace },
  //         position: { lat: stopLat, lng: stopLng },
  //       },
  //     ],
  //   } = data ?? data![1];

  //   const platform = new H.service.Platform({
  //     apikey: key,
  //   });

  //   let layers = platform.createDefaultLayers();
  //   let map = startLat
  //     ? new H.Map(refEl.current, layers.vector.normal.map, {
  //         pixelRatio: window.devicePixelRatio,
  //         padding: { top: 50, left: 50, bottom: 50, right: 50 },
  //       })
  //     : null;

  //   onResize(refEl.current, () => {
  //     map?.getViewPort().resize();
  //   });

  //   if (map) new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  //   function calculateRouteFromAtoB(platform: H.service.Platform) {
  //     var router = platform.getRoutingService(undefined, 8),
  //       routeRequestParams = {
  //         routingMode: "short",
  //         transportMode: "truck",
  //         origin: `${startLat},${startLng}`,
  //         destination: `${stopLat},${stopLng}`,
  //         return:
  //           "polyline,turnByTurnActions,actions,instructions,travelSummary",
  //       };

  //     router.calculateRoute(routeRequestParams, onSuccess, onError);
  //   }

  //   function onSuccess(result: any) {
  //     var route = result.routes[0];
  //     addRouteShapeToMap(route, map);
  //     addSummaryToContext(route, data, dispatch);
  //     route?.sections.forEach(
  //       (section: { travelSummary: { length: string; duration: string } }) => {
  //         setCurrentRoute((prevState: any) =>
  //           prevState
  //             ? {
  //                 ...prevState,
  //                 exactStartPlace,
  //                 exactStopPlace,
  //                 distance: +section.travelSummary.length / 1000,
  //                 duration: toMMSS(section.travelSummary.duration),
  //               }
  //             : prevState
  //         );
  //       }
  //     );
  //   }

  //   function onError(error: Error) {
  //     alert("Can't reach the remote server");
  //   }

  //   if (map) calculateRouteFromAtoB(platform);
  // }, [data, dispatch, setCurrentRoute]);

  return function EnhancedMap() {
    return <MapComponent data={data} />;
  };
};

export const EnhancedMap = MapHoc(Map);
