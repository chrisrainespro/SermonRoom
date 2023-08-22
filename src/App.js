import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Introduction from './Introduction';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Home/>} >
        <Route index element={<Introduction/>}  />

      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
