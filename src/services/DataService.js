import { createContext } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

export const DataContext = createContext(null);

export const DataService = ({ children }) => {
  const documentReference = useFirestore().collection("items");
  const items = useFirestoreCollectionData(documentReference);

  const data = { items };
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
