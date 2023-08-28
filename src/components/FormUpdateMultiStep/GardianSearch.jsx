import React, { useState } from "react";
import SubmitButton from "../SubmitButton";
import { default as useFormContext } from "../../hooks/useUpdateFormContext";
import PhoneInput from "react-phone-number-input";
import { useQuery } from "@tanstack/react-query";
import { getAdmissionByPhone } from "../../api/admApi";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const GardianSearch = () => {
  const { t } = useTranslation();
  const { data, setData, handleCustomElementChange, handleChange, setPage } =
    useFormContext();
  const [enableQry, setEnableQry] = useState(false);
  const {
    isLoading,
    isFetching,
    data: admissions,
  } = useQuery(["admissions"], () => getAdmissionByPhone(data.gphone_num), {
    enabled: enableQry,
    select: (data) => data,
    retry: 1,
    onSuccess: (data) => {
      setEnableQry(false);
      setData((prevData) => ({
        ...prevData,
        ...data,
        ["gphone_isFound"]: true,
      }));
      // setData((prevData) => ({
      //   ...prevData,

      // }));
      // toast.info("Guardian found click next to continue.");
      setPage((prev) => prev + 1);
      // console.log(data);
    },
    onError: (error) => {
      setEnableQry(false);
      if (error.response) {
        // console.log(error.response)
        toast.error(error.response.data, {
          ["gphone_isFound"]: false,
          position: "top-right",
        });
      }
    },
  });
  return (
    <div className="flex flex-col justify-center items-center">
      {/* <div className="block"> */}
      <div className="flex flex-col w-full">
        <label htmlFor="gphone_num">
          {t("phone")} <span className="text-red-600">*</span>
        </label>

        <PhoneInput
          defaultCountry="SD"
          className="form-textbox mb-3"
          id="gphone_num"
          name="gphone_num"
          value={data.gphone_num}
          onChange={(e) => handleCustomElementChange(e, "gphone_num")}
        />

        <SubmitButton
          title={t("search")}
          clicked={isFetching}
          loadingTitle={t("searching")}
          icon={<AiOutlineSearch className="h-4 w-4" />}
          clickHandler={() => setEnableQry(true)}
        />
      </div>

      <div className="flex flex-col w-full">
        <input
          type="checkbox"
          id="gphone_isFound"
          name="gphone_isFound"
          className="hidden"
          checked={data.gphone_isFound}
          onChange={handleChange}
        />
      </div>
    </div>
    // </div>
  );
};

export default GardianSearch;
