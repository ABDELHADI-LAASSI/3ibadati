import React, { useEffect, useState } from 'react';
import './quran.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Quran = () => {
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sorah, setSorah] = useState([]);

  const totalImages = 604; // Total number of Quran pages

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/assets/Json_data/quran_sorah_page.json');
      setSorah(res.data);
    } catch (error) {
      console.error('Error fetching sorah data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentPage = localStorage.getItem('currentPage');
    if (currentPage) {
      setIndex(parseInt(currentPage));
    }
    fetchData();
  }, []);

  const handleNext = () => {
    setLoading(true);
    setIndex(prevIndex => {
      const newIndex = prevIndex < totalImages ? prevIndex + 1 : 1;
      storeCurrentPage(newIndex);
      return newIndex;
    });
    setLoading(false);
  };

  const handlePrevious = () => {
    setLoading(true);
    setIndex(prevIndex => {
      const newIndex = prevIndex > 1 ? prevIndex - 1 : totalImages;
      storeCurrentPage(newIndex);
      return newIndex;
    });
    setLoading(false);
  };

  const handleSorahChange = (page) => {
    setLoading(true);
    setIndex(page);
    storeCurrentPage(page);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setLoading(true);
    const newIndex = Math.min(Math.max(parseInt(e.target.value), 1), totalImages);
    setIndex(newIndex);
    storeCurrentPage(newIndex);
    setLoading(false);
  };

  const storeCurrentPage = (pageIndex) => {
    localStorage.setItem('currentPage', pageIndex);
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className='quran'>
      <div className="container">
        <div className="section">
          <h1 className='title'>صفحة القرآن</h1>

          <div className="search">
            <input
              type="number"
              value={index}
              onChange={handleInputChange}
              min="1"
              max={totalImages}
            />

            {sorah.length > 0 && (
              <select onChange={(e) => handleSorahChange(parseInt(e.target.value))} value={index}>
                {sorah.map(s => (
                  <option key={s.page} value={s.start_page}>
                    {s.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="quran_content">
            <button className='button_quran_icon' disabled={loading} onClick={handlePrevious}>
              <FontAwesomeIcon icon={faCircleChevronLeft} className='icon_quran' />
            </button>
            <img
              src={`/assets/Quran/${index}.jpg`}
              alt={`Quran page ${index}`}
            />
            <button className='button_quran_icon' disabled={loading} onClick={handleNext}>
              <FontAwesomeIcon icon={faCircleChevronRight} className='icon_quran' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quran;
