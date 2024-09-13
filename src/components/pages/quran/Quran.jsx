import React, { useEffect, useState } from 'react';
import './quran.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
// import data from "../../../../public/assets/Json_data/quran_sorah_page.json"
import axios from 'axios';

const Quran = () => {
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sorah , setSorah] = useState([])

  const totalImages = 604; // Total number of Quran pages

  const handleNext = () => {
    setLoading(true);
    setIndex(prevIndex => (prevIndex < totalImages ? prevIndex + 1 : 1));
    setLoading(false);
    storeCurrentPage(prevIndex + 1);
  };

  const handlePrevious = () => {
    setLoading(true);
    setIndex(prevIndex => (prevIndex > 1 ? prevIndex - 1 : totalImages));
    setLoading(false);
    storeCurrentPage(prevIndex - 1);
  };

  const handleSorahChange = (page) => {
      setIndex(page);
      storeCurrentPage(page);
  }

  const storeCurrentPage = (pageIndex) => {
    localStorage.setItem('currentPage', pageIndex);
  };

  useEffect(() => {
    const currentPage = localStorage.getItem('currentPage');
    if (currentPage) {
      setIndex(parseInt(currentPage));
    }
  }, []);

  useEffect( () => {
      const fetchData = async () => {
        try {
          const res = await axios.get('/assets/Json_data/quran_sorah_page.json');
          setSorah(res.data);
          
        } catch (error) {
          console.log(error);
          
        }
      }

      fetchData();
  } , []);


  if (loading) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e) => {
    const newIndex = Math.min(Math.max(parseInt(e.target.value), 1), totalImages);
    setIndex(newIndex);
    storeCurrentPage(newIndex);
  };

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

              {
                sorah && 
                <select name="" id="">
                  {
                    sorah.map( sorah => <option onClick={ () => handleSorahChange(sorah.start_page) } value={sorah.page}>{sorah.name}</option> )
                  }
                </select>
              }
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
