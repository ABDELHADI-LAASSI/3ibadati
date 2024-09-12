import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Layout from './components/Layers/Main/Layout';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<div className='center' > الصفحة الرئيسية </div>} />
          <Route path="adan" element={<div className='center' > مواقيت الصلاة </div>} />
          <Route path="quran" element={<div className='center' > القرآن الكريم </div>} />
          <Route path="hadith" element={<div className='center' > الأحاديث النبوية </div>} />
          <Route path="doros" element={<div className='center' > الدروس و الفتاوى </div>} />
          <Route path="contact" element={<div className='center' > تواصل معنا </div>} />

          <Route path="*" element={<div> 404 </div>} />
        </Route>
      </Routes>
  );
}

export default App;
