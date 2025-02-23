import logoImg from '/curb.png';
import './Navbar.css'

function Navbar() {
    return (
        <div className="navbar">
            <div className="brand-name">
                <img src={logoImg} alt="logo" style={{height:'5rem'}}/>
            </div>
            <div className="navbar-links">
                <button className="leave-btn">Leave</button>
                <a
                    href="https://github.com/your-repo"
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