import React, { useEffect, useState } from 'react';
import './quran.css';

const Quran = () => {
  const [index, setIndex] = useState(1);

  const handleNext = () => {
    setIndex(prevIndex => (prevIndex < totalImages ? prevIndex + 1 : 1));
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




  const totalImages = 604; // Change this number based on the total images you have

  return (
    <div className='quran'>
      <div className="container">

        <div className="section">

            <h1 className='title'>صفحة القرآن</h1>

            <div className="quran_content">
                <button onClick={handleNext}>Next</button>
                <img
                    src={`/assets/Quran/${index}.jpg`} // Image from public folder
                    alt={`Quran page ${index}`}
                />
            </div>

        </div>
      </div>
    </div>
  );
};

export default Quran;
