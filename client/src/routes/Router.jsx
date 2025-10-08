import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Dashboard from '../pages/Sdownloader'
import Navbar from '../components/Navbar'

const NavRouter = () => {
    const router = createBrowserRouter(
        [
            {
                path: '/', element: <div>
                    <Navbar />
                    {/* <Home /> */}
                </div>
            },
            {
                path: '/about', element: <div>
                    <Navbar />
                    <About />
                </div>
            },
            {
                path: '/dashboard', element: <div>
                    <Navbar />
                    <Dashboard />
                </div>
            }

        ]

    )
    return (
        <>
            <RouterProvider router={router} />

        </>
    )
}

export default NavRouter