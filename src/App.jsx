import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AudioRecorder from './pages/AudioRecorder';
import Transcription from './pages/Transcription';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AudioRecorder />} />
        <Route path="/transcription" element={<Transcription />} />
      </Routes>
    </Router>
  );
}

export default App;