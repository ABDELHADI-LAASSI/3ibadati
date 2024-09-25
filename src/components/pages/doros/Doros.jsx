import { faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Doros = () => {
  return (
    <div className="loading">
         هذه الصفحة لازالت قيد التطوير     <FontAwesomeIcon icon={faCode} style={{marginRight: '35px'}} />  
    </div>
  );
};

export default Doros;
