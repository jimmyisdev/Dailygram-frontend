import {
  TextField,
  Stack,
  Card,
  Button,
  Typography,
} from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { initialValuesPeopleMemo } from "schema/formInitialValueSchema";
import {
  createPeopleMemo,
  updatePeopleMemo,
} from "redux/slices/peopleMemoSlice";

export default function PeopleMemoForm({ actionType, data }) {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.peopleMemo);
  const initialVals = () =>
    actionType === "update" ? data : initialValuesPeopleMemo;

  async function handleFormSubmit(values, onSubmitProps) {
    if (actionType === "update") await dispatch(updatePeopleMemo(values));
    else await dispatch(createPeopleMemo(values));
    return onSubmitProps.resetForm();
  }

  return (
    <Card
      sx={{
        width: 300,
        padding: "1rem",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        Add a new friend
      </Typography>
      <Formik
        initialValues={initialVals()}
        validationSchema={yup.object({
          name: yup.string().required("required"),
          place: yup.string(),
          description: yup.string(),
          organization: yup.string(),
        })}
        onSubmit={handleFormSubmit}
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
            <Stack spacing={3}>
              <TextField
                required
                id="name"
                label="Friend Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <TextField
                id="place"
                label="Where did you meet?"
                onBlur={handleBlur}
                value={values.place}
                onChange={handleChange}
              />
              <TextField
                id="organization"
                label="Company/ School"
                onBlur={handleBlur}
                value={values.organization}
                onChange={handleChange}
              />
              <TextField
                id="description"
                label="Add some details..."
                onBlur={handleBlur}
                value={values.description}
                onChange={handleChange}
              />
              <Button type="submit" fullWidth>
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
