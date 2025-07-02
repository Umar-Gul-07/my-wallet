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

          {/* Protected Routes */}
          <Route path='/' element={<Base><Home/></Base>} />
          <Route path="/home" element={<Base><Home/></Base>} />
          <Route path="/wallets" element={<Base><Protected><Wallets /></Protected></Base>} />
          <Route path="/budgets" element={<Base><Protected><Budgets /></Protected></Base>} />
          <Route path="/people" element={<Base><Protected><People /></Protected></Base>} />
          <Route path="/settings" element={<Base><Protected><Settings /></Protected></Base>} />
          <Route path="/profiles" element={<Base><Protected><Profile /></Protected></Base>} />
          <Route path="/loans" element={<Base><Protected><Loans /></Protected></Base>} />

          <Route path='*' element={<PageNotFound404 />} />

        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
