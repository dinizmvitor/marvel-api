import './index.scss'
import logo from '../../assets/logo.png'

export const Header = () => {
    return (
        <>
            <header>
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <div className="info">
                    <h1>Welcome to the Marvel API.</h1>
                    <small>by Vítor Diniz</small>
                </div>
            </header>
        </>
    )
}