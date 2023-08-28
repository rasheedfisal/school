import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import "flag-icons/css/flag-icons.min.css";
import GlobeIcon from "../icons/GlobeIcon";
import i18next from "i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MUIWrapperContext } from "../MUIWrapper";

const languages = [
  {
    code: "en",
    name: "English",
    dir: "ltr",
    country_code: "gb",
  },
  {
    code: "ar",
    name: "العربية",
    dir: "rtl",
    country_code: "sa",
  },
];

const LanguageSetting = () => {
  const muiUtils = useContext(MUIWrapperContext);
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [menuDir, setMenuDir] = useState({ right: 0 });

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("app_title");
    setMenuDir(currentLanguage.dir === "rtl" ? { left: 0 } : { right: 0 });
  }, [currentLanguage, t]);

  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    borderRadius: "9999px",
    transitionProperty: "opacity",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "300ms",
    transitionDuration: "200ms",
    color: "white",
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    display: "block",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    color: "#6B7280",
    "&:hover": {
      color: "#374151",
      backgroundColor: "#F9FAFB",
    },
  }));

  return (
    <div className="relative">
      <StyledIconButton
        onClick={() => setOpen((prev) => !prev)}
        variant="outlined"
        aria-haspopup="true"
        aria-expanded={open ? "true" : "false"}
      >
        <GlobeIcon />
      </StyledIconButton>
      {/* <button
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        aria-haspopup="true"
        aria-expanded={open ? "true" : "false"}
        className="transition-opacity duration-200 rounded-full dark:opacity-75 dark:hover:opacity-100 focus:outline-none focus:ring dark:focus:opacity-100"
      >
        <span className="sr-only">User menu</span>
        <GlobeIcon />
      </button> */}
      <AnimatePresence>
        {open && (
          <motion.div
            key={0}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                ease: "easeOut",
                duration: 0.3,
              },
            }}
            exit={{
              opacity: 0,
              y: 20,
              transition: {
                ease: "easeIn",
                duration: 0.2,
              },
            }}
            style={{
              position: "absolute",
              top: "3rem",
              zIndex: 10,
              paddingTop: "0.25rem",
              paddingBottom: "0.25rem",
              borderRadius: "0.375rem",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              width: "12rem",
              backgroundColor: "#ffffff",
              ...menuDir,
            }}
            // className={`absolute ${menuDir} w-48 py-1 bg-white rounded-md shadow-lg top-12 ring-1 ring-black ring-opacity-5 dark:bg-dark focus:outline-none z-10`}
            tabIndex={-1}
            role="menu"
            aria-orientation="vertical"
            aria-label="User menu"
          >
            {languages.map(({ code, name, country_code, dir }) => (
              <StyledButton
                sx={
                  currentLanguageCode === code
                    ? {
                        cursor: "default",
                        pointerEvents: "none",
                        opacity: 0.25,
                      }
                    : {}
                }
                key={country_code}
                onClick={() => {
                  i18next.changeLanguage(code);
                  muiUtils.changeDirection(dir);
                  setOpen(false);
                }}
              >
                <span
                  className={`fi fi-${country_code}`}
                  style={{
                    opacity: currentLanguageCode === code ? 0.5 : 1,
                    marginLeft: "1rem",
                    marginRight: "1rem",
                  }}
                ></span>
                {name}
              </StyledButton>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSetting;
