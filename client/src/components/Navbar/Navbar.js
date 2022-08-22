import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import { AppBar, Typography, Button, Toolbar, Avatar } from "@material-ui/core";
import useStyles from "./styles";
import decode from "jwt-decode"

function Navbar() {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("Profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // detect the change between routes
  console.log(user);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };
  // DEPENDS ON LOCATION USEeFFECT TRIGGERS TOC HECK TOKEN EXPIRATION //////
  useEffect(() => {
    const token = user?.token;
    //TOKEN EXPIRATION//
    if (token) {
      const decoded = decode(token);
      if (decoded.exp * 1000 < new Date().getTime()) logout();
    }
    // SET USER FROM LOCAL STORAGE
    setUser(JSON.parse(localStorage.getItem("Profile")));
  }, [location]);
  // the useEffect depends on location, when route changes from "/auth" to "/" using navigate
  //    after signing In. The login session last for an hour
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="45px"/>
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="Logo"
          height="40px"
        />
        </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.image}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
