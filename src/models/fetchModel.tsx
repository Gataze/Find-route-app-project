export interface FetchedData {
  items: [
    { address: { label: string }; position: { lat: number; lng: number } }
  ];
}

export interface FetchedDataProps {
  data: FetchedData[];
}

export interface ResponseObj {
  data: FetchedData[] | null;
  error: boolean;
  isPending: boolean;
}
