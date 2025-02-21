import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FindMyThing from "./pages/FindMyThing";
import Ride from "./pages/Ride";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import LostItems from "./components/LostItems";
import FoundItems from "./components/FoundItems";
import ReportLostItem from "./components/ReportLostItem";
import ReportFoundItem from "./components/ReportFoundItem";
import LostItemDetails from "./components/LostItemDetails";
import EditLostItem from "./components/EditLostItem";
import "bootstrap/dist/css/bootstrap.min.css";
import EditFoundItem from "./components/EditFoundItem";
import FoundItemDetails from "./components/FoundItemDetails";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PlacementPage from "./pages/PlacementPage";
import Profile from "./pages/Profile";
import Notes from "./components/Notes";
import LandingPage from "./pages/LandingPage";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

function App() {
  const token = localStorage.getItem("authToken");
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              token ? <Navigate to="/home" /> : <Navigate to="/landing" />
            }
          />
          {/* Public Routes */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/findMyThing" element={<FindMyThing />} />
            <Route path="/ride-sharing" element={<Ride />} />
            <Route path="/lost-items" element={<LostItems />} />
            <Route path="/found-items" element={<FoundItems />} />
            <Route path="/lostItem/:id" element={<LostItemDetails />} />
            <Route path="/editLostItem/:id" element={<EditLostItem />} />
            <Route path="/report-lost-item" element={<ReportLostItem />} />
            <Route path="/report-found-item" element={<ReportFoundItem />} />
            <Route path="/editFoundItem/:id" element={<EditFoundItem />} />
            <Route path="/foundItem/:id" element={<FoundItemDetails />} />
            <Route path="/placements" element={<PlacementPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notes" element={<Notes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
