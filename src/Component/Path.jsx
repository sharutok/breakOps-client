import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Dashboard from './Dashboard';
import Settings from './Settings';



export default function Path() {
    return (
        <>
            <div className=''>
                <Router>
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/settings' element={<Settings />} />
                    </Routes>
                </Router>
            </div>

        </>
    )
}
