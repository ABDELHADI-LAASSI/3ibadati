import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

const Sorah = () => {
  const [sorahText, setSorahText] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [currentAyah, setCurrentAyah] = useState(null); // Track the currently playing ayah
  const audioRef = useRef(null); // Ref to control audio playback

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://quranapi.pages.dev/api/${id}.json`);
        setSorahText(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching Sorah data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAudioEnd = () => {
    // Move to the next ayah if it exists
    if (currentAyah !== null && currentAyah < sorahText.arabic1.length - 1) {
      setCurrentAyah((prevAyah) => prevAyah + 1);
    }
  };

  const handlePlayAyah = (index) => {
    setCurrentAyah(index);
  };

  useEffect(() => {
    // Automatically play the next ayah when currentAyah changes
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [currentAyah]);

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div className='sorah'>
      <div className="container">
        <div className="section">
          <h1 className='title'>{sorahText.surahNameArabicLong}</h1>

          <div className='sorah_content'>
            {sorahText.arabic1?.map((sorah, index) => (
              <div key={index} className="sorah-item">
                <p>{sorah}</p>
                
                {/* Play button for each Ayah */}
                <button onClick={() => handlePlayAyah(index)}>Play Ayah {index + 1}</button>

                {/* Only render audio for the currently selected ayah */}
                {index === currentAyah && (
                  <audio
                    ref={audioRef}
                    controls
                    preload="none"
                    onEnded={handleAudioEnd}
                    autoPlay
                  >
                    <source
                      src={`https://quranaudio.pages.dev/1/${id}_${index + 1}.mp3`}
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sorah;
