import { Link, useParams } from 'react-router-dom';

function SideBar(props) {
    return (
        <>
            <nav className="sidebar">
                <div className="container">
                    <div className="sidelogo">
                        <div className="logo">
                            <label>T</label>
                        </div>
                        <h3>Hi, Torreon</h3>
                        <p>ellarose@gmail.com</p>
                    </div>
                    <ul className="sidebar-side">
                        <li className="side-item">
                            <Link className='side-link active' to='/'>
                                <i className="fa fa-home fa-fw"></i> Home
                            </Link>
                        </li>
                        <li className="side-item">
                            <Link className='side-link' to='/search/movie'>
                                <i className="fa fa-ticket fa-fw"></i> Movies
                            </Link>

                        </li>
                        <li className="side-item">
                            <Link className='side-link' to='/search/tv show'>
                                <i className="fa fa-tv fa-fw"></i> TV Shows
                            </Link>

                        </li>
                        <li className="side-item">
                            <Link className='side-link' to='/search/trending'>
                                <i className="fa fa-star fa-fw"></i> Trending
                            </Link>
                        </li>
                        <li className="side-item">
                            <a className="side-link" href="#">
                                <i className="fa fa-dot-circle-o fa-fw"></i> Anime (Coming soon)
                            </a>
                        </li>
                        <label>Account</label>
                        <li className="side-item">
                            <a className="side-link" href="#">
                                <i className="fa fa-circle-o fa-fw"></i> Profile
                            </a>
                        </li>
                        <li className="side-item">
                            <a className="side-link" href="#">
                                <i className="fa fa-circle-o fa-fw"></i> Change Password
                            </a>
                        </li>
                        <li className="side-item">
                            <a className="side-link" href="#">
                                <i className="fa fa-circle-o fa-fw"></i> Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default SideBar;