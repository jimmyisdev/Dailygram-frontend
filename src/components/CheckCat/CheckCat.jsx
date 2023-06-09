import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCat } from "redux/slices/dashboardSlice";
import styles from "./CheckCat.module.css";
import { useEffect } from "react";

export default function CheckCat() {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(getCat());
  }, [dispatch]);

  return (
    <Box className={styles.check_cat_section}>
      {isLoading && list.length === 0 && <LinearProgress />}
      <Button onClick={() => dispatch(getCat())} disabled={isLoading}>
        {isLoading ? "Loading" : "Pat!"}
      </Button>
      {!isLoading && list.length > 0 && (
        <div className={styles.cat_container}>
          <img src={list[0].url} alt="Cute cat pic" width="200px" />
        </div>
      )}
      {!isLoading && !!error && (
        <Typography>Sorry! Cat refused to show up @@</Typography>
      )}
    </Box>
  );
}
