import H from "@here/maps-api-for-javascript"
import onResize from 'simple-element-resize-detector';
import { useEffect, useRef, useState } from "react";



interface Coords {
  startCords: {
    lat: string,
    lng: string,
  } 
  stopCords: {
    lat: string,
    lng: string,
  } 
}


const Map: React.FC<Coords> = ({startCords, stopCords}) => {

    const refEl = useRef() as React.MutableRefObject<HTMLDivElement>;
    const [routeDets, setRouteDets] = useState({
      distance: "",
      duration: "",
    })
    

    useEffect(() => {
        
        const key = "iRlqOJYRE5_3AlvbQcOgZbRzQkr358KBNCDYYTFbTOE";
        // const H = import("@here/maps-api-for-javascript");
        const platform = new H.service.Platform({
            apikey: key,
        });
        let layers = platform.createDefaultLayers();

        let map = new H.Map(
          refEl.current,
          layers.vector.normal.map,
          {
            pixelRatio: window.devicePixelRatio,
            padding: { top: 50, left: 50, bottom: 50, right: 50 },
          },
        );
        onResize(refEl.current, () => {
          map.getViewPort().resize();
        });
        new H.mapevents.Behavior(new H.mapevents.MapEvents(map));      

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
    
            console.log(router)
    
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
          addSummaryToPanel(route)
        }
    
        function onError(error: Error) {
          alert("Can't reach the remote server");
        }


        //Summary panel
        function addSummaryToPanel(route: any) {
          route.sections.forEach((section: {travelSummary: {length: string, duration: string}}) => {
            setRouteDets({distance: section.travelSummary.length, duration: section.travelSummary.duration})
          })    
        }

        calculateRouteFromAtoB(platform)

          
    },[startCords, stopCords])

    function toMMSS(duration: any) {
      return (
        Math.floor(duration / 60) + " minutes " + (duration % 60) + " seconds."
      );
    }


  return (
    <>
      <div style={{ position: 'relative', width: '100%', height:'400px' }} ref={refEl}/>
      <h3>Route details</h3> 
      <b>Total distance: </b>
      <span>{+routeDets.distance / 1000} km</span>  
      <br />
      <b>Travel Time: </b>
      <span>{toMMSS(routeDets.duration)} (in current traffic)</span>
          
    </>
    
  )
}


export default Map