import React, { useEffect, useState } from 'react';
import './quran.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Quran = () => {
  const [loading, setLoading] = useState(false);
  const [sorah, setSorah] = useState([]);
  const [searchSorah, setSearchSorah] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://quranapi.pages.dev/api/surah.json');
        setSorah(res.data);
        setSearchSorah(res.data); // Default to show all sorahs
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (value) => {
    const searchValue = value.trim().toLowerCase();
    if (!searchValue) {
      setSearchSorah(sorah); // Show all when search is empty
    } else {
      const filteredSorah = sorah.filter((sorah) =>
        sorah.surahNameArabicLong.includes(searchValue) || sorah.surahName.toLowerCase().includes(searchValue)
      );
      setSearchSorah(filteredSorah);
    }

    console.log(searchSorah);
  };

  if (loading ) {
    return <div className='loading'>
      <FontAwesomeIcon className='spinner' icon={faSpinner} spin />
    </div>;
  }

  return (
    <div className='quran'>
      <div className="container">
        <div className="section">
          <h1 className='title'>صفحة القرآن الكريم</h1>

          <div className="search_by_sorah">
            <div className="input_search">
              <input
              className='search_input'
                type="text"
                placeholder="ابحث عن سورة..."
                onChange={(e) => handleSearch(e.target.value)}
              />
              <FontAwesomeIcon className='search_icon' icon={faSearch} />
            </div>
            <ul>
              {searchSorah.map((sorah, index) => (
                <li key={index}>
                  <Link className='link link_search' to={`/quran/${index + 1}`}>
                    {sorah.surahNameArabicLong} ({sorah.surahName})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="quran_content">
            {sorah.map((sorah, index) => (
              <Link className='aya_container' to={`/quran/${index + 1}`} key={index}>
                <div>
                  <p>{sorah.surahNameArabicLong}</p>
                </div>
                <p>{sorah.totalAyah}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quran;
