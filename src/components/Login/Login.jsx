import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth, signInWithEmailAndPassword } from "../../services/AuthServices"
import { useAuthState } from "react-firebase-hooks/auth"

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })

    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(credentials)

        await signInWithEmailAndPassword(credentials.email, credentials.password)
    }

    useEffect(() => {
        if (loading) return
        if (user) navigate('/works')
    }, [user, loading])

    return (
        <div className="container">
            <h2 className="mt-3 text-center">
                Prisijungti
            </h2>

            <form className="form" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input onChange={handleChange} name="email" type="email" className="form-control" placeholder="Jusu emailas" />
                </div>
                <div className="mb-3">
                    <input onChange={handleChange} name="password" type="password" className="form-control" placeholder="Slaptazodis" />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" type="submit">Prisijungti</button>
                </div>
                <div>
                    <p>Neturite paskyros? <Link to="/register">Galite registruotis</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Login