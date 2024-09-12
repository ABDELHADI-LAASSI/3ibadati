import { useState } from "react"
import "./navbar_style.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCoffee, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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
                <Link to={"/"} className="nav__logo" >عبادتي</Link>
                <div className={toggle ? "nav__menu show-menu" : "nav__menu"}>
                    <ul className="nav__list grid">

                        <li className="nav__item" onClick={() => { setActiveLink("acceuil") }}>
                            <Link to={"/"} className={activeLink === "acceuil" ? "nav__link active-link" : "nav__link" } >
                                الصفحة الرئيسية
                            </Link>
                        </li>

                        <li className="nav__item" onClick={() => { setActiveLink("home") }}>
                            <Link to={"/adan"} className={activeLink === "home" ? "nav__link active-link" : "nav__link" } >
                                مواقيت الصلاة
                            </Link>
                        </li>

                        <li className="nav__item" onClick={() => { setActiveLink("about") }}>
                            <Link  to={"/quran"} className={activeLink === "about" ? "nav__link active-link" : "nav__link" }>
                                القرآن الكريم
                            </Link>
                        </li>

                        <li className="nav__item" onClick={() => { setActiveLink("skills") }}>
                            <Link to={"/hadith"} className={activeLink === "skills" ? "nav__link active-link" : "nav__link" } >
                                 الأحاديث النبوية
                            </Link>
                        </li>

                        <li className="nav__item" onClick={() => { setActiveLink("Services") }}>
                            <Link to={"/doros"} className={activeLink === "Services" ? "nav__link active-link" : "nav__link" }>
                                الدروس و الفتاوى
                            </Link>
                        </li>

                        <li className="nav__item" onClick={() => { setActiveLink("Portfolio") }}>
                            <Link to={'/contact'} className={activeLink === "Portfolio" ? "nav__link active-link" : "nav__link" }>
                                تواصل معنا
                            </Link>
                        </li>

                    </ul>


                    <FontAwesomeIcon className="uil uil-times nav__close" onClick={ () => { setToggle(!toggle) } } icon={faXmark} />
                </div>
                <div className="nav__toggle" onClick={ () => { setToggle(!toggle) } } >
                    <FontAwesomeIcon className="uil uil-apps" icon={faBars} />
                </div>
            </nav>
        </header>
    )
}   