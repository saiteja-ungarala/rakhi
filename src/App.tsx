
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateFlow from './pages/CreateFlow';
import WishReveal from './pages/WishReveal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreateFlow />} />
        <Route path="/wish/:name" element={<WishReveal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
