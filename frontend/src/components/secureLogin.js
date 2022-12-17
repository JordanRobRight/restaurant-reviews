import { useState } from "react"

const SecureLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');

    const handleSubmit = async ()=> {
       // e.preventDefault()

        
    }

    return(
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>

            <label>Email:</label>
            <input
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email} 
            />

            <label>Password:</label>
            <input
                type='password'
                onChange={(e) => setPasword(e.target.value)}
                value={password} 
            />
                
            <button>
                Login
            </button>    
            

        </form>
    )

}

export default SecureLogin

