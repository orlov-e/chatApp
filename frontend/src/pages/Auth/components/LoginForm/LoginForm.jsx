import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { GlassCard } from "../../../../common/GlassCard";
import * as yup from "yup";
import { useFormik } from "formik";
import { fetchUserLogin } from "../../../../redux/actions/user";
import { useDispatch } from "react-redux";
import SnackBar from "../../../../common/SnackBar";

const validationSchema = yup.object({
  email: yup
    .string("Email is required.")
    .email("Please enter a valid email address.")
    .required("This field is required."),
  password: yup
    .string("Password is required")
    .min(6, "Password must be at least 8 characters.")
    .matches(/[A-Za-z0-9]/, "Incorrect symbols.")
    .required("Password is required."),
});

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);
  const [buttonState, setButton] = useState(false);

  const handleAlert = () => {
    setAlert((state) => !state);
  };

  const handleButton = () => {
    setButton((state) => !state);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleButton();
      const res = await dispatch(fetchUserLogin(values));
      handleButton();
      if (!res) {
        handleAlert();
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      {alert ? (
        <SnackBar
          text="Wrong password or email."
          alert={alert}
          handleAlert={handleAlert}
          severity={"error"}
        ></SnackBar>
      ) : null}
      <GlassCard blur="15">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              value={formik.values.rememberMe}
              control={
                <Checkbox
                  checked={formik.values.rememberMe}
                  onChange={() =>
                    formik.setFieldValue(
                      "rememberMe",
                      !formik.values.rememberMe
                    )
                  }
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              disabled={buttonState}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify="center">
              <Grid item>
                <NavLink className={classes.navLink} to="/signup">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </GlassCard>
    </Container>
  );
};

export default SignIn;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  navLink: {
    color: "#002984",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
