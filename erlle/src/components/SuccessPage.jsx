import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const SuccessPage = () => {
  const location = useLocation();
  const songData = location.state?.songData;
  const [randomString, setRandomString] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    const generateRandomString = (length) => {
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      return Array.from({ length }, () => charset.charAt(Math.floor(Math.random() * charset.length))).join('');
    };

    const generatedString = generateRandomString(15);
    setRandomString(generatedString);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(randomString).then(() => {
      setCopySuccess('Code copied to clipboard!');
    }).catch(() => {
      setCopySuccess('Failed to copy the code');
    });
  };

  if (!songData) {
    return <div>Error: No song data available</div>;
  }

  return (
    <>
      <Navbar />
      <div className='md:px-4 p-4 max-w-screen-2xl mx-auto md:mx-12 2xl:m-auto' id='home'>
        <div className='md:pt-4 px-4 pt-4'>
          <div className="text-center font-bold text-white text-2xl mb-5">
            You have successfully purchased this song!
          </div>
          <div className='flex flex-col md:flex-row justify-center items-center gap-10'>
            <div className='lg:h-[200px] w-[200px]'>
              <img src={songData.picture} alt="Banner Image" className='object-inherit h-full w-full rounded-lg' />
            </div>
            <div className="md:w-2/5">
              <h2 className='md:text-4xl text-4xl font-bold text-white mb-3 leading-relaxed'>{songData.name}</h2>
              <p className='text-[#757575] text-xl mb-2 font-medium'>{songData.artist}</p>
              <p className='text-[#757575] text-mb mb-2'>{songData.description}</p>
             
            </div>
          </div>
          <div className="text-tartiary text-xl font-semibold text-center mt-4">
            Please copy the code below and redeem it in your mobile app.
          </div>
          <div className="text-center mt-4">
            <button
              className="border px-20 text-white  py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={handleCopy}
            >
              Copy Code
            </button>
            {copySuccess && <p className="mt-2 text-green-500">{copySuccess}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SuccessPage;
