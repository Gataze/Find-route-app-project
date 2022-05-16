import React from "react";
import Moment from "react-moment";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";
import { Action } from "../../../models/contextModel";
import {
  RoutesHistoryProps,
  RoutesHistory,
} from "../../../models/contextModel";

export const RouteHistory: React.FC<RoutesHistoryProps> = ({
  routesHistory,
  dispatch,
}) => {
  return (
    <div className="routeHistory">
      {routesHistory[0] && (
        <>
          <h2 className="routeHistory__header">Search history</h2>
          <ol className="routeHistory__list">
            {routesHistory.map((searchItem: RoutesHistory) => (
              <li className="routeHistory__listItem" key={searchItem.id}>
                <div className="routeHistory__listContent">
                  <Moment date={searchItem.id} fromNow />
                  <p className="routeHistory__paragraph">
                    {" "}
                    Route from: {searchItem.startPlace.title}{" "}
                  </p>
                  <p className="routeHistory__paragraph">
                    {" "}
                    To: {searchItem.stopPlace.title}{" "}
                  </p>
                </div>
                <button
                  className="routeHistory__button"
                  onClick={() =>
                    dispatch({ type: Action.Delete, payload: searchItem.id })
                  }
                >
                  <Icon
                    className="routeHistory__icon"
                    path={mdiTrashCanOutline}
                  />
                </button>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};
