import { createContext, useState } from "react";

const FormContext = createContext({});

export const UpdateFormProvider = ({ children }) => {
  const title = {
    0: "enter_guardian_phone",
    1: "reenrollment_terms_and_conditions",
    2: "guardian_information",
    3: "emergency_information",
    4: "marital_status",
    5: "father_information",
    6: "mother_information",
    7: "sibling_registration",
  };

  const [page, setPage] = useState(0);

  const [data, setData] = useState({
    t_agreed: false,
    gphone_isFound: false,
    gphone_num: "",
    adm_id: "",
    f_id: "",
    f_firstName: "",
    f_secondName: "",
    f_middleName: "",
    f_surname: "",
    f_email: "",
    f_phone1: "",
    f_phone2: "",
    f_address: "",
    //////////////

    m_id: "",
    m_fullname: "",
    m_email: "",
    m_phone1: "",
    m_phone2: "",
    m_address: "",
    ///////////////

    g_id: "",
    g_title: "",
    g_firstName: "",
    g_secondName: "",
    g_middleName: "",
    g_surname: "",
    g_email: "",
    g_phone1: "",
    g_phone2: "",
    g_address: "",
    g_location: "",
    /////////////
    e_id: "",
    e_relation: "",
    e_contact: "",
    e_email: "",
    ////////////
    mr_id: "",
    mr_status: "",
    ////////////
    s_info: [],
  });

  const handleChange = (e) => {
    const type = e.target.type;

    const name = e.target.name;

    const value = type === "checkbox" ? e.target.checked : e.target.value;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCustomElementChange = (value, name) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { f_phone2, m_phone2, g_phone2, gphone_num, ...requiredInputs } = data;

  const canSubmit =
    [...Object.values(requiredInputs)].every(Boolean) &&
    page === Object.keys(title).length - 1;

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const canNextPage0 = Object.keys(data)
    .filter((key) => key.startsWith("gphone_"))
    .map((key) => data[key])
    .every(Boolean);

  const canNextPage00 = Object.keys(data)
    .filter((key) => key.startsWith("t_"))
    .map((key) => data[key])
    .every(Boolean);

  const canNextPage1 =
    Object.keys(data)
      .filter(
        (key) => key.startsWith("g_") && key !== "g_phone2" && key !== "g_id"
      )
      .map((key) => data[key])
      .every(Boolean) && isValidEmail(data.g_email);

  const canNextPage2 =
    Object.keys(data)
      .filter((key) => key.startsWith("e_") && key !== "e_id")
      .map((key) => data[key])
      .every(Boolean) && isValidEmail(data.e_email);

  const canNextPage3 = Object.keys(data)
    .filter((key) => key.startsWith("mr_") && key !== "mr_id")
    .map((key) => data[key])
    .every(Boolean);

  const canNextPage4 =
    Object.keys(data)
      .filter(
        (key) => key.startsWith("f_") && key !== "f_phone2" && key !== "f_id"
      )
      .map((key) => data[key])
      .every(Boolean) && isValidEmail(data.f_email);

  const canNextPage5 =
    Object.keys(data)
      .filter(
        (key) => key.startsWith("m_") && key !== "m_phone2" && key !== "m_id"
      )
      .map((key) => data[key])
      .every(Boolean) && isValidEmail(data.m_email);

  const canNextPage6 = Object.keys(data)
    .filter((key) => key.startsWith("std_"))
    .map((key) => data[key])
    .every(Boolean);

  const disablePrev = page === 0;

  const disableNext =
    page === Object.keys(title).length - 1 ||
    (page === 0 && !canNextPage0) ||
    (page === 1 && !canNextPage00) ||
    (page === 2 && !canNextPage1) ||
    (page === 3 && !canNextPage2) ||
    (page === 4 && !canNextPage3) ||
    (page === 5 && !canNextPage4) ||
    (page === 6 && !canNextPage5) ||
    (page === 7 && !canNextPage6);

  const prevHide = page === 0 && "hidden";

  const nextHide = page === Object.keys(title).length - 1 && "hidden";

  const submitHide = page !== Object.keys(title).length - 1 && "hidden";

  return (
    <FormContext.Provider
      value={{
        title,
        page,
        setPage,
        data,
        setData,
        canSubmit,
        handleChange,
        handleCustomElementChange,
        disablePrev,
        disableNext,
        prevHide,
        nextHide,
        submitHide,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
