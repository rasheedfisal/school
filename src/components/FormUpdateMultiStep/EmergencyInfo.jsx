import React from "react";
import { default as useFormContext } from "../../hooks/useUpdateFormContext";
import PhoneInput from "react-phone-number-input";
import { useTranslation } from "react-i18next";
const EmergencyInfo = () => {
  const { t } = useTranslation();
  const { data, handleChange, handleCustomElementChange } = useFormContext();

  const content = (
    <div className="flex flex-col">
      <label htmlFor="e_relation">
        {t("relationship")} <span className="text-red-600">*</span>
      </label>
      <select
        id="e_relation"
        className="form-textbox"
        name="e_relation"
        value={data.e_relation}
        onChange={handleChange}
      >
        <option value="">{t("select")}</option>
        <option value="father">{t("father")}</option>
        <option value="mother">{t("mother")}</option>
        <option value="uncle">{t("uncle")}</option>
        <option value="aunt">{t("aunt")}</option>
        <option value="brother">{t("brother")}</option>
        <option value="sister">{t("sister")}</option>
        <option value="grandfather">{t("grandfather")}</option>
        <option value="grandmother">{t("grandmother")}</option>
      </select>

      <label htmlFor="e_contact">
        {t("phone")} <span className="text-red-600">*</span>
      </label>

      <PhoneInput
        defaultCountry="SD"
        className="form-textbox"
        id="e_contact"
        name="e_contact"
        required={true}
        value={data.e_contact}
        onChange={(e) => handleCustomElementChange(e, "e_contact")}
      />

      <label htmlFor="e_email">
        {t("email")} <span className="text-red-600">*</span>
      </label>
      <input
        type="email"
        className="form-textbox"
        id="e_email"
        name="e_email"
        value={data.e_email}
        onChange={handleChange}
      />
    </div>
  );

  return content;
};

export default EmergencyInfo;
