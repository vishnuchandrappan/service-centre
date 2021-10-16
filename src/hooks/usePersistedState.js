import { useEffect, useState } from "react";
import { getStoredItem, storeItem } from "../utils/helpers";

export const usePersistedState = (key, defaultValue) => {
  const [state, setState] = useState(getStoredItem(key, defaultValue));

  useEffect(() => {
    storeItem(key, state);
  }, [key, state]);

  return [state, setState];
};
