import { Link } from 'react-router-dom';
import './Navbar.css'
function Navbar() {

    return (
        <div>
            <nav className='main-nav'>
                <ul className='navbar'>
                    <li><Link to='/' className ="navLink active">Home</Link></li>
                    <li><Link to='/yt-downloader' className ="navLink">Single Video Downloader</Link></li>
                    <li><Link to='/about' className ="navLink">About Us</Link></li>
                </ul>
            </nav>

        </div>
    )
}

export default Navbar;