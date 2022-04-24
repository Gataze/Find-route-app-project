import H from "@here/maps-api-for-javascript";
import { useEffect } from "react";

export const useConfigMap = (
  platform: H.service.Platform,
  inputEl: React.MutableRefObject<HTMLDivElement>,
  startPosition: { lat: number; lng: number } | null
) => {
  useEffect(() => {
    const { lat, lng } = startPosition
      ? startPosition
      : { lat: 50.516, lng: 13.3779 };

    var defaultLayers = platform.createDefaultLayers();

    inputEl.current.innerHTML = "";

    // Step 2: initialize a map - this map is centered over Berlin
    let map = new H.Map(inputEl.current, defaultLayers.vector.normal.map, {
      center: { lat: 52.516, lng: 13.3779 },
      zoom: 13,
      pixelRatio: window.devicePixelRatio || 1,
      padding: { top: 50, left: 50, bottom: 50, right: 50 },
    });

    function calculateRouteFromAtoB(platform: H.service.Platform) {
      var router = platform.getRoutingService(undefined, 8),
        routeRequestParams = {
          routingMode: "fast",
          transportMode: "car",
          origin: `${lat},${lng}`, // Brandenburg Gate
          destination: "52.5206,13.3862", // Friedrichstraße Railway Station
          return:
            "polyline,turnByTurnActions,actions,instructions,travelSummary",
        };

      if (startPosition) {
        router.calculateRoute(routeRequestParams, onSuccess, onError);
      }
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
        map?.addObject(polyline);
        // And zoom to its bounding rectangle

        map?.getViewModel().setLookAtData({
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
      summaryDiv.style.position = "relative";
      summaryDiv.style.marginTop = "10%";
      summaryDiv.innerHTML = content;

      inputEl.current.appendChild(summaryDiv);
    }

    function toMMSS(duration: any) {
      return (
        Math.floor(duration / 60) + " minutes " + (duration % 60) + " seconds."
      );
    }

    calculateRouteFromAtoB(platform);
  }, [startPosition]);
};
