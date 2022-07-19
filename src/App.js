import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from "./contexts/auth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <ToastContainer 
        autoClose={3000}
      />
      <Routes />
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
