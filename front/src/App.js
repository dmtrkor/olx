
import 'react-toastify/dist/ReactToastify.css';

import {BrowserRouter} from "react-router-dom";
import MyRoutes from "./MyRoutes";
import {ToastContainer} from "react-toastify";

function App() {
  return (
      <>
          <BrowserRouter>
              <div className="out container-fluid">
                  <div className="inner">
                      <MyRoutes></MyRoutes>
                  </div>
              </div>
          </BrowserRouter>
          <ToastContainer />
      </>
  );
}

export default App;
