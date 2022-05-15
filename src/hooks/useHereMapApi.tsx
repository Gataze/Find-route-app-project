import H from "@here/maps-api-for-javascript";
import onResize from "simple-element-resize-detector";
import { useEffect, useRef } from "react";
import { useRouteDetails } from "../context/RouteDetailsProvider";

import {
  addRouteShapeToMap,
  addSummaryToContext,
  toMMSS,
} from "../utils/MapUtils";
import { FetchedData } from "../models/fetchModel";
import { CurrentRoute } from "../models/contextModel";

export const useHereMapApi = (data: FetchedData[]) => {
  const { dispatch, setCurrentRoute } = useRouteDetails();
  const refEl = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const {
      items: [
        {
          address: { label: exactStartPlace },
          position: { lat: startLat, lng: startLng },
        },
      ],
    } = data[0];
    const {
      items: [
        {
          address: { label: exactStopPlace },
          position: { lat: stopLat, lng: stopLng },
        },
      ],
    } = data[1];

    const platform = new H.service.Platform({
      apikey: process.env.REACT_APP_MY_API_KEY!,
    });

    let layers = platform.createDefaultLayers();
    let map = new H.Map(refEl.current, layers.vector.normal.map, {
      pixelRatio: window.devicePixelRatio,
      padding: { top: 50, left: 50, bottom: 50, right: 50 },
    });

    onResize(refEl.current, () => {
      map?.getViewPort().resize();
    });

    if (map) new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    function calculateRouteFromAtoB(platform: H.service.Platform) {
      var router = platform.getRoutingService(undefined, 8),
        routeRequestParams = {
          routingMode: "short",
          transportMode: "truck",
          origin: `${startLat},${startLng}`,
          destination: `${stopLat},${stopLng}`,
          return: "polyline,travelSummary",
        };

      router.calculateRoute(routeRequestParams, onSuccess, onError);
    }

    function onSuccess(result: any) {
      var route = result.routes[0];
      addRouteShapeToMap(route, map);
      addSummaryToContext(route, data, dispatch);
      route?.sections.forEach(
        (section: { travelSummary: { length: string; duration: string } }) => {
          setCurrentRoute!((prevState: CurrentRoute) =>
            prevState
              ? {
                  ...prevState,
                  exactStartPlace,
                  exactStopPlace,
                  distance: +section.travelSummary.length / 1000,
                  duration: toMMSS(+section.travelSummary.duration),
                }
              : prevState
          );
        }
      );
    }

    function onError(error: Error) {
      alert("Can't reach the remote server");
    }

    if (map) calculateRouteFromAtoB(platform);
  }, [data, dispatch, setCurrentRoute]);

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "480px",
        }}
        ref={refEl}
      />
    </>
  );
};
