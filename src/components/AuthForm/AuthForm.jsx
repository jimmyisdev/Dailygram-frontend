import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Card,
  TextField,
  Typography,
  Stack,
  Button,
  LinearProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import * as yup from "yup";
import {
  initialValuesSignup,
  initialValuesLogin,
} from "../../schema/formInitialValueSchema";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupUser, loginUser } from "redux/slices/authSlice";
import { useEffect, useState } from "react";

const signupValidator = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
const loginValidator = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const AuthForm = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const handleFormSubmit = async (values) => {
    type.toLowerCase() === "signup"
      ? await dispatch(signupUser(values))
      : await dispatch(loginUser(values)).then(() => {
          navigate("/", { replace: true });
        });
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false);
  };

  useEffect(() => {
    error && setShowSnackbar(true);
  }, [error]);

  return (
    <Card
      sx={{
        width: "350px",
        padding: "1rem",
        boxShadow: "0 5px 25px black",
      }}
    >
      <Typography variant="h3" gutterBottom>
        {type === "signup" ? "Signup" : "Log in"}
      </Typography>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={
          type === "signup" ? initialValuesSignup : initialValuesLogin
        }
        validationSchema={type === "signup" ? signupValidator : loginValidator}
      >
        {({ errors, isSubmitting, handleBlur, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Stack>
              {type.toLowerCase() === "signup" && (
                <>
                  <Field
                    required
                    id="name"
                    label="User Name"
                    component={TextField}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ marginBottom: ".25rem", marginTop: ".25rem" }}
                  />
                  <ErrorMessage component="span" name="name" />
                </>
              )}
              <Field
                required
                id="email"
                label="Email"
                component={TextField}
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{ marginBottom: ".25rem", marginTop: ".25rem" }}
              />
              <ErrorMessage component="span" name="email" />
              <Field
                required
                id="password"
                type="password"
                label="password"
                component={TextField}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ marginBottom: ".25rem", marginTop: ".25rem" }}
              />
              <ErrorMessage component="span" name="password" />
              {isSubmitting && <LinearProgress />}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
      {error && (
        <Snackbar
          autoHideDuration={3500}
          open={showSnackbar}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
      <Typography
        sx={{
          color: "black",
          fontWeight: 400,
        }}
      >
        {type === "signup" ? (
          <Link to="/login">Already a member</Link>
        ) : (
          <Link to="/signup">Join now</Link>
        )}
      </Typography>
    </Card>
  );
};

export default AuthForm;
