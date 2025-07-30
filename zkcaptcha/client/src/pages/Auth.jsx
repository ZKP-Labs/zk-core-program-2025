import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { validateEmail } from "../app/service/validation.service";
import { signin, signup } from "../app/api/auth.api";

export const Auth = () => { 
    // Import necessary hooks and components
    const { type } = useParams();
    const [userContent, setUserContent] = useState({username: '', email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();

    const resetUserContent = () => {
        setUserContent({ username: '', email: '', password: '', confirmPassword: '' });
    }

    useEffect(() => {
        if (type === 'signup')
            resetUserContent();
        else if (type === 'signin')
            resetUserContent();
    }, [type]);

    // Define the content for register and login forms
    const registerContent = {
        label: [ 'Username', 'Email', 'Password', 'Confirm Password' ],
        button: 'Sign up',
        linker: {
            link: '/auth/signin',
            text: "Already have an account? Sign in"
        }
    };

    const loginContent = {
        label: [ 'Email', 'Password' ],
        button: 'Sign in',
        linker: {
            link: '/auth/signup',
            text: "Don't have an account? Register"
        }
    };

    const typeContent = (type) => {
        switch(type) {
            case 'signup':
                return registerContent;
            case 'signin':
                return loginContent;
            default:
                return registerContent;
        }
    }

    // Handle form submission for sign up and sign in
    const handleSignUp = async (e) => {
        if (!validateEmail(userContent.email)) {
            console.log('Email is not valid!');
            alert('Email is not valid!');
            return;
        }

        if (userContent.password.length < 6) {
            console.log('Password must be at least 6 characters long!');
            alert('Password must be at least 6 characters long!');
            return;
        }

        if (userContent.password !== userContent.confirmPassword) {
            console.log('Passwords do not match!');
            alert('Passwords do not match!');
            return;
        }

        const response = await signup(userContent.username, userContent.email, userContent.password);

        resetUserContent();

        if (response) {
            console.log('Sign up successful!', response);
            alert('Sign up successful')
        }
    }

    const handleSignIn = async (e) => {
        const response = await signin(userContent.email, userContent.password)
        resetUserContent();
        if (response) {
            console.log('Sign in successful: ', response);
            navigate('/');
        }
    }

    const typeButton = (type) => {
        switch(type) {
            case 'signup':
                return handleSignUp;
            case 'signin':
                return handleSignIn;
            default:
                return handleSignUp;
        }
    }


    return (
        <>
            <main className="auth">
                <div className="auth__container">
                    <h1 className="auth__title">ZKCAPTCHA</h1>

                    {typeContent(type).label.map((item, index) => {
                        const fieldKey = item === 'Confirm Password' ? 'confirmPassword' : item.toLowerCase();
                        const typeInput = item === 'Password' || item === 'Confirm Password' ? 'password' : 'text';

                        return (
                            <div key={index} className="auth__field-container">                        
                                <input 
                                    className="auth__field" 
                                    type={typeInput}
                                    placeholder={item}
                                    value={userContent[fieldKey]}
                                    onChange={(e) => setUserContent({
                                        ...userContent,
                                        [fieldKey]: e.target.value
                                    })}
                                />
                            </div>
                        )
                    })}

                    
                    <div className="auth__remember">
                        <div className="auth__remember-checkbox">
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">Remember me</label>
                        </div>

                        <p className="auth__remember-forgot">Forgot password?</p>
                    </div>


                    {typeContent(type).button &&
                        <button className="auth__button" onClick={typeButton(type)}>
                            {typeContent(type).button}
                        </button>
                    }

                    <div className="auth__liner">
                        <hr className="auth__line" />
                        <p className="auth__line-text">or</p>
                        <hr className="auth__line" />
                    </div>

                    {typeContent(type).linker &&
                        <Link to={typeContent(type).linker.link} className="auth__linker">
                            {typeContent(type).linker.text}
                        </Link>
                    }
                </div>
            </main>
        </>
    );
}