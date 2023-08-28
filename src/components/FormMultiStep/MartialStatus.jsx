import React from "react";
import useFormContext from "../../hooks/useFormContext";
import { useTranslation } from "react-i18next";

const MartialStatus = () => {
  const { t } = useTranslation();
  const { data, handleChange, handleCustomElementChange } = useFormContext();

  const content = (
    <div className="flex flex-col">
      <label htmlFor="mr_status">
        {t("martial_status")} <span className="text-red-600">*</span>
      </label>
      <select
        id="mr_status"
        className="form-textbox"
        name="mr_status"
        value={data.mr_status}
        onChange={handleChange}
      >
        <option value="">{t("select")}</option>
        <option value="married">{t("married")}</option>
        <option value="divorced">{t("divorced")}</option>
        <option value="seperated">{t("seperated")}</option>
        <option value="widowed">{t("widowed")}</option>
        <option value="single_parent">{t("single_parent")}</option>
      </select>
    </div>
  );
  return content;
};

export default MartialStatus;
