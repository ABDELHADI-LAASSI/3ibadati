import React, { useEffect, useState } from 'react'
import "./hadith.css"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'

const Chapter = () => {
    const { book } = useParams()
    const [chapters, setChapters] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchChapter, setSearchChapter] = useState([])  // Correct typo here

    useEffect(() => {
        const fetchChapters = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`https://www.hadithapi.com/api/${book}/chapters?apiKey=$2y$10$UAKUXOz9g1ii8KBPTWoVJee0R01BA1CEtys99PQsZqkoZwT45SfK`)
                setChapters(res.data.chapters)  // Store the chapters in state
                setSearchChapter(res.data.chapters)  // Set search state with all chapters initially
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        fetchChapters()
    }, [book])  // Add 'book' as a dependency

    const handleSearch = (value) => {
        setSearchChapter(chapters.filter((chapter) => chapter.chapterArabic.includes(value)))  // Correct typo here
    }

    if (loading) {
        return (
            <div className="loading">
                <FontAwesomeIcon className='spinner' icon={faSpinner} spin />
            </div>
        )
    }

    return (
        <div>
            <div className="container">
                <div className="section">
                    <h1 className='title'> {book} </h1>

                    <div className="search_by_sorah">
                        <div className="input_search">
                            <input
                                className='search_input'
                                type="text"
                                placeholder=" ابحث عن كتاب"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <FontAwesomeIcon className='search_icon' icon={faSearch} />
                        </div>
                        <ul>
                            {searchChapter.map((chapter, index) => (
                                <li key={index}>
                                    <Link className='link link_search' to={`/hadith/book/${book}/chapter/${chapter.chapterNumber}`} >
                                        {chapter.chapterArabic} 
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="chapters">
                        {
                            loading ? (
                                <FontAwesomeIcon className='spinner' icon={faSpinner} spin />
                            ) : (
                                chapters?.map((chapter) => (
                                    <Link className='chapter_link' to={`/hadith/book/${book}/chapter/${chapter.chapterNumber}`} key={chapter.chapterNumber}>
                                        <p> {chapter.chapterArabic} </p>
                                    </Link>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chapter
