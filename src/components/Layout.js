/** @format */

import { Route, Routes } from "react-router-dom";
import Landing from "./Section/Landing";
import NotFound from "./NotFound";
import CodeEditor from "./CodeEditor";
import SignIn from "./Section/SignIn";
import SideDrawer from "./SideDrawer";
import SignUp from "./Section/SignUp";
import Profile from "./Section/Profile";
import PasswordReset from "./Section/PasswordReset";
import { UserAuthContextProvider } from "../Context/UserAuthContext";
import Dashboard from "./Section/DashBoard";
import Upload from "./Section/Upload";
import About from "./Section/About";
import ProtectedRoute from "./ProtectedRoute";
import { Container } from "@mui/system";

const drawerWidth = 240;

function Layout() {
  return (
    <UserAuthContextProvider>
      <SideDrawer />
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          marginLeft: `${drawerWidth}px`,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Routes>
          {/* page not found */}
          <Route path="*" element={<NotFound />} />
          {/* page not found */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/editor" element={<CodeEditor />} />
        </Routes>
      </Container>
    </UserAuthContextProvider>
  );
}

export default Layout;
