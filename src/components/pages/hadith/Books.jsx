import React from 'react'
import "./hadith.css"
import { Link } from 'react-router-dom'

const Books = () => {
  return (
    <div className='hadith_book_page'>
        <div className="section">
            <div className="container">
                <div className="title">كتب الحديث</div>

                <div className="quran_content">
                    
                    <Link className='aya_container' to={`book/sahih-bukhari`} >
                        <p> صحيح البخاري </p>
                        <p> 7433 حديث   </p>
                    </Link>
                    <Link className='aya_container' to={`book/sahih-muslim`} >
                        <p> صحيح مسلم </p>
                        <p> 7561 حديث </p>
                    </Link>
                    <Link className='aya_container' to={`book/abu-dawood`} >
                        <p> سنن أبو داود </p>
                        <p>5274 حديث</p>
                    </Link>
                    <Link className='aya_container' to={`book/al-tirmidhi`} >
                        <p> سنن الترمذي </p>
                        <p>3956 حديث</p>
                    </Link>
                    <Link className='aya_container' to={`book/ibn-e-majah`} >
                        <p> سنن ابن ماجه </p>
                        <p>4341 حديث</p>
                    </Link>
                    <Link className='aya_container' to={`book/sunan-nasai`} >
                        <p> سنن النسائي  </p>
                        <p> 5761 حديث </p>
                    </Link>
                    {/* <Link className='aya_container' to={`book/musnad-ahmad`} >
                        <p> مسند أحمد بن حنبل </p>
                    </Link> */}

                </div>
            </div>
        </div>
    </div>
  )
}

export default Books