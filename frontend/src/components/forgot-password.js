import React, {useRef, useState} from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/auth";
import { Link } from "react-router-dom"
export default function ForgotPassword() {
    const emailRef = useRef();

    const { resetPassword } = useAuth();
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            setError("");
            setMessage("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for reseting password")
        } catch(err) {
            setError("Failed to reset password");
        }
        setLoading(false);
    }
    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4"> Password Reset </h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                      
                        <br></br>
                        <Button disable={loading} className="w-100" type="submit">
                            Reset Password
                        </Button> 
                    </Form>
                <div className="w-100 text-center mt-2">   
                    <Link to="/login">Login</Link>
                </div> 
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>

    )
}