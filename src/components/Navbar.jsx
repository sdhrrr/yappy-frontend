import React from 'react';
import logoImg from '/curb.png';
import './Navbar.css';

function Navbar({ onLogout }) {
    return (
        <div className="navbar">
            <div className="brand-name">
                <a href="" target="_blank">
                    <img src={logoImg} alt="logo" style={{height:'4rem'}}/>
                </a>
            </div>
            <div className="navbar-links">
                <button 
                    className="leave-btn" 
                    onClick={onLogout}
                >
                    Leave
                </button>
                <a
                    href="https://github.com/sdhrrr/yappy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                >
                    GitHub
                </a>
            </div>
        </div>
    );
}

export default Navbar;