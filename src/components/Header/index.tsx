import './index.css'
import logo from '../../assets/logo.png'

export const Header = () => {
    return (
        <>
            <header>
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <div className="info">
                    Lorem ipsum.
                </div>
            </header>
        </>
    )
}