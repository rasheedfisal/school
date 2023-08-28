import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import i18next from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    debug: false,
    // Options for language detector
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    interpolation: { escapeValue: false },
    // react: { useSuspense: false },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

const loadingMarkup = (
  <div
    style={{ paddingTop: "4rem", paddingBottom: "4rem", textAlign: "center" }}
  >
    <h3>Loading...</h3>
  </div>
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={loadingMarkup}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
