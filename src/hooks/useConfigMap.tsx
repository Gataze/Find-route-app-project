import H from "@here/maps-api-for-javascript";
import { useEffect, useRef } from "react";

//Configurtion file from Here-maps api documentation was used to create this custom hook. Some functions were added/changed in app developement process.
export const useConfigMap = (
  platform: H.service.Platform,
  inputEl: React.MutableRefObject<HTMLDivElement>,
  storedData: any[] | null
) => {
  const routeDetails: { current: { distance: number; duration: number } } =
    useRef({ distance: 0, duration: 0 });

  // Set previous data to ensure that same data will not rerender the map
  function usePrevious(value: any[] | null) {
    const ref: { current: any } = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const prevAmount = usePrevious(storedData);

  useEffect(() => {
    const placePositions = storedData
      ? [storedData![0].items[0].position, storedData![1].items[0].position]
      : [];

    const [startCords, stopCords] = placePositions ? placePositions : [];

    var defaultLayers = platform.createDefaultLayers();

    inputEl.current.innerHTML = "";

    if (inputEl.current.children[0]) {
      inputEl.current.removeChild(inputEl.current.children[0]);
    }

    let map =
      storedData && !inputEl.current.children[0]
        ? new H.Map(inputEl.current, defaultLayers.vector.normal.map, {
            pixelRatio: window.devicePixelRatio || 1,
            padding: { top: 50, left: 50, bottom: 50, right: 50 },
          })
        : null;

    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener("resize", () =>
      map ? map.getViewPort().resize() : {}
    );

    function calculateRouteFromAtoB(platform: H.service.Platform) {
      var router = platform.getRoutingService(undefined, 8),
        routeRequestParams = {
          routingMode: "fast",
          transportMode: "car",
          origin: `${startCords.lat},${startCords.lng}`,
          destination: `${stopCords.lat},${stopCords.lng}`,
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
          data: [],
          style: {
            lineWidth: 6,
            strokeColor: "rgba(0, 128, 255, 0.7)",
          },
        });
        // Add the polyline to the map
        map?.addObject(polyline);
        // And zoom to its bounding rectangle

        map!.getViewModel().setLookAtData({
          bounds: polyline.getBoundingBox(),
        });
      });
    }

    function onSuccess(result: any) {
      var route = result.routes[0];

      addRouteShapeToMap(route);
      addSummaryToPanel(route);
    }

    function onError(error: Error) {
      alert("Can't reach the remote server");
    }

    var behavior = map
      ? new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
      : null;

    function addSummaryToPanel(route: any) {
      let duration = 0,
        distance = 0;

      //tu długość trasy i czas
      route.sections.forEach((section: any) => {
        distance += section.travelSummary.length;
        duration += section.travelSummary.duration;
      });

      routeDetails.current = { distance, duration };

      var summaryDiv = document.createElement("div"),
        content =
          "<h3>Route details</h3> " +
          "<b>Total distance</b>: " +
          distance / 1000 +
          "km. <br />" +
          "<b>Travel Time</b>: " +
          toMMSS(duration) +
          " (in current traffic)";

      summaryDiv.style.fontSize = "medium";
      summaryDiv.style.marginLeft = "0%";
      summaryDiv.style.marginTop = "2%";
      summaryDiv.style.padding = "1%";
      summaryDiv.style.border = "2px solid black";
      summaryDiv.innerHTML += content;

      inputEl.current.appendChild(summaryDiv);

      console.log(inputEl.current.children[1]);

      if (inputEl.current.children.length > 2) {
        inputEl.current.removeChild(inputEl.current.children[1]);
      }
    }

    function toMMSS(duration: any) {
      return (
        Math.floor(duration / 60) + " minutes " + (duration % 60) + " seconds."
      );
    }

    if (storedData) {
      calculateRouteFromAtoB(platform);
    }
  }, [storedData, inputEl, platform, prevAmount]);
  return routeDetails;
};
