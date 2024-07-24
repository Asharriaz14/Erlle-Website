import '../App.css';
import Navbar from '../components/Navbar';
import HomeSection from '../components/HomeSection';
import Pricing from '../components/Pricing';
import AudioPlayer from '../components/AudioPlayer';
import Timer from '../components/Timer';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageError from './PageError';

function Home() {
  const { musicId } = useParams();
  const [songData, setSongData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [guestId, setGuestId] = useState(null);

  useEffect(() => {
    const fetchUserSong = async () => {
      setIsLoading(true);
      try {
        const apiUrl = `/api/song-details?music_id=${musicId}`;
        const headers = new Headers();
        headers.append('Accept', 'application/json');

        const requestOptions = {
          method: 'POST',
          headers: headers,
          body: null,
        };

        const response = await fetch(apiUrl, requestOptions);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch song details: ${response.status} ${response.statusText}. Response: ${errorText}`);
        }

        const responseData = await response.json();

        if (responseData.result === "1" && responseData.status === "success") {
          setSongData(responseData.data[0]);
          setNotFound(false);
        } else {
          setSongData(null);
          setNotFound(true);
          console.error('Unexpected API response:', responseData);
        }
      } catch (error) {
        console.error('Error fetching song details:', error);
        setSongData(null);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserSong();
  }, [musicId]);

  useEffect(() => {
    if (!isLoading && songData && !guestId) {
      const generatedGuestId = `${Math.random().toString(36).substr(2, 6)}`;
      setGuestId(generatedGuestId);
      console.log('Generated Guest ID:', generatedGuestId);

    }
  }, [isLoading, songData, guestId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (notFound) {
    return <PageError />;
  }

  return (
    <>
      <Navbar />
      <HomeSection songData={songData} />
      <AudioPlayer songData={songData} />
      <Pricing songData={songData} musicId={musicId} guestId={guestId} />
      <Timer />
      <Footer />
    </>
  );
}

export default Home;
