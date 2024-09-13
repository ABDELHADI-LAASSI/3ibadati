import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Sorah = () => {
  const [sorahText, setSorahText] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

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
                <audio controls>
                  <source 
                    src={`https://quranaudio.pages.dev/1/2_1.mp3`} 
                    type="audio/mpeg" // Change to "audio/mpeg" if your files are MP3
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
