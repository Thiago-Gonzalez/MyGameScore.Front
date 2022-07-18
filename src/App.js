import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer 
        autoClose={3000}
      />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
