import React, { useEffect, useState } from "react";
import BoldReportViewer from "../BoldReportViewer";
import { useLocation } from "react-router-dom";
import LazyLoad from "react-lazyload";

const AdmissionReport = () => {
  const [pageLoad, setPageLoad] = useState(false);
  const location = useLocation();
  let { param } = location.state;

  useEffect(() => {
    const onPageLoad = () => {
      setPageLoad(true);
      // setTimeout(() => setPageLoad(true), 6000);
    };
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
    }
    return () => window.removeEventListener("load", onPageLoad);
  }, []);

  return pageLoad ? (
    <LazyLoad>
      <BoldReportViewer
        //   serviceURL={"http://nvsapi.smartschool.sd/api/AdmissionViewer"}
        serviceURL="https://localhost:7153/api/AdmissionViewer"
        reportPath="school.rdl"
        paremeters={param}
      />
    </LazyLoad>
  ) : (
    <p>loading...</p>
  );
};

export default AdmissionReport;
