import { Formik, Field, Form, ErrorMessage } from "formik";
import { Card, TextField, Typography, Stack, Button } from "@mui/material";

import * as yup from "yup";
import {
  initialValuesSignup,
  initialValuesLogin,
} from "../../schema/formInitialValueSchema";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signupUser, loginUser } from "redux/slices/authSlice";

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
  const { isLoading, error } = useSelector((state) => state.auth);
  const handleFormSubmit = async (values) => {
    type.toLowerCase() === "signup"
      ? await dispatch(signupUser(values))
      : await dispatch(loginUser(values));
  };

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
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Stack>
              {type.toLowerCase() === "signup" && (
                <TextField
                  required
                  id="name"
                  label="User Name"
                  onChange={handleChange}
                  helperText="Please enter your user name"
                  onBlur={handleBlur}
                  value={values.name}
                />
              )}
              <TextField
                required
                id="email"
                label="Email"
                helperText="Please enter your valid email"
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
              />
              <TextField
                required
                id="password"
                type="password"
                label="password"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText="Please enter your password"
              />
              {errors.name && <div id="feedback">{errors.name}</div>}
              <Button type="submit">
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
      {error && <div className="error">{error}</div>}
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
