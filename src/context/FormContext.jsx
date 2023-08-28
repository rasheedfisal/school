import { createContext, useState, useEffect } from "react";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const title = {
    0: "terms_and_conditions",
    1: "guardian_information",
    2: "emergency_information",
    3: "marital_status",
    4: "father_information",
    5: "mother_information",
    6: "student_information",
  };

  const [page, setPage] = useState(0);

  const [data, setData] = useState({
    t_agreed: false,
    sameAsFather: false,
    f_firstName: "",
    f_secondName: "",
    f_middleName: "",
    f_surname: "",
    f_email: "",
    f_phone1: "",
    f_phone2: "",
    f_address: "",
    //////////////

    sameAsMother: false,
    m_fullname: "",
    m_email: "",
    m_phone1: "",
    m_phone2: "",
    m_address: "",
    ///////////////

    g_title: "",
    g_firstName: "",
    g_secondName: "",
    g_middleName: "",
    g_surname: "",
    g_email: "",
    g_phone1: "",
    g_phone2: "",
    g_address: "",
    g_location: "15.500654,32.559898",
    /////////////
    e_relation: "",
    e_contact: "",
    e_email: "",
    ////////////
    mr_status: "",
    ////////////
    s_info: [],
  });

  useEffect(() => {
    if (data.sameAsFather) {
      setData((prevData) => ({
        ...prevData,
        sameAsMother: false,
        f_firstName: prevData.g_firstName,
        f_secondName: prevData.g_secondName,
        f_middleName: prevData.g_middleName,
        f_surname: prevData.g_surname,
        f_email: prevData.g_email,
        f_phone1: prevData.g_phone1,
        f_phone2: prevData.g_phone2,
        f_address: prevData.g_address,
      }));
    } else if (data.sameAsMother) {
      setData((prevData) => ({
        ...prevData,
        sameAsFather: false,
        m_fullname: `${prevData.g_firstName} ${prevData.g_secondName} ${prevData.g_middleName} ${prevData.g_surname}`,
        m_email: prevData.g_email,
        m_phone1: prevData.g_phone1,
        m_phone2: prevData.g_phone2,
        m_address: prevData.g_address,
      }));
    } else if (!data.sameAsFather) {
      setData((prevData) => ({
        ...prevData,
        f_firstName: "",
        f_secondName: "",
        f_middleName: "",
        f_surname: "",
        f_email: "",
        f_phone1: "",
        f_phone2: "",
        f_address: "",
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        m_fullname: "",
        m_email: "",
        m_phone1: "",
        m_phone2: "",
        m_address: "",
      }));
    }
  }, [data.sameAsMother, data.sameAsFather]);

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

  const {
    f_phone2,
    m_phone2,
    g_phone2,
    sameAsFather,
    sameAsMother,
    ...requiredInputs
  } = data;

  const canSubmit =
    [...Object.values(requiredInputs)].every(Boolean) &&
    page === Object.keys(title).length - 1;

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const canNextPage0 = Object.keys(data)
    .filter((key) => key.startsWith("t_"))
    .map((key) => data[key])
    .every(Boolean);

  // const canNextPage1 =
  //   Object.keys(data)
  //     .filter((key) => key.startsWith("g_") && key !== "g_phone2")
  //     .map((key) => data[key])
  //     .every(Boolean) === isValidEmail(data.g_email);
  const canNextPage1 =
    Object.keys(data)
      .filter((key) => key.startsWith("g_") && key !== "g_phone2")
      .map((key) => data[key])
      .every(Boolean) && isValidEmail(data.g_email);

  const canNextPage2 =
    Object.keys(data)
      .filter((key) => key.startsWith("e_"))
      .map((key) => data[key])
      .every(Boolean) && isValidEmail(data.e_email);

  const canNextPage3 = Object.keys(data)
    .filter((key) => key.startsWith("mr_"))
    .map((key) => data[key])
    .every(Boolean);

  const canNextPage4 =
    Object.keys(data)
      .filter((key) => key.startsWith("f_") && key !== "f_phone2")
      .map((key) => data[key])
      .every(Boolean) && isValidEmail(data.f_email);

  const canNextPage5 =
    Object.keys(data)
      .filter((key) => key.startsWith("m_") && key !== "m_phone2")
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
    (page === 1 && !canNextPage1) ||
    (page === 2 && !canNextPage2) ||
    (page === 3 && !canNextPage3) ||
    (page === 4 && !canNextPage4) ||
    (page === 5 && !canNextPage5) ||
    (page === 6 && !canNextPage6);

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
