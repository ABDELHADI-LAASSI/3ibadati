import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { Link, useParams } from 'react-router-dom';

const Choroh = () => {
  const [choro7, setChoro7] = useState([]);
  const [kitab, setKitab] = useState();
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
    const fetchkitab = async () => {
      const { data, error } = await supabase
        .from('kotob')
        .select('*')
        .eq('id', kitabId);    // filtre sur columnX = 'some_value'

      if (error) {
        console.error('Error fetching videos:', error);
      } else {
        setKitab(data[0].title);
        console.log(data);
      }
    };
    fetchkitab();
    fetchDoros();
  }, []);


  return (
    // <div className="loading">
      
    //   <ul>
    //     {choro7.map((char7) => (
    //         <Link className='aya_container' to={`/doros/${darsId}/kotob/${kitabId}/char7/${char7.id}`} >
    //             {char7.chari7} 
    //         </Link>
    //     ))}
    //   </ul>
    // </div>
    <div className='choro7_page'>
    
      <div className="section">

        <div className="container">

          <h1 className="title_char7">شروحات كتاب <span>{kitab}</span></h1>
          <div className="quran_content">
            

        </div>

          <div className="quran_content">
            {choro7 && choro7.map((char7) => (
              <Link className='aya_container' to={`/doros/${darsId}/kotob/${kitabId}/char7/${char7.id}`} >
                {char7.chari7} 
              </Link>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};

export default Choroh;

