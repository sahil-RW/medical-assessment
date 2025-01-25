import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AudioRecorder from "./pages/AudioRecorder";
import Transcription from "./pages/Transcription";
import Medical from "./pages/Medical";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Medical />} />
        <Route path="/transcription" element={<Transcription />} />
      </Routes>
    </Router>
  );
}

export default App;
