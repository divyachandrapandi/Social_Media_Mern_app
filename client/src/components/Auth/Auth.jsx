import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google"; //A google oAuth Login component for React
import jwt_decode from "jwt-decode";

import Input from "./Input";
// import Icon from "./Icon";
import useStyles from "./styles";
import { signin, signup } from "../../action/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  // ----------------------REACT HOOKS---------------------------///
  const classes = useStyles(); //STYLE FUNCTION CALLED
  const [isSignup, setIsSignup] = useState(false); // SIGNUP STATE
  const [showPassword, setShowPassword] = useState(false); // SHOW PASSWORD STATE
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ------------------SUBMIT FUNCTION, once signin/sinup button clicked-------------------------//
  const handleSubmit = (event) => {
    event.preventDefault();
    // on submit, two submit signin sign up -->
    // is signup
    if (isSignup) {
      // signup action and pass data, navigate if any change on route
      dispatch(signup(formData, navigate));
    }
    //  is signin
    else {
      dispatch(signin(formData, navigate));
    }
  };

  // ------------------ONCHANGE FUNCTION-------------------------//
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // ------------------To show password when icon clicked-------------------------//
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  // ------------------To switch isSignup and showPassword when option button clicked-------------------------//

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false); // passing argument to function without parameter if that value is defined before / boolean value
  };
  const googleSuccess = async (response) => {
    const token = response.credential; // raw string token id
    const decoded = jwt_decode(response.credential); // user objects with entire property like name, emaul ,id, picture
    const result = {
      name: decoded.name,
      image: decoded.picture,
      email: decoded.email,
      _id: decoded.sub,
    };
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/", { replace: true }); //redirect to homepage
    } catch (err) {
      console.log(err);
    }
  };

  const googleFailure = (error) => {
    console.log(error, "Google signin Unsuccessful, try again later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {/* SIGNUP CONDITION */}
        <Typography variant="h5">{isSignup ? "SignUp" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* SIGNUP CONDITION */}
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half={6}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half={6}
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {/* SIGNUP CONDITION */}
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          {/* SIGNUP CONDITION */}
          {/* this triggeres onSubmit attr of Form look above */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          {/* GoogleLogin Button */}
          <Grid container justifyContent="center">
            <Grid item>
              <GoogleLogin
                clientId="918968530454-jc3bkgume3oc27t6m7rj724tiak7up6f.apps.googleusercontent.com"
                onSuccess={(response) => googleSuccess(response)}
                onError={googleFailure}
                type="standard"
                theme="filled_blue"
                size="large"
                text="continue_with"
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="center">
            <Grid item>
              {/* SIGNUP CONDITION */}
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
