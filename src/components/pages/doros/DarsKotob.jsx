import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { Link, useParams } from 'react-router-dom';

const DarsKotob = () => {
  const [darsKotob, setDarsKotob] = useState([]);
  const { darsId } = useParams();

  useEffect(() => {
    const fetchDoros = async () => {
      const { data, error } = await supabase
        .from('kotob')
        .select('*')
        .eq('dars_Id', darsId);    // filtre sur columnX = 'some_value'

      if (error) {
        console.error('Error fetching videos:', error);
      } else {
        console.log(data);
        setDarsKotob(data);
      }
    };

    fetchDoros();
  }, []);

  return (
    <div className="loading">
      
      <ul>
        {darsKotob.map((kitab) => (
            <Link className='aya_container' to={`/doros/${darsId}/kotob/${kitab.id}`} >
                {kitab.title} 
                {kitab.title}
            </Link>
        ))}
      </ul>
    </div>
  );
};

export default DarsKotob;
