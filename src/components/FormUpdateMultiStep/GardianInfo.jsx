import React, { useState } from "react";
import { default as useFormContext } from "../../hooks/useUpdateFormContext";
import PhoneInput from "react-phone-number-input";
import { useTranslation } from "react-i18next";
import LeafMap from "../LeafMap";

const GardianInfo = () => {
  const { t } = useTranslation();
  const { data, handleChange, handleCustomElementChange } = useFormContext();
  const lat = data.g_location.split(",")[0];
  const lng = data.g_location.split(",")[1];
  const userLocation = [lat, lng];

  const [location, setLocation] = useState(userLocation);

  const content = (
    <div className="flex flex-col">
      <label htmlFor="g_title">
        {t("title")} <span className="text-red-600">*</span>
      </label>
      <select
        id="g_title"
        className="form-textbox"
        name="g_title"
        value={data.g_title}
        onChange={handleChange}
      >
        <option value="">{t("select")}</option>
        <option value="Mr">{t("mr")}</option>
        <option value="Mrs">{t("mrs")}</option>
        <option value="Ms">{t("ms")}</option>
      </select>

      <div className="flex items-center justify-between gap-5 flex-wrap">
        <div className="flex flex-col w-full">
          <label htmlFor="g_firstName">
            {t("1st_name")} <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className="form-textbox"
            id="g_firstName"
            name="g_firstName"
            pattern="([A-Z])[\w+.]{1,}"
            value={data.g_firstName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="g_secondName">
            {t("2nd_name")} <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className="form-textbox"
            id="g_secondName"
            name="g_secondName"
            pattern="([A-Z])[\w+.]{1,}"
            value={data.g_secondName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-5 flex-wrap">
        <div className="flex flex-col w-full">
          <label htmlFor="g_middleName">
            {t("3rd_name")} <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className="form-textbox"
            id="g_middleName"
            name="g_middleName"
            pattern="([A-Z])[\w+.]{1,}"
            value={data.g_middleName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="g_surname">
            {t("4th_name")} <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className="form-textbox"
            id="g_surname"
            name="g_surname"
            pattern="([A-Z])[\w+.]{1,}"
            value={data.g_surname}
            onChange={handleChange}
          />
        </div>
      </div>

      <label htmlFor="g_email">
        {t("email")} <span className="text-red-600">*</span>
      </label>
      <input
        type="email"
        className="form-textbox"
        id="g_email"
        name="g_email"
        value={data.g_email}
        onChange={handleChange}
      />

      <div className="flex items-center justify-between gap-5 flex-wrap">
        <div className="flex flex-col w-full">
          <label htmlFor="g_phone1">
            {t("phone1")} <span className="text-red-600">*</span>
          </label>
          <PhoneInput
            defaultCountry="SD"
            className="form-textbox"
            id="g_phone1"
            name="g_phone1"
            value={data.g_phone1}
            onChange={(e) => handleCustomElementChange(e, "g_phone1")}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="g_phone2">{t("phone2")}</label>
          <PhoneInput
            defaultCountry="SD"
            className="form-textbox"
            id="g_phone2"
            name="g_phone2"
            value={data.g_phone2}
            onChange={(e) => handleCustomElementChange(e, "g_phone2")}
          />
        </div>
      </div>

      <label htmlFor="g_address">
        {t("address")} <span className="text-red-600">*</span>
      </label>
      <input
        type="text"
        className="form-textbox"
        id="g_address"
        name="g_address"
        value={data.g_address}
        onChange={handleChange}
      />

      <label htmlFor="g_location">
        {t("location")} <span className="text-red-600">*</span>
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          className="form-textbox flex-1"
          id="g_location"
          name="g_location"
          disabled
          value={location}
          onChange={handleChange}
        />
        <LeafMap defaultLocation={userLocation} setLocation={setLocation} />
      </div>
    </div>
  );

  return content;
};

export default GardianInfo;
