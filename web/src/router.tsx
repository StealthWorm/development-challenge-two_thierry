import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import HomeScreen from "./pages/HomeScreen";
import { PatientsScreen } from "./pages/PatientsScreen";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/patients" element={<PatientsScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;