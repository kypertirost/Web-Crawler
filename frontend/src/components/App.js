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
import History from "./history.js";
import HistoryCrawl from "./history_crawl.js";
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
                <Route path="/crawl" element={
                  <PrivateRoute>
                    <Crawl/>
                  </PrivateRoute>
                }/>
                <Route path="/history" element= {
                  <PrivateRoute>
                    <History/>
                  </PrivateRoute>
                }/>
                <Route path="/history-crawl" element= {
                  <PrivateRoute>
                    <HistoryCrawl/>
                  </PrivateRoute>
                }/>
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    
  );
}

export default App;
