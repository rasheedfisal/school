import { useContext } from "react";
import FormContext from "../context/FormUpdateContext";

const useUpdateFormContext = () => {
  return useContext(FormContext);
};

export default useUpdateFormContext;
