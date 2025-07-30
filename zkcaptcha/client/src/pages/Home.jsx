import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faRefresh, faRightFromBracket, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { useGetChallenge, useGetChallengeById } from '../app/hooks/captcha.hook';
import { useEffect, useState } from 'react';
import { groth16 } from "snarkjs";
import { getPoseidonHash, verify } from '../app/api/captcha.api';

export const Home = () => {
    const { data, isLoading, fetchData } = useGetChallenge();
    const user = JSON.parse(localStorage.getItem('user'));
    const [challenge, setChallenge] = useState(null);
    const [status, setStatus] = useState({ message: false, verify: false, verify_fail: false });
    const [captchaState, setCaptchaState] = useState({ solution: '', proofResult: null });
    const [remaining, setRemaining] = useState(0);

    if (isLoading)
        return;

    useEffect(() => {
        if (data) {
            setChallenge(data);
            setRemaining(challenge?.max_attempts - challenge?.attempts)
        }
    }, [data]);

    const userContent = [
        { label: 'Member', value: user.username || '#' },
        { label: 'Email', value: user.email || '#' }
    ]

    const handleLogOut = (e) => {
        localStorage.clear();
        window.location.reload();
    }

    const verifyMessage = () => {
        setStatus(prev => ({...prev, message: true}));
        setTimeout(() => {
            setStatus(prev => ({...prev, message: false}));
        }, 2000);
    }

    const verifyFailEvent = () => {
        setStatus(prev => ({...prev, verify_fail: true}));
        setTimeout(() => {
            setStatus(prev => ({...prev, verify_fail: false}));
        }, 2000);
    }

    const verifySuccessEvent = () => {
        setStatus(prev => ({...prev, verify: true}));
        setTimeout(() => {
            setStatus(prev => ({...prev, verify: false}));
        }, 2000);
    }

    const handleCaptchaVerification = async () => {
        if (captchaState.solution === null || captchaState.solution === '' ) {
            verifyFailEvent();
            return;
        }

        const stringToAsciiArray = (str) => 
            str.split('')
            .slice(0, 6)
            .map((char) => char.charCodeAt(0));

        const solutionAsciiArray = stringToAsciiArray(captchaState.solution)

        const public_hash = await getPoseidonHash(solutionAsciiArray);

        console.log('PUBLIC_HASH: ', public_hash.hash)
        
        const input = { 
            chars: solutionAsciiArray,
            public_hash: BigInt(public_hash.hash)
        }
        console.log('Input: ', input)
        console.log('Type: ', typeof input.public_hash)

        try {
            const { proof, publicSignals } = await groth16.fullProve(
                input,
                challenge.wasm_url,
                challenge.zkey_url
            );

            const proofResult = { proof, publicSignals };

            console.log('Proof Result: ', proofResult)

            const response = await verify(
                challenge.captcha_id, 
                user.id, 
                proofResult.proof, 
                proofResult.publicSignals.map(signal => signal.toString())
            );

            console.log('STATUS: ', response)

            if (response === 200) {
                verifySuccessEvent();
                fetchData();
            } else if (response === 400) {
                setRemaining(remaining -1);
                verifyFailEvent();
            } else {
                setRemaining(remaining -1);
                verifyMessage();
                fetchData();
            }

            setCaptchaState({ solution: '', proofResult: null });
        } catch (error) {
            console.error("Error creating proof:", error);
        }
    }

    return (
        <>
            <div className="home">
                <article className="home__sidebar">
                    <div className="home__sidebar-logo">
                        <img className="home__sidebar-logo--img" src="/public/image.png" alt="" />
                    </div>
                    <ul className="home__sidebar-info">
                        <li className="home__sidebar-info--item home__sidebar-info--title">Group 2</li>
                        {userContent?.map((item, key) => (
                            <li className="home__sidebar-info--item home__sidebar-info--text" key={key}>
                                <p className="home__sidebar-info--text-label">{item.label}</p>
                                <p className="home__sidebar-info--text-pad">{item.value}</p>
                            </li>
                        ))}
                    </ul>

                    <button className="home__sidebar-button-logout" onClick={() => handleLogOut()}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        Sign out
                    </button>
                </article>

                <main className="home__main">
                    <header className="home__main-header">
                        <div className="home__main-header--icon">
                            <FontAwesomeIcon icon={faShieldAlt} />
                        </div>
                        <h1>Captcha Verification</h1>
                        <p>Please enter the encrypted captcha to continue</p>
                    </header>

                    <section className="home__main-captcha">
                        <h4>Captcha code</h4>
                        <figure>
                            <img src={challenge?.captcha_image} alt="Captcha code image" />
                        </figure>
                    </section>

                    <section className="home__main-form">
                        <div className="form-group"> 
                            <h4>Enter captcha code</h4>
                            <div>
                                <input 
                                    type="text" id="captchaInput" 
                                    name="captcha" 
                                    placeholder='Enter captcha code'
                                    value={captchaState.solution}
                                    onChange={(e) => setCaptchaState(prev => ({...prev, solution: e.target.value}))}
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button 
                                className='form-actions__verify form-actions__button' 
                                type="submit"
                                onClick={() => handleCaptchaVerification()}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                                Captcha Verification
                            </button>

                            <button 
                                className='form-actions__refresh form-actions__button' 
                                type="button"
                                onClick={() => fetchData()}
                            >
                                <FontAwesomeIcon icon={faRefresh} />
                                Create New Code
                            </button>
                        </div>
                    </section>

                    <section className="home__main-status">
                        <p className="status-message status-x" style={{display: status.message ? 'block' : 'none'}}>
                            Please enter the captcha code!
                        </p>
                        <p className="status-success status-x" style={{display: status.verify ? 'block' : 'none'}}>
                            Authentication successful!
                        </p>
                        <p className="status-message status-x" style={{display: status.verify_fail ? 'block' : 'none'}}>
                            Incorrect captcha code!
                        </p>
                    </section>

                    <hr />

                    <footer className="home__main-footer">
                        <p>Number of solutions remaining: {remaining}</p>
                    </footer>
                </main>
            </div>
        </>
    );
}
