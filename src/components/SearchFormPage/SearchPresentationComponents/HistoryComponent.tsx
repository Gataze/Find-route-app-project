import React from "react";
import Moment from "react-moment";
import { Action } from "../../../models/actionModel";

export const HistoryComponent: React.FC<any> = ({
  routesHistory,
  dispatch,
}) => {
  return (
    <div>
      {routesHistory[0] && (
        <ul>
          <h2>Search history</h2>
          {routesHistory.map((searchItem: any) => (
            <li key={searchItem.id}>
              <Moment date={searchItem.id} fromNow />
              <p> Route from: {searchItem.startPlace.title} </p>
              <p> To: {searchItem.stopPlace.title} </p>
              <button
                onClick={() =>
                  dispatch({ type: Action.Delete, payload: searchItem.id })
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
