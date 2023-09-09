import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Pay from './component/Pay';
import Success from './component/Success';

function App() {
  return (
    <div className="App">
     <Routes>
          <Route path="/pay" element={<Pay/>} exact />
          <Route path="/succesful" element={<Success/>} exact />
        </Routes>
    </div>
  );
}

export default App;
