import bg from '../../assets/images/unauth-bg.jpg';
import logo from '../../assets/images/bflix-logo.png';
import { signInGoogleAccount, signUpEmailPassword } from '../../services/AuthService';
import { BsGoogle } from "react-icons/bs";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

function SignUp(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let errorsObj = { name: '', email: '', password: '', errormessage: '' };
    const [errors, setErrors] = useState(errorsObj);

    function register(e) {
        e.preventDefault();

        let error = false;
        const errorObj = { ...errorsObj };

        if (name === '') {
            errorObj.name = 'Full Name is Required';
            error = true;
        }
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
            swal('Error', 'All fields are required.', 'error');
            return;
        }

        signUpEmailPassword(name, email, password);
    }

    return (
        <>
            <div className="sign" style={{ backgroundImage: 'url(' + bg + ')' }}>
                <div className='sign-form'>
                    <form onSubmit={register}>
                        <img src={logo} className="sign-logo" />

                        <br />
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Type Your Full Name"
                        />
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
                                Sign Up
                            </button>
                        </div>

                        <p>
                            Have an Account?
                            <Link to="/sign-in" className='sign-link'>
                                Sign In
                            </Link>
                        </p>
                    </form>

                </div>
            </div>
        </>
    );
}

export default SignUp;