import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { Link } from 'react-router-dom';
import './doros.css'

const Doros = () => {
  const [doros, setDoros] = useState([]);

  useEffect(() => {
    const fetchDoros = async () => {
      const { data, error } = await supabase
        .from('doros')
        .select('*');

      if (error) {
        console.error('Error fetching videos:', error);
      } else {
        console.log(data);
        setDoros(data);
      }
    };

    fetchDoros();
  }, []);

  return (
    <div className='doros_page'>

      <div className="section">

        <div className="container">

          <h1 className="title">الدروس</h1>
          <div className="quran_content">
            

        </div>

          <div className="quran_content">
            {doros.map((doro) => (
              <Link className='aya_container' to={`/doros/${doro.id}`} > {doro.title} </Link>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};

export default Doros;
