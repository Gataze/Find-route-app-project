export interface CurrentRoute {
  currentRoute: {
    start: string;
    stop: string;
    exactStartPlace: string;
    exactStopPlace: string;
    duration: number;
    distance: number;
  };
}

export interface RoutesHistory {
  startPlace: {
    title: string;
    id: string;
    position: { lat: number; lng: number };
  };
  stopPlace: {
    title: string;
    id: string;
    position: { lat: number; lng: number };
  };
  distance: number;
  duration: number;
  id: number;
  loaded: boolean;
}

export interface RoutesHistoryProps {
  dispatch: (a: any) => void;
  routesHistory: RoutesHistory[];
}

export interface SearchFormProps {
  places: { start: string; stop: string };
  setPlaces: (a: any) => void;
  getRoute: (a: any) => void;
}

export interface ContextType {
  currentRoute: {
    start: string;
    stop: string;
    exactStartPlace: string;
    exactStopPlace: string;
    duration: number;
    distance: number;
  };
  setCurrentRoute: (a: any) => void;
  dispatch: (a: any) => void;
  routesHistory: RoutesHistory[];
  getRoute: (a: any) => void;
}

export enum Action {
  Add,
  Delete,
}
