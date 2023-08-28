import React, { useRef, useEffect } from "react";

import FormInput from "./FormInput";
import { default as useFormContext } from "../../hooks/useUpdateFormContext";
import { updateAdmissionFn } from "../../api/admApi";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import AnimatedPage from "../AnimatedPage";
// import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

const Form = () => {
  const divTop = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    page,
    setPage,
    data,
    title,
    canSubmit,
    disablePrev,
    disableNext,
    prevHide,
    nextHide,
    submitHide,
  } = useFormContext();

  useEffect(() => {
    // divTop.current.scrollTop += 10;
    divTop.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  const { isLoading, mutate: updateAdmission } = useMutation(
    (adm) => updateAdmissionFn(adm),
    {
      onSuccess: () => {
        toast.success(t("update_success"));

        const param = [
          {
            name: "ReportParameter1",
            labels: ["test"],
            values: [data.g_phone1],
          },
        ];
        navigate("/report/admission", { state: { param } });
        // setTimeout(() => navigate("/"), 6000);
      },
      onError: (error) => {
        console.log(error);
        if (error) {
          toast.error(error, {
            position: "top-right",
          });
        }
      },
    }
  );

  const handlePrev = () => setPage((prev) => prev - 1);

  const handleNext = () => setPage((prev) => prev + 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.s_info.length === 0) {
      toast.error(t("add_student"));
      return;
    }

    const formData = new FormData();

    for (let dataKey in data) {
      if (dataKey === "s_info") {
        // append nested object
        for (let previewKey in data[dataKey]) {
          for (var property in data[dataKey][previewKey]) {
            formData.append(
              `s_info[${previewKey}].${property}`,
              data[dataKey][previewKey][property]
            );
          }
        }
      } else {
        formData.append(dataKey, data[dataKey]);
      }
    }

    // Display the key/value pairs
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    updateAdmission(formData);
  };

  const content = (
    <AnimatedPage>
      <div className="section">
        <div ref={divTop} />
        <div className="md:flex items-center justify-center">
          <div className="w-full px-4 py-6 space-y-6 bg-white rounded-md dark:bg-darker">
            <form
              className="space-y-6"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <header className="form-header">
                <h2 className="text-xl font-semibold text-center mb-2">
                  {t(title[page])}
                </h2>

                <div className="flex justify-start">
                  <label className={`text-red-600 ${prevHide ? "hidden" : ""}`}>
                    {t("required")}
                  </label>
                </div>
              </header>

              <FormInput />

              <div className="flex flex-1 justify-end items-center flex-wrap">
                <div className="flex items-center justify-end gap-5">
                  <button
                    type="button"
                    className={`bg-transparent hover:bg-Teal text-Teal font-semibold hover:text-white  py-1 px-1 border border-Teal hover:border-transparent rounded disabled:opacity-25 ${prevHide}`}
                    onClick={handlePrev}
                    disabled={disablePrev}
                  >
                    {/* <AiOutlineLeft
                    className={`w-5 h-5 text-Teal hover:text-white cursor-pointer`}
                  /> */}
                    {t("prev")}
                  </button>

                  <p>
                    {t("page")} {page + 1} {t("of")} {Object.keys(title).length}
                  </p>

                  <button
                    type="button"
                    className={`bg-transparent hover:bg-Teal text-Teal font-semibold hover:text-white py-1 px-1 border border-Teal hover:border-transparent rounded disabled:opacity-25 ${nextHide}`}
                    onClick={handleNext}
                    disabled={disableNext}
                  >
                    {/* <AiOutlineRight
                    className={`w-5 h-5 text-Teal hover:text-white cursor-pointer`}
                  /> */}
                    {t("next")}
                  </button>

                  <button
                    type="submit"
                    // className={`bg-transparent hover:bg-Teal text-Teal font-semibold hover:text-white py-1 px-1 border border-Teal hover:border-transparent rounded cursor-pointer ${submitHide}`}
                    className={
                      isLoading
                        ? "bg-transparent flex justify-center items-center text-Teal hover:bg-Teal hover:text-white py-1 px-1  font-semibold text-center hover:border-transparent rounded transition-colors duration-200 cursor-pointer"
                        : `bg-transparent hover:bg-Teal text-Teal font-semibold hover:text-white py-1 px-1 border border-Teal hover:border-transparent rounded cursor-pointer ${submitHide}`
                    }
                    disabled={!canSubmit || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="w-6 h-6 mr-3 -ml-1 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <div className="font-bold">{t("submitting")}</div>
                      </>
                    ) : (
                      <>
                        <div className="font-bold">{t("submit")}</div>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );

  return content;
};

export default Form;
