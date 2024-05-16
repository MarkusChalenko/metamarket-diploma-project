import { useTypedSelector } from "./useTypedSelector";

export const useCategory = () => useTypedSelector((state) => state.category);
