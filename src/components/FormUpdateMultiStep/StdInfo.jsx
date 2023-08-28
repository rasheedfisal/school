import React, { useState, useEffect } from "react";

import { default as useFormContext } from "../../hooks/useUpdateFormContext";
import FilePdfUploader from "../FilePdfUploader";
import { toast } from "react-toastify";
import moment from "moment/moment";
import CustomDatePicker from "../CustomDatePicker";
import PhoneInput from "react-phone-number-input";
import { useTranslation } from "react-i18next";

const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

const StdInfo = () => {
  const { t } = useTranslation();
  const { setData, data } = useFormContext();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [className, setClassName] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [img, setImg] = useState(null);
  const [birthCert, setBirthCert] = useState(null);
  const [passport, setPassport] = useState(null);
  const [docOne, setDocOne] = useState(null);
  const [docTwo, setDocTwo] = useState(null);
  const [lastAttendedSchool, setLastAttendedSchool] = useState("");
  const [lastAttendedSchoolPhone, setLastAttendedSchoolPhone] = useState("");
  const [lastAttendedSchoolEmail, setLastAttendedSchoolEmail] = useState("");

  useEffect(() => {
    const givenYear = moment(new Date(birthDate));
    const currentYear = moment(new Date("30/Sep/2023"));

    if (!isNaN(givenYear)) {
      const differ = currentYear.diff(givenYear);
      const diffDuration = moment.duration(differ);

      if (diffDuration.years() < 2) setClassName("");
      if (diffDuration.years() === 2 || differ === 0) {
        setClassName("Toddlers");
        /*setLastAttendedSchool("")
        setLastAttendedSchoolEmail("")
        setLastAttendedSchoolPhone("")
        setDocOne(null)
        setDocTwo(null) */
      }
      if (diffDuration.years() === 3) {
        setClassName("Nursery");
        /*setLastAttendedSchool("")
        setLastAttendedSchoolEmail("")
        setLastAttendedSchoolPhone("")
        setDocOne(null)
        setDocTwo(null)*/
      }
      if (diffDuration.years() === 4) setClassName("JKG");
      if (diffDuration.years() === 5) setClassName("SKG");
      if (diffDuration.years() === 6) setClassName("Grade 1");
      if (diffDuration.years() === 7) setClassName("Grade 2");
      if (diffDuration.years() === 8) setClassName("Grade 3");
      if (diffDuration.years() === 9) setClassName("Grade 4");
      if (diffDuration.years() === 10) setClassName("Grade 5");
      if (diffDuration.years() === 11) setClassName("Grade 6");
      if (diffDuration.years() === 12) setClassName("Grade 7");
      if (diffDuration.years() === 13) setClassName("Grade 8");
      if (diffDuration.years() === 14) setClassName("Grade 9");
      if (diffDuration.years() === 15) setClassName("Grade 10");
      if (diffDuration.years() === 16) setClassName("Grade 11");
      if (diffDuration.years() === 17) setClassName("Grade 12");
    }

    // console.log(birthDate)
  }, [birthDate]);

  const AddToStudentList = () => {
    if (name === "") {
      toast.error(t("req_name"));
      return;
    }
    if (birthDate === "") {
      toast.error(t("req_date_of_birth"));
      return;
    }
    if (className === "") {
      toast.error(t("req_class"));
      return;
    }
    if (gender === "") {
      toast.error(t("req_gender"));
      return;
    }
    if (religion === "") {
      toast.error(t("req_religion"));
      return;
    }
    /*if (img === null) {
      toast.error("photo is required.");
      return;
    }
    if (birthCert === null) {
      toast.error("birth certificate is required.");
      return;
    }
    if (passport === null) {
      toast.error("passport is required.");
      return;
    }
    if (docOne === null && className !== "Toddlers") {
      toast.error("Last report card is required.");
      return;
    }
    if (docTwo === null && className !== "Toddlers" && className !== "Nursery") {
      toast.error("second last report card is required.");
      return;
    }*/
    if (
      lastAttendedSchool === "" &&
      className !== "Toddlers" &&
      className !== "Nursery"
    ) {
      toast.error(t("req_last_attend_school"));
      return;
    }
    if (
      lastAttendedSchoolPhone === "" &&
      className !== "Toddlers" &&
      className !== "Nursery"
    ) {
      toast.error(t("req_last_attend_phone"));
      return;
    }
    if (
      lastAttendedSchoolEmail === "" &&
      className !== "Toddlers" &&
      className !== "Nursery"
    ) {
      toast.error(t("req_last_attend_email"));
      return;
    }
    if (
      !isValidEmail(lastAttendedSchoolEmail) &&
      className !== "Toddlers" &&
      className !== "Nursery"
    ) {
      toast.error(t("req_last_attend_email_valid"));
      return;
    }
    const std = {
      std_id: "new",
      name,
      birthDate,
      className,
      gender,
      religion,
      img,
      birthCrt: birthCert,
      passportCrt: passport,
      docOneCrt: docOne,
      docTwoCrt: docTwo,
      lastAttendedSchool: lastAttendedSchool,
      lastAttendedSchoolPhone: lastAttendedSchoolPhone,
      lastAttendedSchoolEmail: lastAttendedSchoolEmail,
    };

    setData((prevData) => ({
      ...prevData,
      s_info: [...data.s_info, { ...std }],
    }));

    console.log(data.s_info);

    setName("");
    setBirthDate(new Date());
    setClassName("");
    setGender("");
    setReligion("");
    setBirthCert(null);
    setImg(null);
    setPassport(null);
    setDocOne(null);
    setDocTwo(null);
    setLastAttendedSchool("");
    setLastAttendedSchoolPhone("");
    setLastAttendedSchoolEmail("");
  };

  const content = (
    <div className="flex flex-col">
      <label htmlFor="std_firstName">
        {t("1st_name")} <span className="text-red-600">*</span>
      </label>
      <input
        type="text"
        className="form-textbox"
        id="std_firstName"
        name="std_firstName"
        value={name}
        pattern="([A-Z])[\w+.]{1,}"
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="std_dateofbirth">
        {t("date_of_birth")} <span className="text-red-600">*</span>
      </label>
      <input
        type="date"
        className="form-textbox"
        id="std_dateofbirth"
        name="std_dateofbirth"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        onSelect={(e) => setBirthDate(e.target.value)}
      />
      {/* <CustomDatePicker setStartDate={setBirthDate} startDate={birthDate} /> */}

      <label htmlFor="std_class">
        {t("class")} <span className="text-red-600">*</span>
      </label>
      <input
        type="text"
        className="form-textbox"
        id="std_class"
        name="std_class"
        value={className}
        disabled
        onChange={(e) => setClassName(e.target.value)}
      />

      <label htmlFor="std_religion">
        {t("religion")} <span className="text-red-600">*</span>
      </label>
      <select
        id="std_religion"
        className="form-textbox"
        name="std_religion"
        value={religion}
        onChange={(e) => setReligion(e.target.value)}
      >
        <option value="">{t("select")}</option>
        <option value="muslim">{t("muslim")}</option>
        <option value="christian">{t("christian")}</option>
        <option value="other">{t("other")}</option>
      </select>

      <label htmlFor="std_gender">
        {t("gender")} <span className="text-red-600">*</span>
      </label>
      <select
        id="std_gender"
        className="form-textbox"
        name="std_gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">{t("select")}</option>
        <option value="male">{t("male")}</option>
        <option value="female">{t("female")}</option>
      </select>

      <label htmlFor="std_lastAttendedSchool">
        {t("last_attended_school")}{" "}
        {className !== "Toddlers" && <span className="text-red-600">*</span>}
      </label>
      <input
        type="text"
        disabled={className === "Toddlers"}
        className="form-textbox disabled:opacity-25"
        id="std_lastAttendedSchool"
        name="std_lastAttendedSchool"
        value={lastAttendedSchool}
        required={true}
        pattern="([A-Z])[\w+.]{1,}"
        onChange={(e) => setLastAttendedSchool(e.target.value)}
      />

      <label htmlFor="std_lastAttendedSchoolPhone">
        {t("last_attended_school_phone")}{" "}
        {className !== "Toddlers" && <span className="text-red-600">*</span>}
      </label>
      <PhoneInput
        disabled={className === "Toddlers"}
        defaultCountry="SD"
        className="form-textbox disabled:opacity-25"
        id="std_lastAttendedSchoolPhone"
        name="std_lastAttendedSchoolPhone"
        value={lastAttendedSchoolPhone}
        required={true}
        onChange={(e) => setLastAttendedSchoolPhone(e)}
      />
      <label htmlFor="std_lastAttendedSchoolEmail">
        {t("last_attended_school_email")}{" "}
        {className !== "Toddlers" && <span className="text-red-600">*</span>}
      </label>
      <input
        type="email"
        disabled={className === "Toddlers"}
        className="form-textbox disabled:opacity-25"
        id="std_lastAttendedSchoolEmail"
        name="std_lastAttendedSchoolEmail"
        value={lastAttendedSchoolEmail}
        required={true}
        pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/"
        onChange={(e) => setLastAttendedSchoolEmail(e.target.value)}
      />

      <label className="mt-5">{t("uploads")}</label>
      <hr />

      <div className="flex justify-center items-center gap-5 flex-wrap">
        <FilePdfUploader
          setFileElement={setImg}
          FileElement={img}
          acceptFiles="image/jpg, image/png, image/jpeg"
          defaultUrl=""
          label={t("photo")}
          required={false}
        />
        <FilePdfUploader
          setFileElement={setBirthCert}
          FileElement={birthCert}
          acceptFiles="*"
          defaultUrl=""
          label={t("birth_certificate")}
          required={false}
        />
        <FilePdfUploader
          setFileElement={setPassport}
          FileElement={passport}
          acceptFiles="*"
          defaultUrl=""
          label={t("passport")}
          required={false}
        />
        <FilePdfUploader
          setFileElement={setDocOne}
          FileElement={docOne}
          acceptFiles="*"
          defaultUrl=""
          label={t("last_report_card")}
          required={false} // required={className !== "Toddlers"}
        />
        <FilePdfUploader
          setFileElement={setDocTwo}
          FileElement={docTwo}
          acceptFiles="*"
          defaultUrl=""
          label={t("second_last_report_card")}
          required={false} //required={className !== "Toddlers" && className !== "Nursery"}
        />
      </div>
      <button
        type="button"
        onClick={AddToStudentList}
        className="bg-transparent mt-5 hover:bg-Teal text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded cursor-pointer"
      >
        {t("add")}
      </button>
    </div>
  );

  return content;
};

export default StdInfo;
