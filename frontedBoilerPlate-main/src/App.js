import ToastContainers from "./Utils/ToastContainer";
import PageNotFound404 from "./Errors/PageNotFound404";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from "./Pages/Base";
import './App.css';
import Home from "./Pages/Home";
import Wallets from "./Pages/Wallets";
import Budgets from "./Pages/Budgets";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";
import People from "./Pages/People";
import Loans from "./Pages/Loans";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import ChartInitializer from "./Utils/ChartInitializer";
import Protected from "./Security/Protected";
import { ThemeProvider } from "./Utils/useTheme";
import DebugBackend from "./Utils/DebugBackend";


function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>

        {/* ToastContainer */}
        <ToastContainers />

        {/* Chart Initializer */}
        <ChartInitializer />

        {/* Routes */}
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Registration />} />
          <Route path="/debug" element={<DebugBackend />} />

          {/* Protected Routes */}
          <Route path='/' element={<Protected><Base><Home/></Base></Protected>} />
          <Route path="/home" element={<Protected><Base><Home/></Base></Protected>} />
          <Route path="/wallets" element={<Protected><Base><Wallets /></Base></Protected>} />
          <Route path="/budgets" element={<Protected><Base><Budgets /></Base></Protected>} />
          <Route path="/people" element={<Protected><Base><People /></Base></Protected>} />
          <Route path="/settings" element={<Protected><Base><Settings /></Base></Protected>} />
          <Route path="/profiles" element={<Protected><Base><Profile /></Base></Protected>} />
          <Route path="/loans" element={<Protected><Base><Loans /></Base></Protected>} />

          <Route path='*' element={<Protected><PageNotFound404 /></Protected>} />

        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
