import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

const Sorah = () => {
  const [sorahText, setSorahText] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [currentAyah, setCurrentAyah] = useState(null); // Track the currently playing ayah
  const audioRefs = useRef([]); // Array of refs to control audio elements

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://quranapi.pages.dev/api/${id}.json`);
        setSorahText(res.data);
      } catch (error) {
        console.error('Error fetching Sorah data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handlePlayAyah = (index) => {
    // Stop all other audios
    audioRefs.current.forEach((audio, i) => {
      if (i !== index && audio) {
        audio.pause();
        audio.currentTime = 0; // Reset other audios
      }
    });

    // Play the selected ayah
    setCurrentAyah(index);
    audioRefs.current[index].play();
  };

  const handleStopAyah = (index) => {
    if (audioRefs.current[index]) {
      audioRefs.current[index].pause();
      setCurrentAyah(null); // Deselect the playing Ayah
    }
  };

  const handleAudioEnded = (index) => {
    // Automatically move to the next Ayah when the current one ends
    if (index < sorahText.arabic1.length - 1) {
      handlePlayAyah(index + 1); // Play the next Ayah
    }
  };

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
              <div key={index} className="sorah-item" style={{ marginBottom: '10px' }}>
                <p>{sorah}</p>

                {/* Start and Stop buttons */}
                <div style={{ marginBottom: '10px' }}>
                  <button
                    onClick={() => handlePlayAyah(index)}
                    style={{
                      padding: '5px 15px',
                      backgroundColor: '#1DB954',
                      border: 'none',
                      borderRadius: '5px',
                      color: '#fff',
                      cursor: 'pointer',
                      marginRight: '10px'
                    }}
                  >
                    Start Ayah {index + 1}
                  </button>

                  <button
                    onClick={() => handleStopAyah(index)}
                    style={{
                      padding: '5px 15px',
                      backgroundColor: '#DC3545',
                      border: 'none',
                      borderRadius: '5px',
                      color: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    Stop Ayah {index + 1}
                  </button>
                </div>

                {/* Audio element for each Ayah */}
                <audio
                  ref={(el) => (audioRefs.current[index] = el)} // Store refs in the array
                  controls
                  preload="none"
                  onEnded={() => handleAudioEnded(index)} // Trigger when audio ends
                  style={{ display: 'block', marginTop: '10px' }}
                >
                  <source
                    src={`https://quranaudio.pages.dev/1/${id}_${index + 1}.mp3`}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sorah;
