import bg from '../../assets/images/unauth-bg.jpg';
import logo from '../../assets/images/bflix-logo.png';
import { signInEmailPassword, signInGoogleAccount } from '../../services/AuthService';
import { BsGoogle } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import swal from 'sweetalert';

function SignIn(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let errorsObj = { email: '', password: '', errormessage: '' };
    const [errors, setErrors] = useState(errorsObj);

    function login(e) {
        e.preventDefault();
       
        let error = false;
        const errorObj = { ...errorsObj };

        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }

        setErrors(errorObj);
        if (error) {
            swal('Oops', 'Please log your credential. Thank You!', 'warning');
            return;
        }

        signInEmailPassword(email, password);
    } 

    function loginGoogleAccoun(e) {
        e.preventDefault();
        signInGoogleAccount();
    } 

    return (
        <>
            <div className="sign" style={{ backgroundImage: 'url(' + bg + ')' }}>
                <div className='sign-form'>
                    <form onSubmit={login}>
                        <img src={logo} className="sign-logo" />

                        <br />
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Type Your Email Address"
                        />
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            placeholder="Type Your Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className='d-grid sign-btn'>
                            <button className="btn btn-danger btn-block">
                                Sign In
                            </button>
                            <button type='button' onClick={loginGoogleAccoun} className="btn btn-danger btn-block">
                                <BsGoogle size={24} className="icon" />
                                Sign In with Google
                            </button>
                        </div>
                    </form>

                    <p>
                        Don't have an Account? 
                        <Link to="/sign-up" className='sign-link'>
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default SignIn;