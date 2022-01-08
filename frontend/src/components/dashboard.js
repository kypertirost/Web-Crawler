import React, {useRef, useState} from "react";
import { Card, Button, Alert, Form } from "react-bootstrap";
import { useAuth } from "../contexts/auth";
import { Link, useNavigate } from "react-router-dom";
import {Buffer} from 'buffer';
export default function Dashboard(){
    const urlRef = useRef();
    const [ error, setError ] = useState("");
    const { currentUser, logout} = useAuth(); 
    console.log(currentUser);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async ()=> {
        setError("")
        try{ 
            await logout();
            navigate("/login");
        } catch(err) {
            setError("Failed to log out");
        }
    }

    const handleCrawlUrl = async (e) => {
        e.preventDefault();
        setLoading(true);

        const url = urlRef.current.value;
        const encodedLink = Buffer.from(url).toString('base64')
        setLoading(false);
        navigate(`/crawl?link=${encodedLink}`);
    }
    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4"> Web Crawling </h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleCrawlUrl}>
                        <div className="input-group mb-3">
                        <Form.Control type="url" className="form-control" placeholder="http://example.com" aria-label="http://example.com" aria-describedby="basic-addon2" ref={urlRef} required/>  
                        <div className="pull-left">
                            <Button type="submit">Crawl!</Button>
                        </div>
                        </div>
                    </Form>

                    <Link to="/history" className="btn btn-primary w-100 mt-3">Crawl History</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                 <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </div>
    )
}