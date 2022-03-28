import './index.css'
import about from '../../assets/menu/about.png'
import comic from '../../assets/menu/comic.png'
import hero from '../../assets/menu/hero.png'
import home from '../../assets/menu/home.png'
import { Link } from "react-router-dom"

export const Menu = () => {
    return (
        <>
            <div className="menu--container">
                <div className="menu--icon">
                    <Link to="/"><img src={home} /></Link>
                </div>
                <div className="menu--icon">
                    <Link to="/characters/"><img src={hero} /></Link>
                </div>
                <div className="menu--icon">
                    <img src={comic} />
                </div>
                <div className="menu--icon">
                    <img src={about} />
                </div>
            </div>
        </>
    )
}