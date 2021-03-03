import {useState} from 'react';
import axios from 'axios';

const projectID = 'd3ad1d9d-ca3b-4a31-935f-0cdf53586cf2';

const Modal = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [signUpUsername, setSignupUsername] = useState('');
    const [signUpPassword, setSignupPassword] = useState('');
    const [signUpPassword2, setSignupPassword2] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [signupError, setSignupError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = {'Project-ID': projectID, 'User-Name': username, 'User-Secret': password};

        try {
            await axios.get('https://api.chatengine.io/chats', {headers: authObject});

            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();
            setLoginError('');
        } catch (err) {
            setLoginError('Oops, incorrect credentials.');
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        const data = { 'username': signUpUsername, 'secret': signUpPassword, 'first_name': firstName, 'last_name': lastName };
        const config = { headers: { "Private-Key": 'ef613416-6bf8-42d9-bd0e-dc6af585f8e3' } };

        try{
            await axios.post('https://api.chatengine.io/projects/people/', data, config);
            setLoginError('Account Created');
            window.location.reload();
        }catch (err){
            setSignupError('Oops, Something Went Wrong');
        }
    }

    const signupStyle = {
        marginLeft: "100px"
    }

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input"
                           placeholder="Username" required/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                           className="input" placeholder="Password" required/>
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Start chatting</span>
                        </button>
                    </div>
                </form>
                <h1>{loginError}</h1>
            </div>
            <div className="form" style={signupStyle}>
                <h1 className="title">Sign Up</h1>
                <form onSubmit={handleSignupSubmit}>
                    <input type="text" value={signUpUsername} onChange={(e) => setSignupUsername(e.target.value)}
                           className="input" placeholder="Username" required/>
                    <input type="password" value={signUpPassword} onChange={(e) => setSignupPassword(e.target.value)}
                           className="input" placeholder="Password" required/>
                    <input type="password" value={signUpPassword2} onChange={(e) => setSignupPassword2(e.target.value)}
                           className="input" placeholder="Confirm Password" required/>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                           className="input" placeholder="First Name" required/>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input"
                           placeholder="Last Name" required/>
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Make Account</span>
                        </button>
                    </div>
                </form>
                <h1>{signupError}</h1>
            </div>
        </div>

    );
};

export default Modal;
