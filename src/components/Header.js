import React from 'react'
import '../style/Header.css'
import Logo from '../assets/Logo.png'
function Header() {
    return (
        <header className="header">
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>
        </header>
    )
}

export default Header
