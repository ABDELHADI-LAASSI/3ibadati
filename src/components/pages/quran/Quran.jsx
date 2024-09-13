import React, { useEffect, useState } from 'react';
import './quran.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faCircleChevronLeft, faCircleChevronRight, faLeftLong } from '@fortawesome/free-solid-svg-icons';

const Quran = () => {
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setLoading(true);
    setIndex(prevIndex => (prevIndex < totalImages ? prevIndex + 1 : 1));
    setLoading(false);
    storeCurrentPage();
  };

  const handlePrevious = () => {
    setLoading(true);
    setIndex(prevIndex => (prevIndex > 1 ? prevIndex - 1 : totalImages));
    setLoading(false);
    storeCurrentPage();
  };

  const storeCurrentPage = () => {
    localStorage.setItem('currentPage', index);
  };

  useEffect(() => {
    const currentPage = localStorage.getItem('currentPage');
    if (currentPage) {
      setIndex(parseInt(currentPage) + 1 );
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }




  const totalImages = 604; 

  return (
    <div className='quran'>
      <div className="container">

        <div className="section">

            <h1 className='title'>صفحة القرآن</h1>

            <div className="quran_content">
                <FontAwesomeIcon icon={faCircleChevronLeft} onClick={handleNext} className='icon_quran' />
                <img 
                    src={`/assets/Quran/${index}.jpg`} 
                    alt={`Quran page ${index}`}
                />

                <FontAwesomeIcon icon={faCircleChevronRight} onClick={handlePrevious} className='icon_quran' />
            </div>

        </div>
      </div>
    </div>
  );
};

export default Quran;
