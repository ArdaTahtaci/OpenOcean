import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '../pages/Main/MainPage'
import Create from '../pages/Create/Create'

export default function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/create' element={<Create />} />
            </Routes>
        </BrowserRouter>
    )
}
