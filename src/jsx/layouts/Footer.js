import { Link } from "react-router-dom";

function Footer(props) {
    return (
        <>
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <ul>
                                <li>
                                    <Link to="/about">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/user-agreement">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/privacy-policy">
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;