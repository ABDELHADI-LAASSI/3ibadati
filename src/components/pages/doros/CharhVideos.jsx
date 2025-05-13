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
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#f4f4f4', padding: '20px', overflowY: 'auto' }}>
        <h3>Liste des vidéos</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
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

      {/* Main content */}
      <div style={{ flexGrow: 1, padding: '20px', textAlign: 'center' }}>
        {currentVideo ? (
          <>
            <h2>{currentVideo.title}</h2>
            <iframe
              key={currentVideo.id}
              width="800"
              height="450"
              src={getAutoplayLink(currentVideo.link)}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Video Player"
            ></iframe>

            <div style={{ marginTop: '20px' }}>
              <button onClick={handlePrev} disabled={currentIndex === 0}>
                ◀ Précédent
              </button>
              <span style={{ margin: '0 15px' }}>
                {currentIndex + 1} / {videos.length}
              </span>
              <button onClick={handleNext} disabled={currentIndex === videos.length - 1}>
                Suivant ▶
              </button>
            </div>
          </>
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    </div>
  );
};

export default CharhVideos;
