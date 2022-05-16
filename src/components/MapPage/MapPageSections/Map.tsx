import { useHereMapApi } from "../../../hooks/useHereMapApi";
import { FetchedDataProps } from "../../../models/fetchModel";

//Map component with useHereMapApi hook
export const Map: React.FC<FetchedDataProps> = ({ data }) => {
  const Component = useHereMapApi(data);

  return Component;
};
