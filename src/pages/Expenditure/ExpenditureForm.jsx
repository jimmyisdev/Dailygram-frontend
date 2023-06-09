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
        width: 300,
        padding: "1rem",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        Add an expenditure
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
                onBlur={handleBlur}
                value={values.name}
              />
              <TextField
                id="description"
                label="Description"
                onBlur={handleBlur}
                value={values.description}
                onChange={handleChange}
              />
              <TextField
                required
                id="price"
                label="Price"
                onBlur={handleBlur}
                value={values.price}
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
