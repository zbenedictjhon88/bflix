import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsSearch, BsBoxArrowRight, BsPerson } from "react-icons/bs";
import swal from "sweetalert";
import { signOutGoogleAccount } from "../../services/AuthService";
import logo from '../../assets/images/bflix-logo.png';
import { getCookie } from "../../services/UtilService";
import CustomLink from "../components/CustomLink";

function NavBar(props) {

    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [isUserVerified, setIsUserVerified] = useState(getCookie('isUserVerified'));

    useEffect(() => {
        // setIsUserVerified(Boolean.parse());
    }, []);

    const find = (e) => {
        swal("SEARCH", {
            content: "input",
            closeOnClickOutside: false,
        }).then((value) => {
            console.log(value);
            if (value != '') {
                return navigate('search/' + value + '/' + 1);
            }
        });
    }

    const exit = (e) => {
        e.preventDefault();
        signOutGoogleAccount();
    }

    const userValidate = (e) => {
        e.preventDefault();
        alert('a');
    }

    return (
        <nav className="navbar navbar-expand-xl sticky-top">
            <div className="container">

                <Link className='navbar-brand' to='/'>
                    <img src={logo} height={50} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className='nav-link' to='/'>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to={isUserVerified == 'true' ? '/search/movie/1' : '/guest'}>
                                Movies
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to={isUserVerified == 'true' ? '/search/tv show/1' : '/guest'}>
                                TV Shows
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to={isUserVerified == 'true' ? '/search/asian/1' : '/guest'}>
                                Asian Drama
                            </Link>
                        </li>
                    </ul>

                    {/* <form class="d-flex">
                        <input class="form-control me-2" type="text" placeholder="Search" onChange={e => setSearch(e.target.value)} />
                        <button class="btn btn-primary" type="button" onClick={find}>Search</button>
                    </form> */}
                </div>

                <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                    <div className="d-flex">
                        {isUserVerified == 'true' ? <BsSearch onClick={find} className="icon" title="Search" /> : ''}
                        {/* <BsPerson className="icon" title="Profile" /> */}
                        <BsBoxArrowRight onClick={exit} className="icon" title="Logout" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;