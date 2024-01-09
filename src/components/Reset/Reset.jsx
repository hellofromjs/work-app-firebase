import { Link, useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"
import { auth, sendPasswordReset } from "../../services/AuthServices"

const Reset = () => {
    const [email, setEmail] = useState('')
    const [user, loading, error] = useAuthState(auth)

    const handleSubmit = (e) => {
        e.preventDefault()
        sendPasswordReset(email)

    }
    return (
        <div className="container">
            <h2 className="mt-3 text-center">
                Atstatykite slaptazodi
            </h2>

            <form className="form" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input onChange={ (e) => setEmail(e.target.value) } value={email} type="email" className="form-control" placeholder="Jusu emailas" />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" type="submit">Siusti</button>
                </div>
            </form>
        </div>
    )
}

export default Reset