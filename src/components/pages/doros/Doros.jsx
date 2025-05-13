import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { Link } from 'react-router-dom';

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
    <div className="loading">
      
      <ul>
        {doros.map((doro) => (
          <Link className='aya_container' to={`/doros/${doro.id}`} > {doro.title} </Link>
        ))}
      </ul>
    </div>
  );
};

export default Doros;
