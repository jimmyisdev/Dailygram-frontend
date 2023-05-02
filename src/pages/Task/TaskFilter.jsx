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
      status: "",
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
        >
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="emergent">Emergent</MenuItem>
          <MenuItem value="unnecessary">Unnecessary</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="status">Status</InputLabel>
        <Select
          labelId="status"
          id="status-select"
          value={state.status}
          label="status"
          onChange={(e) => setState({ status: e.target.value })}
        >
          <MenuItem value={1}>Done</MenuItem>
          <MenuItem value={0}>Not yet</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={handelConfirmBtn}>Confirm</Button>
    </Stack>
  );
}
