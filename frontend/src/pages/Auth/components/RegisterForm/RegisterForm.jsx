import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useFormik } from "formik";
import { NavLink, Redirect } from "react-router-dom";
import * as yup from "yup";
import { GlassCard } from "../../../../common/GlassCard";
import { fetchUserRegister } from "../../../../redux/actions/user";
import SnackBar from "../../../../common/SnackBar";

const validationSchema = yup.object({
  firstName: yup
    .string("First name is required.")
    .min(1, "Name is too short.")
    .required("This field is required")
    .matches(
      /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/,
      "Type correct name."
    ),
  lastName: yup
    .string("Last name is required.")
    .required("This field is required.")
    .min(1, "Last name is too short.")
    .matches(
      /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/,
      "Type correct last name."
    ),
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

const SignUp = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [alert, setAlert] = useState(false);
  const [buttonState, setButton] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleAlert = () => {
    setAlert((state) => !state);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      sendEmails: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setButton(true);
      const res = await dispatch(fetchUserRegister(values));
      setButton(false);
      if (!res) {
        handleAlert();
      } else {
        setRedirect(true);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      {alert ? (
        <SnackBar
          text="This email is already taken."
          alert={alert}
          handleAlert={handleAlert}
          severity={"error"}
        ></SnackBar>
      ) : null}
      {redirect ? (
        <div>
          <Redirect to="/signin" />{" "}
        </div>
      ) : null}
      <GlassCard blur="15">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  value={formik.values.sendEmails}
                  control={
                    <Checkbox
                      checked={formik.values.sendEmails}
                      onChange={() =>
                        formik.setFieldValue(
                          "sendEmails",
                          !formik.values.sendEmails
                        )
                      }
                      color="primary"
                    />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              disabled={buttonState}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="center">
              <Grid item>
                <NavLink className={classes.navLink} to="/signin">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </GlassCard>
    </Container>
  );
};

export default SignUp;

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
    marginTop: theme.spacing(3),
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
