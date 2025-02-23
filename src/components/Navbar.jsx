import "./Navbar.css";
// import { FaGithub } from "react-icons/fa";

export default function Navbar() {
    return (
        <nav className="navbar">
            <h1 className="brand">Yappy</h1>
            <a 
                href="https://github.com/your-repo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className=""
            >
                <span>Github</span>
            </a>
        </nav>
    );
}

