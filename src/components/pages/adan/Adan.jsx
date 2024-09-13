import React, { useEffect, useState } from 'react'
import "./adan.css"

const Adan = () => {

    const [city , setCity] = useState("فاس")
    const [time , setTime] = useState({})
    const [arabicDate , setArabicDate] = useState({})
    const [loading , setLoading] = useState(false)

    const handleChange = (e) => {
        setCity(e.target.value)
    }

    useEffect( () => {
        
        const fetchData = async () => {

            setLoading(true)
            try {
                const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Morocco&method=3`)
                const data = await res.json()
                
                if (data.data) {
                    setTime(data.data.timings)
                    setArabicDate(data.data.date.hijri)
                    setLoading(false)
                }
                
            } catch (error) {
                console.log(error);
            }
        }

        fetchData()

    } , [city])


    if (loading) {
        return (
            <div className="loading">
                <h1>Loading...</h1>
            </div>
        )
    }

  return (
    <div className="adan">
        <div className="container">

            <div className="section">

                <h1 className='title'>مواقيت الصلاة في مدينة  {city}</h1>

                {/* Display Arabic Date */}
                <div className="date">
                    <h5>التاريخ : {arabicDate.day} / {arabicDate.month?.ar} / {arabicDate.year}</h5>
                </div>

                {/* Display Prayer Times */}
                {time && (
                    <div className="time_hadith">
                        <div className="timings">
                            <div className="timings_container">
                                <div className="time">
                                    <p>الفجر: {time.Fajr}</p>
                                    <p>الشروق: {time.Sunrise}</p>
                                    <p>الظهر: {time.Dhuhr}</p>
                                    <p>العصر: {time.Asr}</p>
                                    <p>المغرب: {time.Maghrib}</p>
                                    <p>العشاء: {time.Isha}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    </div>
  )
}

export default Adan
