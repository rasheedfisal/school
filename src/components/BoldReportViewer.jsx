/* eslint-disable */
import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
// import "./App.css";
//Report Viewer source
import "@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min";
import "@boldreports/javascript-reporting-controls/Content/material/bold.reports.all.min.css";
//Data-Visualization
import "@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min";
// import "@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min";
//Reports react base
import "@boldreports/react-reporting-components/Scripts/bold.reports.react.min";

var viewerStyle = { height: "700px", width: "100%" };
const BoldReportViewer = ({ serviceURL, reportPath, paremeters }) => {
  const [pageLoad, setPageLoad] = useState(false);
  useEffect(() => {
    const onPageLoad = () => {
      //getComputedStyle(document.getElementById("reportviewer-container"), "");
      // setTimeout(() => setPageLoad(true), 6000);
      setPageLoad(true);
    };
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
    }
    return () => window.removeEventListener("load", onPageLoad);
  }, []);
  // const paremeters2 = [
  //   { name: "ReportParameter1", labels: ["test"], values: ["+20988776655"] },
  // ];
  return pageLoad ? (
    <LazyLoad>
      <div style={viewerStyle}>
        <BoldReportViewerComponent
          id="reportviewer-container"
          // reportServiceUrl={"http://localhost:5117/api/AdmissionViewer"}
          reportServiceUrl={serviceURL}
          // processingMode={"remote"}
          // reportPath={"~/Resources/Reports/school.rdl"}
          // reportPath="school.rdl"
          reportPath={reportPath}
          parameters={paremeters}
          // datasource={data}
        ></BoldReportViewerComponent>
      </div>
    </LazyLoad>
  ) : (
    <p>loading...</p>
  );
};

export default BoldReportViewer;
