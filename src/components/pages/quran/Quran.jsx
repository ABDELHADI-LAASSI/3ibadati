import React, { useEffect, useState } from 'react';
import './quran.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Quran = () => {
  const [loading, setLoading] = useState(false);
  const [sorah, setSorah] = useState([]);




  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://quranapi.pages.dev/api/surah.json')
        setSorah(res.data)
        console.log(res.data);
        
        setLoading(false)
      } catch (error) {
        console.log(error);
        
      }
    }

    fetchData()
  }, []);



  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div className='quran'>
      <div className="container">
        <div className="section">
          <h1 className='title'>صفحة القرآن الكريم</h1>
          

          <div className="quran_content">
                {
                  sorah && sorah.map((sorah , index) => (
                    <Link className='aya_container' to={`/quran/${index + 1}`} key={index}>
                      <div>
                        <p>{sorah.surahNameArabicLong}</p> 
                        {/* <FontAwesomeIcon icon={faCircleChevronRight} /> */}
                      </div>
                      <p>{sorah.totalAyah}</p>
                    </Link>
                  ))
                }
            </div>
        </div>
      </div>
    </div>
  );
};

export default Quran;
