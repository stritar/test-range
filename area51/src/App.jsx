import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Playground } from './playground/Playground';
import { Isolation } from './isolation/Isolation';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Playground />} />
        <Route path="/isolation" element={<Isolation />} />
      </Routes>
    </BrowserRouter>
  );
}
