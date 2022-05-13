import { Action } from "../models/actionModel";
import { CurrentRoute } from "../models/contextModel";

export function reducer(
  searches: any,
  action: { type: Action; payload: CurrentRoute }
) {
  switch (action.type) {
    case Action.Add:
      return [...searches, newSearch(action.payload)];
    case Action.Delete:
      return searches.filter(
        (searchItem: any) => searchItem.id !== action.payload
      );
    default:
      return searches;
  }
}

function newSearch(route: CurrentRoute) {
  return { id: Date.now(), ...route, loaded: true };
}
