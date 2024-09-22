import React from 'react'
import './contact.css'

const Contact = () => {
  return (
    <div className='contact'>
        <div className="section">
            <div className="container">
                <div className="title">اتصل بنا</div>

                <div className="contact-container">

                    <form className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">الاسم</label>
                            <input type="text" id="name" placeholder="أدخل اسمك" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">البريد الإلكتروني</label>
                            <input type="email" id="email" placeholder="أدخل بريدك الإلكتروني" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">الرسالة</label>
                            <textarea id="message" rows="4" placeholder="أدخل رسالتك"></textarea>
                        </div>
                        <button type="submit" className="submit-button">إرسال</button>
                    </form>
                    
                    <div className='contact_hadith'>
                        <div>
                            <span className='contact_sanad'>عن أنس بن مالك رضي الله عنه خادم رسول الله صلى الله عليه وسلم أن النبي صلى الله عليه وسلم قال</span>
                            <span className='contact_hadith_text'> لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه </span>
                            <span className='contact_ikhraj'>رواه البخاري ومسلم</span>
                        </div>
                        <div>
                            <span className='contact_sanad'>عَنْ أَبِي هُرَيْرَةَ (رضي الله عنه) قَالَ: قَالَ رَسُولُ اللَّهِ (صَلَّى اللَّهُ عَلَيْهِ وعلى آله وَسَلَّمَ):</span>
                            <span className='contact_hadith_text'> مَنْ يَأْخُذُ مِنِّي خَمْسَ خِصَالٍ فَيَعْمَلُ بِهِنَّ، أَوْ يُعَلِّمُهُنَّ مَنْ يَعْمَلُ بِهِنَّ؟» قَالَ أَبُو هُرَيْرَةَ: فَقُلْتُ: أَنَا يَا رَسُولَ اللَّهِ، فَأَخَذَ بِيَدِي فَعَدَّهُنَّ فِيهَا وَقَالَ: «اتَّقِ المَحَارِمَ تَكُنْ أَعْبَدَ النَّاسِ، وَارْضَ بِمَا قَسَمَ اللَّهُ لَكَ تَكُنْ أَغْنَى النَّاسِ، وَأَحْسِنْ إِلَى جَارِكَ تَكُنْ مُؤْمِنًا، وَأَحِبَّ لِلنَّاسِ مَا تُحِبُّ لِنَفْسِكَ تَكُنْ مُسْلِمًا، وَلَا تُكْثِرِ الضَّحِكَ، فَإِنَّ كَثْرَةَ الضَّحِكِ تُمِيتُ القَلْبَ </span>
                            <span className='contact_ikhraj'>رواه أحمد 8095 والترمذي 2305 </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contact