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

    const login = (e) => {
        e.preventDefault();
        return navigate('sign-in');
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
                            <Link className='nav-link' to='/search/movie/1'>
                                Movies
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/search/tv show/1'>
                                TV Shows
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/search/asian drama/1'>
                                Asian Drama
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                    <div className="d-flex">
                        <BsSearch onClick={find} className="icon" title="Search" />
                        {/* <BsPerson className="icon" title="Profile" onClick={login} /> */}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;