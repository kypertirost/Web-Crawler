import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Crawl from "./crawl.js";
import Signup from "./signup.js";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/auth.js";
import Dashboard from "./dashboard.js";
import Login from "./login.js";
import PrivateRoute from "./PrivateRoute.js";
import ForgotPassword from "./forgot-password.js";

function App() {
  return (
    
      <Container 
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh"}}>
        <div className="w-100" style={{ maxWidth: "400px"}}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path = "/" element={
                <PrivateRoute>
                  <Dashboard/>
                </PrivateRoute>
                }/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                {/* <Route path="/history" element={<Crawl/>}/> */}
                <Route path="/crawl" element={<Crawl/>}/>

              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    
    // <div className="App">
    //  <label for="url">Enter an https:// URL:</label>

    // <div>
    //   <input type="url" name="url" id="url"
    //         placeholder="https://example.com"
    //         pattern="http(|s)://.*" size="30"
    //         required></input>

    //   <input class="favorite styled"  
    //         type="button"
    //         value="Submit">
    //         {/* <Link to={"/crawl"} className="nav-link">
    //         </Link> */}
    //         </input>

    // </div>

    // <div className="container mt-3">
    //   <Routes>
    //     <Route path={"/crawl"} element={<Crawl />} />

    //     {/* <Route 
    //       path="/login"
    //       element = {<Login login ={login}/>}
    //     /> */}
    //   </Routes>
    //   </div> 
    // </div>

    
  );
}

export default App;
