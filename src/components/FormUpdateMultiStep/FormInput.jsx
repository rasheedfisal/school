import React from "react";

import GardianSearch from "./GardianSearch";
import FatherInfo from "./FatherInfo";
import MotherInfo from "./MotherInfo";
import GardianInfo from "./GardianInfo";
import { default as useFormContext } from "../../hooks/useUpdateFormContext";
import ManageStd from "./ManageStd";
import EmergencyInfo from "./EmergencyInfo";
import MartialStatus from "./MartialStatus";
import TermsAndConditions from "./TermsAndConditions";

const FormInput = () => {
  const { page } = useFormContext();

  const display = {
    0: <GardianSearch />,
    1: <TermsAndConditions />,
    2: <GardianInfo />,
    3: <EmergencyInfo />,
    4: <MartialStatus />,
    5: <FatherInfo />,
    6: <MotherInfo />,
    7: <ManageStd />,
  };

  const content = <div className="flex flex-col">{display[page]}</div>;

  return content;
};

export default FormInput;
