import { Action } from "../models/actionModel";
import { FormEvent } from "react";

export function addRouteShapeToMap(route: any, map: any) {
  route.sections.forEach((section: any) => {
    // decode LineString from the flexible polyline
    let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

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
    map?.getViewModel().setLookAtData({
      bounds: polyline.getBoundingBox(),
    });
  });
}

//Summary panel
export function addSummaryToContext(route: any, data: any, dispatch: any) {
  route.sections.forEach(
    (section: { travelSummary: { length: string; duration: string } }) => {
      if (data) {
        dispatch({
          type: Action.Add,
          payload: {
            startPlace: data[0].items[0],
            stopPlace: data[1].items[0],
            distance: section.travelSummary.length,
            duration: section.travelSummary.duration,
          },
        });
      }
    }
  );
}

//Time converter from ... to ...
export function toMMSS(duration: any) {
  return (
    Math.floor(duration / 60) + " minutes " + (duration % 60) + " seconds."
  );
}

//Route cost calculator

export function calculateCosts(
  e: FormEvent,
  currentRoute: any,
  kmCostText: any
) {
  e.preventDefault();

  const kmCost = parseFloat(kmCostText.current.value);

  const daysOfWork =
    currentRoute.distance % 800 === 0
      ? currentRoute.distance / 800
      : Math.trunc(currentRoute.distance / 800) + 1;
  const cost =
    Math.round(
      (kmCost * currentRoute.distance * 1.1 + daysOfWork * 1000) * 100
    ) / 100;

  return { cost, daysOfWork };
}
