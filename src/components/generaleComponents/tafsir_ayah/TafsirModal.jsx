import React from 'react'
import { useApplication } from '../../../context/Application'
import './tafsirmodal.css'

const TafsirModal = () => {

    const { tafsirAyah, setTafsirAya } = useApplication()

    return (
        <div onClick={() => setTafsirAya(false)} className='tafsir_Modal'>
            <div className="tafirModelConte" onClick={(e) => e.stopPropagation()} >
                <div className="tafasir_buttons">
                    <button> تفسير ابن كثير </button>
                    <button> تفسير الطبري </button>
                    <button> التفسير الميسر </button>
                    <button> تفسير الجلالين </button>
                    <button> تفسير السعدي </button>
                    <button> تفسير الوسيط لطنطاوي </button>
                    <button> تفسير البغوي </button>
                    <button> تفسير القرطبي </button>
                </div>
            </div>
        </div>
    )
}

export default TafsirModal
