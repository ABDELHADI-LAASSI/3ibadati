import React, { useEffect, useState } from 'react';
import "./hadith.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Hadits = () => {
    const [hadits, setHadits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);  // Track the current page
    const [lastPage, setLastPage] = useState(null);  // Track the last page
    const { book, chapter } = useParams();

    useEffect(() => {
        const fetchHadits = async (page) => {
            setLoading(true);
            try {
                const res = await axios.get(`https://www.hadithapi.com/public/api/hadiths?apiKey=$2y$10$UAKUXOz9g1ii8KBPTWoVJee0R01BA1CEtys99PQsZqkoZwT45SfK&chapter=${chapter}&book=${book}&page=${page}`);
                setHadits(res.data.hadiths.data);  // Update hadiths data
                setLastPage(res.data.hadiths.last_page);  // Set last page
                setCurrentPage(res.data.hadiths.current_page);  // Set current page
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchHadits(currentPage);
    }, [book, chapter, currentPage]);  // Run when book, chapter, or page changes

    const handleNextPage = () => {
        if (currentPage < lastPage) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <FontAwesomeIcon className='spinner' icon={faSpinner} spin />
            </div>
        )
    }

    return (
        <div className='hadit_page'>
            <div className="section">
                <div className="container">
                    <div className="title">الحديث</div>

                    <div className="hadits_content">
                        {
                            loading ? (
                                <FontAwesomeIcon className='spinner' icon={faSpinner} spin />
                            ) : (
                                hadits?.map((hadit) => (
                                    <div key={hadit.id}>
                                        <p className='hadit_text'> {hadit.hadithArabic} </p>
                                    </div>
                                ))
                            )
                        }
                    </div>

                    {
                        !loading && (
                            <div className="pagination">
                                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                                    الصفحة السابقة
                                </button>
                                <p> الصفحة رقم  <span>{currentPage}</span>  من اصل  <span>{lastPage}</span> </p>
                                <button onClick={handleNextPage} disabled={currentPage === lastPage}>
                                    الصفحة القادمة  
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Hadits;
