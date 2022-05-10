export interface ContextType {
    currentRoute: {start: string, stop: string, exactStartPlace: string, exactStopPlace: string, duration: number, distance: number},
    setCurrentRoute: (a: any) => void,
    dispatch: (a: any) => void,
    searches: any[] 
    updateMapDetails: (
      a: any
    ) => void;
  }