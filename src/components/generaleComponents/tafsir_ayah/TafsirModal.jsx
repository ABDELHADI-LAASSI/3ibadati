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
    const [tafsirId , setTafsirId] = useState('ar-tafsir-al-tabari')


    useEffect(()=>{
        const fetchTafsirAyah = async () => {

            setLoading(true)
    
            try {
    
                const res = await axios.get(`https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/${tafsirId}/${currentSorah}/${tafsirAyah}.json`)
                console.log(res.data);
                
                setTafsirText(res.data.text)
    
            } catch (error) {
    
                console.log(error);
    
            } finally {
    
                setLoading(false)
    
            }
        }

        fetchTafsirAyah()
    },[tafsirId, tafsirAyah, currentSorah ])

    const handleTafsirId = (id) => {
        setTafsirId(id)
    }


    return (
        <div onClick={() => setTafsirAya(false)} className='tafsir_Modal'>
            <div className="tafirModelConte" onClick={(e) => e.stopPropagation()} >
                <div className="tafasir_buttons">
                    <button   disabled={loading ? true : false}  onClick={ () => handleTafsirId('ar-tafsir-ibn-kathir') }  className={tafsirId == 'ar-tafsir-ibn-kathir' ? 'activeTafsirButton' : ''} >  ابن كثير </button>
                    <button   disabled={loading ? true : false}  onClick={ () => handleTafsirId('ar-tafsir-al-tabari') }  className={tafsirId == 'ar-tafsir-al-tabari' ? 'activeTafsirButton' : ''} >  الطبري </button>
                    <button   disabled={loading ? true : false}  onClick={ () => handleTafsirId('ar-tafsir-muyassar') }  className={tafsirId == 'ar-tafsir-muyassar' ? 'activeTafsirButton' : ''} > ال الميسر </button>
                    <button   disabled={loading ? true : false}  onClick={ () => handleTafsirId('ar-tafseer-al-saddi') }  className={tafsirId == 'ar-tafseer-al-saddi' ? 'activeTafsirButton' : ''} >  السعدي </button>
                    <button   disabled={loading ? true : false}  onClick={ () => handleTafsirId('ar-tafsir-al-wasit') }  className={tafsirId == 'ar-tafsir-al-wasit' ? 'activeTafsirButton' : ''} >  الوسيط لطنطاوي </button>
                    <button   disabled={loading ? true : false}  onClick={ () => handleTafsirId('ar-tafsir-al-baghawi') }  className={tafsirId == 'ar-tafsir-al-baghawi' ? 'activeTafsirButton' : ''} >  البغوي </button>
                    <button   disabled={loading ? true : false}  onClick={ () => handleTafsirId('ar-tafseer-al-qurtubi') }  className={tafsirId == 'ar-tafseer-al-qurtubi' ? 'activeTafsirButton' : ''} >  القرطبي </button>
                    <button   disabled={loading ? true : false}  onClick={ () => handleTafsirId('en-tafisr-ibn-kathir') }  className={tafsirId == 'en-tafisr-ibn-kathir' ? 'activeTafsirButton' : ''} >  Ibn Kathir </button>
                </div>

                <div className="tafsir_text">
                    <h4> تفسير الآية </h4>
                    <p className='tafsir_p' >
                        {
                            loading ? <FontAwesomeIcon className='spinner' icon={faSpinner} /> : tafsirText || 'Unable to load tafsir text'
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TafsirModal
