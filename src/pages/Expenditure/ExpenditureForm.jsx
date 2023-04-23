import { TextField, Stack, Card, Button, Typography } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { initialValuesExpenditure } from "schema/formInitialValueSchema";
import {
  createExpenditure,
  updateExpenditure,
} from "redux/slices/expenditureSlice";

export default function ExpenditureForm({ actionType, data }) {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.expenditure);
  const initialVals = () =>
    actionType === "update" ? data : initialValuesExpenditure;

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (actionType === "update") await dispatch(updateExpenditure(values));
    else await dispatch(createExpenditure(values));
    return onSubmitProps.resetForm();
  };

  return (
    <Card
      sx={{
        width: 400,
        padding: "1rem",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Expenditure
      </Typography>
      <Formik
        initialValues={initialVals()}
        validationSchema={yup.object({
          name: yup.string("Please input valid name").required("required"),
          price: yup.number("Please input valid number"),
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
                label="Item"
                onChange={handleChange}
                helperText="Please enter expenditure item"
                onBlur={handleBlur}
                value={values.name}
                error
              />
              <TextField
                id="description"
                label="Description"
                helperText="Please enter your description"
                onBlur={handleBlur}
                value={values.description}
                onChange={handleChange}
              />
              <TextField
                required
                id="price"
                label="Price"
                helperText="Please enter your price"
                onBlur={handleBlur}
                value={values.price}
                onChange={handleChange}
                error
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
