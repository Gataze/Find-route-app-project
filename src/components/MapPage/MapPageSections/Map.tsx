import { useHereMapApi } from "../../../hooks/useHereMapApi";

export const Map: React.FC<any> = ({ data }) => {
  const Component = useHereMapApi(data);

  return Component;
};
