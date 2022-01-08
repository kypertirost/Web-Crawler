import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, Image } from "react-bootstrap";
import { Buffer } from 'buffer';
import { useAuth } from "../contexts/auth";
import WebCrawlerDataService from "../service/web-crawl-service";
export default function Crawl(){
    const [crawledObj, setCrawledObj] = useState({});
    
    const [searchParams, setSearchParams] = useSearchParams();
    const {currentUser} = useAuth();
    const getCrawlResult = async () => {
        const url = searchParams.get("link");
        const decodedURL = Buffer.from(url, 'base64').toString()
        console.log(decodedURL);
        let result = await WebCrawlerDataService.crawl(decodedURL);
        setCrawledObj(result);
        await WebCrawlerDataService.postUserHistory(
            currentUser._delegate.email,
            result.data.url,
            result.data.title,
            result.data.hrefs,
            result.data.images
        )
    }
    useEffect(() => {
        getCrawlResult()
    },[])


    return (
        <div>
        {Object.keys(crawledObj).length !== 0? (
        <div>
            <Card >
                 
            <Card.Body>
                    <h2 className="text-center mb-4"> Crawled Result </h2>
                    <div className="w-100 text-center mt-2">   
                        <Link to="/" className="btn btn-primary w-100 mt-3">Back to Crawl</Link>
                    </div> 
                    <br></br>
                    <strong>Title: </strong>{crawledObj.data.title} <br/>
                    <strong>Redirected Links: </strong> 
                    <ul>
                        {crawledObj.data.hrefs.map((v, i) => {
                           return (<li key={`links-${i}`}><a href={v}/>{v}</li>)
                        })}
                    </ul>
                    {crawledObj.data.images.length === 0 ? 
                    <div> No images found</div>
                     : <div>
                         <strong>Images Found:</strong>
                         <ul>
                        {crawledObj.data.images.map((v, i) => {
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