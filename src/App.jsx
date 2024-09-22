import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Layout from './components/Layers/Main/Layout';
import Adan from './components/pages/adan/Adan';
import Quran from './components/pages/quran/Quran';
import Sorah from './components/pages/quran/Sorah';
import Books from './components/pages/hadith/Books';
import Chapter from './components/pages/hadith/Chapter';
import Hadits from './components/pages/hadith/Hadits';
import Doros from './components/pages/doros/Doros';
import Contact from './components/pages/contact/Contact';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<div className='center' > الصفحة الرئيسية </div>} />
          <Route path="adan" element={ <Adan /> } />
          <Route path="quran" element={ <Quran /> } />
          <Route path='quran/:id' element={ <Sorah /> } />
          <Route path="hadith" element={ <Books /> } />
          <Route path="hadith/book/:book" element={ <Chapter /> } />
          <Route path="hadith/book/:book/chapter/:chapter" element={ <Hadits /> } />
          <Route path="hadith" element={ <Books /> } />
          <Route path="doros" element={ <Doros /> } />
          <Route path="contact" element={ <Contact /> } />

          <Route path="*" element={<div> 404 </div>} />
        </Route>
      </Routes>
  );
}

export default App;

