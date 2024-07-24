import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './components/Home';
import PageError from './components/PageError';
import SuccessPage from './components/SuccessPage'; 

function App() {
  const [musicId, setMusicId] = useState(null);

  useEffect(() => {
    const fetchMusicId = async () => {
      const id = await getMusicIdFromUrl();
      setMusicId(id);
    };

    fetchMusicId();
  }, []);

  if (musicId === null) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/music/${musicId}`} replace />} /> 
      <Route path="/music/:musicId" element={<Home />} />
      {/* <Route path="/music/:musicId" element={<Navigate to={`/randomString`} replace />} /> */}
      {/* <Route path="/randomString" element={<Home musicId={musicId} />} /> */}
      <Route path="/success" element={<SuccessPage musicId={musicId} />} />
      <Route path="*" element={<PageError />} />
    </Routes>
  );
}

const getMusicIdFromUrl = async () => {
  return "givenMusicId";
};

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
