import { faBookOpenReader, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

const Sorah = () => {
  const [sorahText, setSorahText] = useState([]);
  const [sorah, setSorah] = useState([]);
  const [loadingSorah , setLoadingSorah] = useState(false)
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [currentAyah, setCurrentAyah] = useState(null);
  const audioRefs = useRef([]);

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

  useEffect(() => {
    const fetchData = async () => {
      setLoadingSorah(true);
      try {
        const res = await axios.get('https://quranapi.pages.dev/api/surah.json')
        setSorah(res.data)
        console.log(res.data);
        
        setLoadingSorah(false)
      } catch (error) {
        console.log(error);
        
      }
    }

    fetchData()
  }, []);

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
      if (audioRefs.current[index]) {
        audioRefs.current[index].play();
      }
  };

  const handleStopAyah = (index) => {
    if (audioRefs.current[index]) {
      audioRefs.current[index].pause();
      // audioRefs.current[index].currentTime = 0; // Reset the current audio
      setCurrentAyah(null);
    }
  };

  const handleAudioEnded = (index) => {
    // Automatically move to the next Ayah when the current one ends
    if (index < sorahText.arabic1.length - 1) {
      handlePlayAyah(index + 1); // Play the next Ayah
    }
  };

  if (loading || loadingSorah)  {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div className='sorah_page'>
      <div className="container">
        <div className="section">
          <h1 className='title'>{sorahText.surahNameArabicLong}</h1>

            <div className="surahInfos">
              <div className='sorah_content'>
                {sorahText.arabic1?.map((sorah, index) => (
                  <div key={index} className="sorah-item" style={{ marginBottom: '10px' }}>
                    

                    <div className="ayahinfo">
                      <h3>الاية رقم  {index + 1}</h3>
                      <p className='ayah' >{sorah}</p>
                    </div>

                    {/* Start and Stop buttons */}
                    <div className='btns' style={{ marginBottom: '10px' }}>
                      <button onClick={() => handlePlayAyah(index)} className='play' > <FontAwesomeIcon icon={faPlay} /> </button>

                      <button onClick={() => handleStopAyah(index)} className='pause' > <FontAwesomeIcon icon={faPause} /> </button>

                      <button className='tafsir' > <FontAwesomeIcon icon={faBookOpenReader} /> </button> {/* Functionality for Tafsir */}
                    </div>

                    {/* Hidden audio element for each Ayah */}
                    <audio
                      ref={(el) => (audioRefs.current[index] = el)} // Store refs in the array
                      preload="none"
                      onEnded={() => handleAudioEnded(index)} // Trigger when audio ends
                      style={{ display: 'none' }} // Hide the audio controls
                    >
                      <source
                        src={`https://quranaudio.pages.dev/1/${id}_${index + 1}.mp3`} // Make sure URL structure is correct
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ))}
            </div>
            <div className="suwar_sidebar_container">
              <div className='ayat'>
                  <h2>الآيات</h2>
                  {
                    sorahText.arabic1?.map((sorah, index) => {
                      return <p key={index} > {index +1 } </p>
                    })
                  }
              </div>
              <div className="suwar_sidebar">
                <h2>السور</h2>
                {
                  sorah?.map((sorah_item , index) => (
                    // <p key={index} > {sorah_item.surahNameArabic} </p>
                    <Link className='sorah' to={`/quran/${index + 1}`} key={index}>
                      {sorah_item.surahNameArabic}
                    </Link>
                  ))
                }
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sorah;
