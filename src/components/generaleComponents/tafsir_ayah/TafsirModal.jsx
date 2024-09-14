import React, { useEffect, useState } from 'react'
import { useApplication } from '../../../context/Application'
import './tafsirmodal.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const TafsirModal = () => {

    const { tafsirAyah, setTafsirAya , currentSorah } = useApplication()

    const [tafsirText , setTafsirText] = useState([])
    const [loading , setLoading] = useState(true)
    const [tafsirId , setTafsirId] = useState(4)


    useEffect(()=>{
        const fetchTafsirAyah = async () => {

            setLoading(true)
    
            try {
    
                const res = await axios.get(`http://api.quran-tafseer.com/tafseer/${tafsirId}/${currentSorah}/${tafsirAyah}`)
                setTafsirText(res.data.text)
    
            } catch (error) {
    
                console.log(error);
    
            } finally {
    
                setLoading(false)
    
            }
        }

        fetchTafsirAyah()
    },[tafsirId ])

    const handleTafsirId = (id) => {
        setTafsirId(id)
    }


    return (
        <div onClick={() => setTafsirAya(false)} className='tafsir_Modal'>
            <div className="tafirModelConte" onClick={(e) => e.stopPropagation()} >
                <div className="tafasir_buttons">
                    <button className={tafsirId == 4 ? 'activeTafsirButton' : ''}  disabled={loading ? true : false}  onClick={ () => handleTafsirId(4) } > تفسير ابن كثير </button>
                    <button className={tafsirId == 8 ? 'activeTafsirButton' : ''}  disabled={loading ? true : false}  onClick={ () => handleTafsirId(8) } > تفسير الطبري </button>
                    <button className={tafsirId == 1 ? 'activeTafsirButton' : ''}  disabled={loading ? true : false}  onClick={ () => handleTafsirId(1) } > التفسير الميسر </button>
                    <button className={tafsirId == 2 ? 'activeTafsirButton' : ''}  disabled={loading ? true : false}  onClick={ () => handleTafsirId(2) } > تفسير الجلالين </button>
                    <button className={tafsirId == 3 ? 'activeTafsirButton' : ''}  disabled={loading ? true : false}  onClick={ () => handleTafsirId(3) } > تفسير السعدي </button>
                    <button className={tafsirId == 5 ? 'activeTafsirButton' : ''}  disabled={loading ? true : false}  onClick={ () => handleTafsirId(5) } > تفسير الوسيط لطنطاوي </button>
                    <button className={tafsirId == 6 ? 'activeTafsirButton' : ''}  disabled={loading ? true : false}  onClick={ () => handleTafsirId(6) } > تفسير البغوي </button>
                    <button className={tafsirId == 7 ? 'activeTafsirButton' : ''}  disabled={loading ? true : false}  onClick={ () => handleTafsirId(7) } > تفسير القرطبي </button>
                </div>

                <div className="tafsir_text">
                    <h4> تفسير الآية </h4>
                    <p className='tafsir_p' >
                        {
                            loading ? <FontAwesomeIcon className='spinner' icon={faSpinner} /> : tafsirText
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TafsirModal
