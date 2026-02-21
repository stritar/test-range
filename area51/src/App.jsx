import { Routes, Route } from 'react-router-dom';
import { ThumbEditor } from './app/ThumbEditor';
import { Playground } from './playground/Playground';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ThumbEditor />} />
      <Route path="/playground" element={<Playground />} />
    </Routes>
  );
}
