import React, {useRef, useState} from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/auth";
import { Link, useNavigate } from "react-router-dom"
export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const { login } = useAuth();
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch(err) {
            setError("Failed to sign in");
        }
        setLoading(false);
    }
    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4"> Login </h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id = "password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>    
                        <br></br>
                        <Button disable={loading} className="w-100" type="submit">
                            Log In
                        </Button> 
                    </Form>
                <div className="w-100 text-center mt-2">   
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div> 
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>

    )
}