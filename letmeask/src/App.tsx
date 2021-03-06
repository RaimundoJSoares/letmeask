import { BrowserRouter, Routes , Route } from 'react-router-dom' //versao 6.0 do react tem que usar routes em volta de route
import {Home} from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import {AuthContextProvider} from './contexts/AuthContext'
import { Room } from './pages/Room';
import { AdminRoom } from './pages/adminRoom';

function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
     <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/rooms/new" element={<NewRoom/>} />
        <Route path="/rooms/:id" element={<Room/>} />
        <Route path="/admin/rooms/:id" element={<AdminRoom/>} />
      </Routes>
    </AuthContextProvider>
    </BrowserRouter>
  );
}
export default App;
