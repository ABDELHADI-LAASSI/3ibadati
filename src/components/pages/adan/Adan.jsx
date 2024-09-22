import React, { useEffect, useState } from 'react'
import "./adan.css"
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Adan = () => {

    const [country, setCountry] = useState("Morocco")
    const [city, setCity] = useState("Casablanca")
    const [cityArabic, setCityArabic] = useState("الدار البيضاء") // Arabic name for the title
    const [time, setTime] = useState({})
    const [arabicDate, setArabicDate] = useState({})
    const [loading, setLoading] = useState(false)

    const countries = [
        { 
            id: 1, 
            name: "المغرب", 
            apiName: "Morocco", 
            cities: [
                { arabicName: "الدار البيضاء", apiName: "Casablanca" },
                { arabicName: "الرباط", apiName: "Rabat" },
                { arabicName: "مراكش", apiName: "Marrakech" },
                { arabicName: "فاس", apiName: "Fes" },
                { arabicName: "طنجة", apiName: "Tangier" }
            ]
        },
        { 
            id: 2, 
            name: "السعودية", 
            apiName: "Saudi Arabia", 
            cities: [
                { arabicName: "مكة", apiName: "Mecca" },
                { arabicName: "المدينة", apiName: "Medina" },
                { arabicName: "الرياض", apiName: "Riyadh" },
                { arabicName: "جدة", apiName: "Jeddah" },
                { arabicName: "الدمام", apiName: "Dammam" }
            ]
        },
        { 
            id: 3, 
            name: "مصر", 
            apiName: "Egypt", 
            cities: [
                { arabicName: "القاهرة", apiName: "Cairo" },
                { arabicName: "الإسكندرية", apiName: "Alexandria" },
                { arabicName: "الجيزة", apiName: "Giza" },
                { arabicName: "شبرا الخيمة", apiName: "Shubra El-Kheima" },
                { arabicName: "بورسعيد", apiName: "Port Said" }
            ]
        },
        { 
            id: 4, 
            name: "الأردن", 
            apiName: "Jordan", 
            cities: [
                { arabicName: "عمان", apiName: "Amman" },
                { arabicName: "الزرقاء", apiName: "Zarqa" },
                { arabicName: "إربد", apiName: "Irbid" },
                { arabicName: "جرش", apiName: "Jerash" },
                { arabicName: "عجلون", apiName: "Ajloun" }
            ]
        },
        { 
            id: 5, 
            name: "تونس", 
            apiName: "Tunisia", 
            cities: [
                { arabicName: "تونس", apiName: "Tunis" },
                { arabicName: "سوسة", apiName: "Sousse" },
                { arabicName: "صفاقس", apiName: "Sfax" },
                { arabicName: "المهدية", apiName: "Mahdia" },
                { arabicName: "قابس", apiName: "Gabes" }
            ]
        },
        { 
            id: 6, 
            name: "الجزائر", 
            apiName: "Algeria", 
            cities: [
                { arabicName: "الجزائر", apiName: "Algiers" },
                { arabicName: "وهران", apiName: "Oran" },
                { arabicName: "قسنطينة", apiName: "Constantine" },
                { arabicName: "عنابة", apiName: "Annaba" },
                { arabicName: "البليدة", apiName: "Blida" }
            ]
        },
        { 
            id: 7, 
            name: "الإمارات العربية المتحدة", 
            apiName: "United Arab Emirates", 
            cities: [
                { arabicName: "دبي", apiName: "Dubai" },
                { arabicName: "أبوظبي", apiName: "Abu Dhabi" },
                { arabicName: "الشارقة", apiName: "Sharjah" },
                { arabicName: "عجمان", apiName: "Ajman" },
                { arabicName: "رأس الخيمة", apiName: "Ras Al Khaimah" }
            ]
        },
        { 
            id: 8, 
            name: "سلطنة عمان", 
            apiName: "Oman", 
            cities: [
                { arabicName: "مسقط", apiName: "Muscat" },
                { arabicName: "صلالة", apiName: "Salalah" },
                { arabicName: "نزوى", apiName: "Nizwa" },
                { arabicName: "بهلاء", apiName: "Bahla" },
                { arabicName: "صور", apiName: "Sur" }
            ]
        },
        { 
            id: 9, 
            name: "الكويت", 
            apiName: "Kuwait", 
            cities: [
                { arabicName: "الكويت", apiName: "Kuwait City" },
                { arabicName: "الفروانية", apiName: "Farwaniya" },
                { arabicName: "حولي", apiName: "Hawalli" },
                { arabicName: "الجهراء", apiName: "Jahra" },
                { arabicName: "مبارك الكبير", apiName: "Mubarak Al-Kabeer" }
            ]
        },
        { 
            id: 10, 
            name: "قطر", 
            apiName: "Qatar", 
            cities: [
                { arabicName: "الدوحة", apiName: "Doha" },
                { arabicName: "الريان", apiName: "Al Rayyan" },
                { arabicName: "الخور", apiName: "Al Khor" },
                { arabicName: "المسيلة", apiName: "Al Mashaf" },
                { arabicName: "مسيعيد", apiName: "Mesaieed" }
            ]
        }
        // You can add more countries and cities as needed...
    ]
    
    const handleCountryChange = (e) => {
        const selectedCountry = countries.find(country => country.apiName === e.target.value);
        setCountry(e.target.value);
        setCity(selectedCountry.cities[0].apiName); // Automatically set the first city (API name) of the country
        setCityArabic(selectedCountry.cities[0].arabicName); // Automatically set the first city (Arabic name) for display
    }

    const handleCityChange = (e) => {
        const selectedCountry = countries.find(c => c.apiName === country);
        if (selectedCountry) {
            const selectedCity = selectedCountry.cities.find(city => city.apiName === e.target.value);
            if (selectedCity) {
                setCity(e.target.value); // Set API city name for fetching
                setCityArabic(selectedCity.arabicName); // Set Arabic city name for display
            } else {
                console.error("Selected city not found");
            }
        } else {
            console.error("Selected country not found");
        }
    }
    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=3`)
                const data = await res.json()
                console.log(data)
                if (data.data) {
                    setTime(data.data.timings)
                    setArabicDate(data.data.date.hijri)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [city, country])

    return (
        <div className="adan">
            <div className="container">
                <div className="section">
                    {/* Title showing Arabic city name */}
                    <h1 className='title'>مواقيت الصلاة في مدينة {cityArabic}</h1>

                    {/* Country and City Selectors */}
                    <div className="date">
                        <h5>التاريخ : {arabicDate.day} / {arabicDate.month?.ar} / {arabicDate.year}</h5>
                    </div>
                    <div className="selectors">
                        <div>
                        <label htmlFor="country">اختر البلد:</label>
                        <select className='select-hidden' id="country" value={country} onChange={handleCountryChange}>
                            {countries.map((country) => (
                                <option key={country.id} value={country.apiName}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        </div>

                        <div>
                        <label htmlFor="city">اختر المدينة:</label>
                        <select className='select-hidden' id="city" value={city} onChange={handleCityChange}>
                            {countries.find(c => c.apiName === country)?.cities.map((city, idx) => (
                                <option key={idx} value={city.apiName}>{city.arabicName}</option>
                            ))}
                        </select>
                        </div>
                    </div>

                    {/* Display Arabic Date */}

                    {/* Display Prayer Times */}
                    
                        <div className="time_hadith">
                            <div className="timings">
                                <div className="timings_container">
                                    <div className="time">
                                        <div className="adan_time_container">
                                            <h5>الفجر</h5>
                                            <div>
                                                <img src="https://quranacademy.io/blog/wp-content/uploads/2017/08/rsz_sunset-100367_1280-min.jpg" alt="fajr" />
                                                
                                                {
                                                    loading ? <FontAwesomeIcon icon={faSpinner} spin />  :<p>{time.Fajr}</p>
                                                }
                                            </div>
                                        </div>

                                        <div className="adan_time_container">
                                            <h5>الظهر</h5>
                                            <div>
                                                <img src="https://quranacademy.io/blog/wp-content/uploads/2017/08/rsz_sunset-100367_1280-min.jpg" alt="dhuhr" />
                                                
                                                {
                                                    loading ? <FontAwesomeIcon icon={faSpinner} spin />  :<p>{time.Dhuhr}</p>
                                                }
                                            </div>
                                        </div>

                                        <div className="adan_time_container">
                                            <h5>العصر</h5>
                                            <div>
                                                <img src="https://quranacademy.io/blog/wp-content/uploads/2017/08/rsz_sunset-100367_1280-min.jpg" alt="asr" />
                                                
                                                {
                                                    loading ? <FontAwesomeIcon icon={faSpinner} spin />  :<p>{time.Asr}</p>
                                                }
                                            </div>
                                        </div>

                                        <div className="adan_time_container">
                                            <h5>المغرب</h5>
                                            <div>
                                                <img src="https://quranacademy.io/blog/wp-content/uploads/2017/08/rsz_sunset-100367_1280-min.jpg" alt="maghrib" />
                                                
                                                {
                                                    loading ? <FontAwesomeIcon  icon={faSpinner} spin />  :<p>{time.Maghrib}</p>
                                                }
                                            </div>
                                        </div>

                                        <div className="adan_time_container">
                                            <h5>العشاء</h5>
                                            <div>
                                                <img src="https://quranacademy.io/blog/wp-content/uploads/2017/08/rsz_sunset-100367_1280-min.jpg" alt="isha" />
                                                {
                                                    loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <p>{time.Isha}</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Adan
