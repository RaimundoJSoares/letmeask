import { BrowserRouter, Routes , Route } from 'react-router-dom' //versao 6.0 do react tem que usar routes em volta de route

import {Home} from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<Home/>} />
      <Route path="/rooms/new" element={<NewRoom/>} />
    </Routes>
    </BrowserRouter>
  );
}
export default App;
