export interface CurrentRouteProps {
  currentRoute: {
    start: string;
    stop: string;
    exactStartPlace: string;
    exactStopPlace: string;
    duration: number;
    distance: number;
  };
}

export interface RoutesHistoryProps {
  dispatch: (a: any) => void;
  routesHistory: any[];
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
  routesHistory: any[];
  getRoute: (a: any) => void;
}
