import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { Link, useParams } from 'react-router-dom';

const DarsKotob = () => {
  const [darsKotob, setDarsKotob] = useState([]);
  const [darsName, setDarsName] = useState("")
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

  useEffect(() => {
    const fetchDoros = async () => {
      const { data, error } = await supabase
        .from('doros')
        .select('*')
        .eq('id', darsId);    // filtre sur columnX = 'some_value'

      if (error) {
        console.error('Error fetching videos:', error);
      } else {
        console.log(data[0].title);
        setDarsName(data[0].title);
      }
    };

    fetchDoros();
  }, []);

  return (
    // <div className="loading">

    //   <h1 className='title'> {darsName} </h1>
      
    //   <div>
    //     {darsKotob.map((kitab) => (
    //         <Link className='aya_container' to={`/doros/${darsId}/kotob/${kitab.id}`} >
    //             {kitab.title}
    //         </Link>
    //     ))}
    //   </div>
    // </div>
    <div className='doros_page'>
    
      <div className="section">

        <div className="container">

          <h1 className="title">كتب في  {darsName}</h1>
          <div className="quran_content">
            

        </div>

          <div className="kotob_content">
          {darsKotob.map((kitab) => (
            <Link className='kitab_container' to={`/doros/${darsId}/kotob/${kitab.id}`} >
                <p>{kitab.title}</p>
                <p> للشيخ : <span>{kitab.katib}</span> </p>
            </Link>
          ))}
          </div>

        </div>

      </div>

    </div>
  );
};

export default DarsKotob;
