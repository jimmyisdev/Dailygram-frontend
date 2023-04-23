import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip, List, Button, Box, ListItem } from "@mui/material";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import GroupIcon from "@mui/icons-material/Group";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PaidIcon from "@mui/icons-material/Paid";
import LogoutIcon from "@mui/icons-material/Logout";

import { setLogout } from "redux/slices/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  return (
    <header>
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {isAuth && (
          <Tooltip title="Logout" arrow>
            <Button onClick={() => dispatch(setLogout())}>
              <LogoutIcon fontSize="large" color="action" />
            </Button>
          </Tooltip>
        )}
        <nav>
          {isAuth && (
            <List
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <ListItem>
                <Link to="/">
                  <Tooltip title="Dashboard" arrow>
                    <SpaceDashboardIcon color="primary" fontSize="large" />
                  </Tooltip>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/task">
                  <Tooltip title="Manage your task and classify" arrow>
                    <FormatListBulletedIcon fontSize="large" />
                  </Tooltip>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/expenditure">
                  <Tooltip title="Record all your expenditures" arrow>
                    <PaidIcon fontSize="large" />
                  </Tooltip>
                </Link>
              </ListItem>
              <ListItem>
                <Tooltip title="Take a brief note of your new friend" arrow>
                  <Link to="/peopleMemo">
                    <GroupIcon fontSize="large" />
                  </Link>
                </Tooltip>
              </ListItem>
            </List>
          )}
        </nav>
      </Box>
    </header>
  );
}
