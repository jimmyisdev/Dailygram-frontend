import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { getAllTasks } from "redux/slices/taskSlice";
import { queryString } from "utils/helper";

export default function TaskFilter() {
  const dispatchRequest = useDispatch();
  const [state, setState] = useReducer(
    (prevState, nextState) => ({ ...prevState, ...nextState }),
    {
      level: "",
      isCompleted: "",
    }
  );
  async function handelConfirmBtn() {
    let url = await queryString(state);
    dispatchRequest(getAllTasks(url));
  }

  return (
    <Stack spacing={{ xs: 1, sm: 2 }} direction="column">
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="level">Level</InputLabel>
        <Select
          labelId="level"
          id="level-select"
          value={state.level}
          label="level"
          onChange={(e) => setState({ level: e.target.value })}
          placeholder={state.level.toUpperCase()}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="emergent">Emergent</MenuItem>
          <MenuItem value="unnecessary">Unnecessary</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="isCompleted">Completed</InputLabel>
        <Select
          labelId="isCompleted"
          id="status-isCompleted"
          value={state.isCompleted}
          label="completed"
          onChange={(e) => setState({ isCompleted: e.target.value })}
          placeholder={state.isCompleted}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="true">True</MenuItem>
          <MenuItem value="false">False</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={handelConfirmBtn}>Confirm</Button>
    </Stack>
  );
}
