import { useTypedSelector } from "./useTypedSelector";

export const useItem = () => useTypedSelector((state) => state.item);
