import { Box } from "@mui/material";
import React from "react";

const LoaderFull = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "lightgray",
        overflowY: "auto",
        height: "100%",
        width: "100%",
        zIndex: "30",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <span className="loader"></span>
      </Box>
    </Box>
  );
};

export default LoaderFull;
