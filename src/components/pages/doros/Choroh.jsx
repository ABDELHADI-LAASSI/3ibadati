import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { Link, useParams } from 'react-router-dom';

const Choroh = () => {
  const [choro7, setChoro7] = useState([]);
  const { darsId, kitabId } = useParams();

  useEffect(() => {

    console.log("helllo");
    
    const fetchDoros = async () => {
      const { data, error } = await supabase
        .from('choro7')
        .select('*')
        .eq('kitabId', kitabId);    // filtre sur columnX = 'some_value'

      if (error) {
        console.error('Error fetching videos:', error);
      } else {
        console.log(data);
        setChoro7(data);
      }
    };

    fetchDoros();
  }, []);

  return (
    <div className="loading">
      
      <ul>
        {choro7.map((char7) => (
            <Link className='aya_container' to={`/doros/${darsId}/kotob/${kitabId}/char7/${char7.id}`} >
                {char7.chari7} 
            </Link>
        ))}
      </ul>
    </div>
  );
};

export default Choroh;
