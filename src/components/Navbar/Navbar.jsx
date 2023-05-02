import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Tooltip, List, Button, Box, ListItem } from "@mui/material";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import GroupIcon from "@mui/icons-material/Group";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PaidIcon from "@mui/icons-material/Paid";
import LogoutIcon from "@mui/icons-material/Logout";

import { setLogout } from "redux/slices/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  function handleLogout(){
    dispatch(setLogout())
    navigate("/login");
  }

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
            <Button onClick={handleLogout}>
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
                <NavLink
                  to="/"
                  style={({ isActive }) =>
                    isActive ? { color: "red" } : { color: "black" }
                  }
                >
                  <Tooltip title="Dashboard" arrow>
                    <SpaceDashboardIcon fontSize="large" />
                  </Tooltip>
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  to="/task"
                  style={({ isActive }) =>
                    isActive ? { color: "red" } : { color: "black" }
                  }
                >
                  <Tooltip title="Manage your task and classify" arrow>
                    <FormatListBulletedIcon fontSize="large" />
                  </Tooltip>
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  to="/expenditure"
                  style={({ isActive }) =>
                    isActive ? { color: "red" } : { color: "black" }
                  }
                >
                  <Tooltip title="Record all your expenditures" arrow>
                    <PaidIcon fontSize="large" />
                  </Tooltip>
                </NavLink>
              </ListItem>
              <ListItem>
                <Tooltip title="Take a brief note of your new friend" arrow>
                  <NavLink
                    to="/peopleMemo"
                    style={({ isActive }) =>
                      isActive ? { color: "red" } : { color: "black" }
                    }
                  >
                    <GroupIcon fontSize="large" />
                  </NavLink>
                </Tooltip>
              </ListItem>
            </List>
          )}
        </nav>
      </Box>
    </header>
  );
}
