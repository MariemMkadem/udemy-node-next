import { useState } from "react";
import axios from 'axios';

const Register = () => {

    const [name, setName] = useState('mariem')
    const [email, setEmail] = useState('mariem.mkadem@outlook.com')
    const [password, setPassword] = useState('mariem')


    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.table({ name, email, password })
        const {data} = await axios.post(`http://localhost:8000/api/register`, {
            name, 
            email,
            password
        })
        console.log('data', data)


    }
    return (
        <>
            <h1 className='jumbotron text-center bg-primary square'> Register </h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        className="form-control mb-4 p-4"
                        value={name}
                        placeholder='Enter Name'
                        onChange={e => setName(e.target.value)}
                        required
                    />

                    <input type="text"
                        className="form-control mb-4 p-4"
                        value={email}
                        placeholder='Enter Email'
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <input type="text"
                        className="form-control mb-4 p-4"
                        value={password}
                        placeholder='Enter Password'
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-block btn-primary">Submit </button>
                </form>

            </div>
        </>
    )
}

export default Register;