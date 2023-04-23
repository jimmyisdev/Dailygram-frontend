import {
  TextField,
  FormControl,
  Stack,
  FormControlLabel,
  Switch,
  Card,
  Button,
  Typography,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { initialValuesTask } from "schema/formInitialValueSchema";
import { createTask, updateTask } from "redux/slices/taskSlice";

export default function TaskForm({ actionType, data }) {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.task);
  const initialVals = () =>
    actionType === "update" ? data : initialValuesTask;

  async function handleFormSubmit(values, onSubmitProps) {
    if (actionType === "update") await dispatch(updateTask(values));
    else await dispatch(createTask(values));
    return onSubmitProps.resetForm();
  }

  return (
    <Card
      sx={{
        width: 400,
        padding: "1rem",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Task
      </Typography>
      <Formik
        initialValues={initialVals()}
        validationSchema={yup.object({
          name: yup.string().required("required"),
          description: yup.string().required("required"),
          isCompleted: yup.boolean(),
          level: yup.string().required("required"),
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
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  required
                  id="name"
                  label="New task"
                  onChange={handleChange}
                  helperText="Please enter your user name"
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.name ? <div>{errors.name}</div> : null}

                <TextField
                  required
                  id="description"
                  label="Description"
                  helperText="Please enter your description"
                  onBlur={handleBlur}
                  value={values.description}
                  onChange={handleChange}
                />
                <FormControl>
                  <RadioGroup
                    aria-labelledby="task-level"
                    value={values.level}
                    name="level"
                    row
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="unnecessary"
                      control={<Radio />}
                      label="Unnecessary"
                    />
                    <FormControlLabel
                      value="normal"
                      control={<Radio />}
                      label="Normal"
                    />
                    <FormControlLabel
                      value="emergent"
                      control={<Radio />}
                      label="Emergent"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControlLabel
                  label={values.isCompleted ? "Done" : "Not yet"}
                  name="isCompleted"
                  control={
                    <Switch
                      checked={values.isCompleted}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                />
                <Button type="submit" fullWidth>
                  {isLoading ? "Loading..." : "Submit"}
                </Button>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Card>
  );
}
