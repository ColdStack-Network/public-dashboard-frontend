import { useLocation } from "react-router-dom";

export function useQuery() {
  const { search } = useLocation();

  const get = (param: string) => {
    const params = new URLSearchParams(search);
    try {
      return params.get(param);
    } catch (e) {
      return null;
    }
  };
  return { get };
}
