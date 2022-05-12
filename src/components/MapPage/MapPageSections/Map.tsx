import { useHereMapApi } from "../../../hooks/useHereMapApi";
import { FetchedDataProps } from "../../../models/fetchModel";

export const Map: React.FC<FetchedDataProps> = ({ data }) => {
  const Component = useHereMapApi(data);

  return Component;
};
