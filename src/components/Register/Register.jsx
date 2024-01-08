import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth, registerWithEmailAndPassword} from '../../services/AuthServices'

const Register = () => {
    const [formData, setFormData] = useState({})

    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)

        await registerWithEmailAndPassword(formData.name, formData.email, formData.password)
    }

    useEffect(() => {
        if (loading) return
        if (user) navigate('/works')
    }, [user, loading])
    
    

    return (
        <div className="container">
            <h2 className="mt-3 text-center">
                Registruokis
            </h2>

            <form className="form" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input onChange={handleChange} name="name" type="text" className="form-control" placeholder="Jusu vardas" />
                </div>
                <div className="mb-3">
                    <input onChange={handleChange} name="email" type="email" className="form-control" placeholder="Jusu emailas" />
                </div>
                <div className="mb-3">
                    <input onChange={handleChange} name="password" type="password" className="form-control" placeholder="Slaptazodis" />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" type="submit">Registruotis</button>
                </div>
                <div>
                    <p>Turite pasyra? <Link to="/">Galite prisijungti</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Register