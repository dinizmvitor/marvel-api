import './index.css'
import about from '../../assets/about.png'
import comic from '../../assets/comic.png'
import hero from '../../assets/hero.png'
import home from '../../assets/home.png'
import { Link } from "react-router-dom"

export const Menu = () => {
    return (
        <>
            <div className="menu--container">
                <div className="menu--icon">
                    <Link to="/">
                        <img src={home} />
                    </Link>
                </div>
                <div className="menu--icon">
                    <Link to="/characters">
                        <img src={hero} />
                    </Link>
                </div>
                <div className="menu--icon">
                    <Link to="/comics">
                        <img src={comic} />
                    </Link>
                </div>
                <div className="menu--icon">
                    <Link to="/about">
                        <img src={about} />
                    </Link>
                </div>
            </div>
        </>
    )
}