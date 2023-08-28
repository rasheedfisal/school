import React from "react";
import { default as useFormContext } from "../../hooks/useUpdateFormContext";
import DeleteIcon from "../../icons/DeleteIcon";
import { useMutation } from "@tanstack/react-query";
import { deleteStdFn } from "../../api/admApi";
import { toast } from "react-toastify";
import moment from "moment";
import { useTranslation } from "react-i18next";
const StudentInfo = () => {
  const { t } = useTranslation();
  const { data, setData } = useFormContext();
  const { isLoading, mutate: deleteStd } = useMutation(
    (id) => deleteStdFn(id),
    {
      onSuccess: () => {},
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
  const handleDelete = (index, id) => {
    if (id !== "new") {
      deleteStd(id);
    }
    setData((prevData) => ({
      ...prevData,
      s_info: data.s_info.filter((item, idx) => idx !== index),
    }));
  };
  return (
    <>
      <div className="grid grid-cols-1 p-4">
        <div className="w-full px-4 py-6 space-y-6 bg-white rounded-md dark:bg-darker">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base">{t("student_list")}</h3>
              </div>
              {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <Link
                  to="/student/add"
                  className="bg-primary hover:bg-primary-dark text-white focus:outline-none focus:ring focus:ring-primary focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark text-xs font-bold uppercase px-3 py-1 rounded outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Add
                </Link>
              </div> */}
            </div>
          </div>
          <div className="block w-full relative overflow-x-auto">
            <div className="relative">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      {t("name")}
                    </th>
                    <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      {t("date_of_birth")}
                    </th>
                    <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      {t("class")}
                    </th>
                    <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      {t("gender")}
                    </th>
                    <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      {t("religion")}
                    </th>
                    <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      {t("last_attended_school")}
                    </th>
                    <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      {t("phone")}
                    </th>
                    <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      {t("email")}
                    </th>
                    <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.s_info?.map((std, i) => (
                    <tr key={i}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  ">
                        <div className="flex items-center text-sm">
                          {/* <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img
                              className="object-cover w-full h-full rounded-full"
                              src={std.img?.replace("\\", "/") ?? "noImg.jpg"}
                              alt="avatar"
                              loading="lazy"
                            />
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            ></div>
                          </div> */}
                          <div>
                            <p className="font-semibold">{std?.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {moment(std?.birthDate).format("d/MMM/yyyy")}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {std?.className}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {std?.gender}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {std?.religion}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {std?.lastAttendedSchool}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {std?.lastAttendedSchoolPhone}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {std?.lastAttendedSchoolEmail}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        <div className="flex">
                          <div
                            onClick={() => handleDelete(i, std.std_id)}
                            className="w-4 mr-2 mt-1 transform hover:text-red-700 hover:scale-110"
                          >
                            <DeleteIcon />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentInfo;
