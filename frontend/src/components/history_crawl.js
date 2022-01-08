import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, Image } from "react-bootstrap";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)
export default function HistoryCrawl(){
    const location = useLocation();
    const {result} = location.state;

    return (
        <div>
        {Object.keys(result).length !== 0? (
        <div>
            <Card >
                 
            <Card.Body>
                    <h2 className="text-center mb-4"> History Crawled Result </h2>
                    <div className="w-100 text-center mt-2">   
                        <Link to="/" className="btn btn-primary w-100 mt-3">Back to Crawl</Link>
                    </div> 
                    <br></br>
                    <strong>Crawled Time: </strong>{dayjs(result.createdAt).fromNow()} <br/>
                    <strong>Title: </strong>{result.title} <br/>
                    <strong>Redirected Links: </strong> 
                    <ul>
                        {result.hrefs.map((v, i) => {
                           return (<li key={`links-${i}`}><a href={v}/>{v}</li>)
                        })}
                    </ul>
                    {result.images.length === 0 ? 
                    <div> No images found</div>
                     : <div>
                         <strong>Images Found:</strong>
                         <ul>
                        {result.images.map((v, i) => {
                           return <li key={`links-${i}`}><Image src={v} rounded></Image></li>
                        })}
                    </ul>
                       </div>}

                </Card.Body>

            </Card>
        </div>
        ) :
            <div>
                Loading Result...
            </div>
            
        }
                
        </div>
    )
}