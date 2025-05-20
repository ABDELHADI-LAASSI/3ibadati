import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { useParams } from 'react-router-dom';

const CharhVideos = () => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { char7Id } = useParams();

  useEffect(() => {
    const fetchDoros = async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('char7Id', char7Id);

      if (error) {
        console.error('Error fetching videos:', error);
      } else {
        setVideos(data);
      }
    };

    fetchDoros();
  }, [char7Id]);

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSelect = (index) => {
    setCurrentIndex(index);
  };

  const currentVideo = videos[currentIndex];

  const getAutoplayLink = (link) => {
    return link.includes('?') ? `${link}&autoplay=1` : `${link}?autoplay=1`;
  };

  return (
    <div className='char7_videos_page'>
        
      <div className="section">

        <div className="container">

          <h1 className="title"> المقطع رقم {videos && currentIndex + 1} : <span>{currentVideo && currentVideo.title} </span> </h1>
          
          <div className="videos_content">    

          <div>
            <ul>
              {videos.map((video, index) => (
                <li
                  key={video.id}
                  onClick={() => handleSelect(index)}
                  style={{
                    cursor: 'pointer',
                    marginBottom: '10px',
                    fontWeight: index === currentIndex ? 'bold' : 'normal',
                    color: index === currentIndex ? '#007bff' : '#000',
                  }}
                >
                  {video.title}
                </li>
              ))}
            </ul>
            
          </div>

          <div>
            {currentVideo ? (
              <>
                <iframe
                  key={currentVideo.id}
                  width="800"
                  height="450"
                  src={getAutoplayLink(currentVideo.link)}
                  frameBorder="0"
                  allowFullScreen
                  title="Video Player"
                ></iframe>
              </>
            ) : (
              <p>تحميل...</p>
            )}
            <div className='buttons_video'>
              <button onClick={handleNext} disabled={currentIndex === videos.length - 1}>
                التالي
              </button>
              <span style={{ margin: '0 15px' }}>
                {currentIndex + 1} / {videos.length}
              </span>
              <button onClick={handlePrev} disabled={currentIndex === 0}>
                 السابق
              </button>
            </div>
          </div>
          


          </div>


        </div>

      </div>

    </div>
  );
};

export default CharhVideos;
