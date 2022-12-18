import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function SecureLogin(){
    const history = useHistory()

    async function handleRegister(e){
        e.preventDefault()

        const form = e.target
        const user = {
            email: form[0].value,
            email: form[1].value,
        }

        fetch('/secureLogin',{
            method:'POST',
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify(user)
        })
    }

    useEffect(()=>{
        fetch('/isUserAuth',{
            headers:{
                'x-access-token': localStorage.getItem('token')
            }
        })
        .then(res = res.json())
        .then(data => data.isLoggedIn ? history.push('/dashboard'): null)
    },[])
    return(
        <form onSubmit={event => handleRegister(event)}>
            <input required type='email'/>
            <input required type='password'/>
            <input required type='submit' value='Register'/>
        </form>
    )
}