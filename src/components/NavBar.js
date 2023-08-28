import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useMediaQuery } from "react-responsive";
import { useTheme, styled } from "@mui/material/styles";

//prettier-ignore
import { AppBar, Toolbar, Typography, Box, Divider, List, ListItem, ListItemButton, ListItemText, IconButton, Button, Drawer } from "@mui/material";

// MUI Icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LanguageSetting from "./LanguageSetting";
import { useTranslation } from "react-i18next";
// import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

/***** STATIC STYLES *****/
const StyledTopToolBar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  justifyContent: "space-between",
}));

const StyledSiteTitle = styled(Typography)(({ theme }) => ({
  color: "white",
  fontFamily: "Roboto Mono",
  fontWeight: "700",
}));

const StyledTopNavButtons = styled(Button)({
  color: "#fff",
  fontFamily: "Montserrat",
  paddingLeft: "1rem",
  fontSize: "18px",
  fontWeight: 500,
  textTransform: "none",
  "&:hover": {
    color: "white",
    fontWeight: "bold",
  },
});

const topNavItems = [
  {
    text: "contact",
    icon: <EmailOutlinedIcon fontSize="small" />,
    path: "/connect#Contact",
  },
  {
    text: "calender",
    icon: <CalendarTodayIcon fontSize="small" />,
    url: "/pdfs/calendar-23-24.pdf",
  },
  {
    text: "employment",
    icon: <WorkOutlineIcon fontSize="small" />,
    path: "/connect#Employment",
  },
  // {
  //   text: "Facts",
  //   icon: <ExitToAppOutlinedIcon fontSize="small" />,
  //   path: "",
  //   url: "https://logins2.renweb.com/logins/ParentsWeb-Login.aspx",
  // },
];

const midNavItems = [
  "about",
  "admissions",
  "academics",
  "campus",
  "family",
  "connect",
];

const NavBar = (props) => {
  const { t } = useTranslation();
  const [transparent, setTransparent] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isCollapsed = useMediaQuery({ query: "(max-width: 900px)" });

  const theme = useTheme();

  /***** DYNAMIC STYLES *****/

  const StyledMidNavButtons = styled(Button)({
    height: "64px",
    fontFamily: "Montserrat",
    fontSize: "20px",
    fontWeight: 600,
    borderRadius: "0px",
    padding: "0px 10px",
    color: transparent ? "white" : "black",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#1565c0",
    },
  });

  const StyledPagesToolbar = styled(Toolbar)(({ theme }) => ({
    justifyContent: "center",
    backgroundColor: transparent
      ? "rgba(21, 101, 192, 0.9)"
      : theme.palette.grey[300],
  }));

  // Handles mobile drawer opening and closing
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handles bottom navbar changing to transparent on scroll down
  useEffect(() => {
    function scrollHandler() {
      if (window.scrollY >= 80) {
        setTransparent(true);
      } else {
        setTransparent(false);
      }
    }

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  // MUI Drawer component needs container to mount.. or something
  const container =
    props.window !== undefined ? () => props.window().document.body : undefined;

  return (
    <>
      {/***** TOP NAVBAR *****/}
      <AppBar
        component="nav"
        elevation={0}
        color="transparent"
        position={isCollapsed ? "fixed" : "relative"}
      >
        <StyledTopToolBar sx={{ py: { xs: 1, md: 2 } }}>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Toolbar>
              <Box
                component="img"
                sx={{
                  height: 50,
                }}
                alt="logo."
                src="/logo.png"
              />
              ...
              <StyledSiteTitle
                sx={{ fontSize: { xs: "1rem", md: "1.75rem", lg: "2rem" } }}
              >
                {t("site_name")}
              </StyledSiteTitle>
            </Toolbar>
          </NavLink>
          <Box
            sx={{
              color: "inherit",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <LanguageSetting />
            </Box>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" }, color: "white" }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              {topNavItems.map((item) => {
                const { icon, path, text, url } = item;
                return (
                  <StyledTopNavButtons
                    key={text}
                    component={url ? "a" : HashLink}
                    to={url ? null : path}
                    href={url ? url : null}
                  >
                    {icon} <span style={{ marginLeft: "7px" }}>{t(text)}</span>
                  </StyledTopNavButtons>
                );
              })}
            </Box>
          </Box>

          {/* <IconButton
            sx={{ fontSize: "1rem" }}
            onClick={muiUtils.toggleColorMode}
            color="inherit"
            disableTouchRipple
            disableRipple
          >
            {theme.palette.mode === "dark" ? (
              <span role="img" aria-label="sun">
                Light ☀️
              </span>
            ) : (
              <span role="img" aria-label="moon">
                Dark 🌚
              </span>
            )}
          </IconButton> */}
        </StyledTopToolBar>
      </AppBar>

      {/***** BOTTOM NAV BAR*****/}
      <AppBar
        component="nav"
        elevation={0}
        color="transparent"
        position={transparent ? "fixed" : "relative"}
      >
        <StyledPagesToolbar sx={{ display: { xs: "none", md: "flex" } }}>
          {midNavItems.map((item, index) => {
            return (
              <Box key={item}>
                <StyledMidNavButtons component={NavLink} to={`/${item}`}>
                  {t(item)}
                </StyledMidNavButtons>
              </Box>
            );
          })}
        </StyledPagesToolbar>
      </AppBar>

      {/***** MOBILE NAVBAR *****/}
      <Box component="nav" sx={{ left: "auto" }}>
        <Drawer
          anchor="top"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <Box
            onClick={handleDrawerToggle}
            sx={{ bgcolor: theme.palette.primary.main }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                py: 2,
              }}
            >
              <NavLink
                to="/"
                style={{ textDecoration: "none", paddingLeft: "1rem" }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}
                >
                  <Box
                    component="img"
                    sx={{
                      height: 50,
                    }}
                    alt="logo."
                    src="/logo.png"
                  />
                  <Typography
                    variant="h5"
                    color="white"
                    sx={{ fontFamily: "Roboto Mono", fontWeight: "bold" }}
                  >
                    {t("site_name")}
                  </Typography>
                </Box>
              </NavLink>
              <Box>
                <IconButton
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ display: { md: "none" }, color: "white", mr: 1 }}
                >
                  <CloseIcon fontSize="large" />
                </IconButton>
              </Box>
            </Box>
            <Divider sx={{ border: "0.5px solid white" }} />
            <List sx={{ px: 2 }}>
              {midNavItems.map((item) => (
                <div key={item}>
                  <ListItem component={NavLink} to={`/${item}`} disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary={t(item)}
                        primaryTypographyProps={{
                          fontSize: "16px",
                          color: "white",
                          fontFamily: "Montserrat",
                          fontWeight: "bold",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider sx={{ border: "1px solid white" }} />
                </div>
              ))}

              <Box sx={{ py: 1 }}></Box>
              {topNavItems.map((item) => {
                const { text, icon, path, url } = item;
                return (
                  <div key={text}>
                    <StyledTopNavButtons
                      component={url ? "a" : HashLink}
                      to={path}
                      href={url}
                      sx={{ mb: 1 }}
                      target={url ? "_blank" : "_self"}
                    >
                      {icon}{" "}
                      <span style={{ marginLeft: "7px" }}>{t(text)}</span>
                    </StyledTopNavButtons>
                  </div>
                );
              })}
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default NavBar;
