import { useState } from "react"
import "./navbar_style.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCoffee, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {

    // ==========================================
    window.addEventListener("scroll", () => {
        const header = document.querySelector(".header");
    
        // Use window.scrollY directly
        if (window.scrollY >= 80) {
            header.classList.add("scroll-header");
        } else {
            header.classList.remove("scroll-header");
        }
    });
    // ==========================================
    const [toggle, setToggle] = useState(false)
    const [activeLink, setActiveLink] = useState("home")


    return(
        <header className="header" >
            <nav className="nav container">
                <a className="nav__logo" >عبادتي</a>
                <div className={toggle ? "nav__menu show-menu" : "nav__menu"}>
                    <ul className="nav__list grid">

                        <li className="nav__item" onClick={() => { setActiveLink("home") }}>
                            <a  className={activeLink === "home" ? "nav__link active-link" : "nav__link" } >
                                <i className="uil uil-estate nav__icon"></i>
                                
                                مواقيت الصلاة
                            </a>
                        </li>

                        <li className="nav__item" onClick={() => { setActiveLink("about") }}>
                            <a   className={activeLink === "about" ? "nav__link active-link" : "nav__link" }>
                                <i className="uil uil-user nav__icon"></i> 
                                القرآن الكريم
                            </a>
                        </li>

                        <li className="nav__item" onClick={() => { setActiveLink("skills") }}>
                            <a  className={activeLink === "skills" ? "nav__link active-link" : "nav__link" } >
                                <i className="uil uil-file-alt nav__icon"></i>
                                 الأحاديث النبوية
                            </a>
                        </li>

                        <li className="nav__item" onClick={() => { setActiveLink("Services") }}>
                            <a  className={activeLink === "Services" ? "nav__link active-link" : "nav__link" }>
                                <i className="uil uil-briefcase nav__icon"></i>
                                الدروس و الفتاوى
                            </a>
                        </li>

                        <li className="nav__item" onClick={() => { setActiveLink("Portfolio") }}>
                            <a  className={activeLink === "Portfolio" ? "nav__link active-link" : "nav__link" }>
                                <i className="uil uil-scenery nav__icon"></i>
                                تواصل معنا
                            </a>
                        </li>

                    </ul>

                    <i className="uil uil-times nav__close" 
                    onClick={()=>{
                        setToggle(!toggle)
                    }}
                    ></i>

                    <FontAwesomeIcon className="uil uil-times nav__close" onClick={ () => { setToggle(!toggle) } } icon={faXmark} />
                </div>
                <div className="nav__toggle" onClick={ () => { setToggle(!toggle) } } >
                    <FontAwesomeIcon className="uil uil-apps" icon={faBars} />
                </div>
            </nav>
        </header>
    )
}   