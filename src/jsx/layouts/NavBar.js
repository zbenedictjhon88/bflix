import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BsFillHouseDoorFill, BsFillDisplayFill, BsFillCameraReelsFill, BsFillCupFill, BsFillStarFill } from "react-icons/bs";

function NavBar(props) {

    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const find = (e) => {
        if (search != '') {
            return navigate('search/' + search)
        }
    }

    return (
        <nav class="navbar navbar-expand-xl sticky-top">
            <div class="container">
                <a class="navbar-brand" href="#">BFLIX</a>
                <small>BETA</small>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link className='nav-link' to='/'>
                                <BsFillHouseDoorFill />
                                Home
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link className='nav-link' to='/search/movie'>
                                <BsFillCameraReelsFill /> Movies
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link className='nav-link' to='/search/tv show'>
                                <BsFillDisplayFill /> TV Shows
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link className='nav-link' to='/'>
                                <BsFillCupFill /> Animes
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link className='nav-link' to='/search/asian'>
                                <BsFillStarFill /> Asian Drama
                            </Link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                <i className="fa fa-user fa-fw"></i> Profile
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Change Password</a></li>
                                <li><a class="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <input class="form-control me-2" type="text" placeholder="Search" onChange={e => setSearch(e.target.value)} />
                        <button class="btn btn-primary" type="button" onClick={find}>Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;