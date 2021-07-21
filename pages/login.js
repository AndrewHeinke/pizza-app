import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import useUser from "../lib/useUser";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";

const validationSchema = yup.object({
  username: yup
    .string("Enter your username")
    .matches(/test/, {
      message: "Incorrect Username",
      excludeEmptyString: true,
    })
    .required("Username is required"),
  password: yup
    .string("Enter your password")
    .matches(/test/, {
      message: "Incorrect Password",
      excludeEmptyString: true,
    })
    .required("Password is required"),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
}));

function Login() {
  const classes = useStyles();
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;

      try {
        mutateUser(
          await axios("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: { password: password, username: username },
          })
        );
      } catch (error) {
        console.error("An unexpected error happened:", error);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom={true}>
          Log In
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                autoComplete="off"
                autoCapitalize="none"
                fullWidth
                variant="outlined"
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item>
              <TextField
                autoComplete="off"
                autoCapitalize="none"
                fullWidth
                variant="outlined"
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                size="large"
                className={classes.submit}
              >
                Log in
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
