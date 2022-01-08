import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useAuth } from "../contexts/auth";
import WebCrawlerDataService from "../service/web-crawl-service";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

export default function Crawl(){
    const [userHistory, setUserHistory] = useState({});
    
    const [searchParams, setSearchParams] = useSearchParams();
    const {currentUser} = useAuth();
    const getUserHistory = async () => {
        let result = await WebCrawlerDataService.getUserHistory(currentUser._delegate.email);
        setUserHistory(result);
    }

    const deleteHistory = async (obj, i) => {
        console.log(obj._id)
        console.log( currentUser._delegate.email)
        await WebCrawlerDataService.deleteUserHistory(obj._id, currentUser._delegate.email)
        let result = await WebCrawlerDataService.getUserHistory(currentUser._delegate.email);
        setUserHistory(result)  
    }
    useEffect(() => {
        getUserHistory()
    },[])

    return (
        <div>
            {Object.keys(userHistory).length !== 0? (
                <div>
                    {userHistory.data[0]? (
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Crawled Link</th>
                                <th>Last Time</th>
                                <th>Crawled Result</th>
                                <th>Delete History</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userHistory.data.map((v,i) => {
                                return(
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{v.url}</td>
                                    <td>{dayjs(v.createdAt).fromNow()}</td>
                                    <td><Link to="/history-crawl" state={{result: v}}>history</Link></td>
                                    <td>
                                        <Button onClick={()=> {
                                            deleteHistory(v,i)
                                        }}>
                                          delete  
                                        </Button>
                                    </td>
                                </tr>
                                )
                                 
                            })}
                            
                            </tbody>
                            
                        </Table>)     
                    : (
                        <div>
                            No History found
                        </div>
                    )
                }
                </div>)
                : (
                <div>
                    Loading Result...
                </div>)}
                <Link to="/" className="btn btn-primary w-100 mt-3">Back to Crawl</Link>

         </div>
    )  
}