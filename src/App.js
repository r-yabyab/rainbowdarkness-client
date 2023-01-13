import './App.css';
import React, { useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { TopNav } from './components/TopNav';
import { Routes, Route } from 'react-router-dom'
import Darkness from './components/Darkness';
import { BottomHeader } from './components/BottomHeader';

export function App() {

useEffect (() => {
  document.title = 'Rainbow Darkness';
}, [])

  return (
    <>
    <TopNav />

      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/darkness' element={<Darkness />} />
      </Routes>

<BottomHeader />
    </>
  )
}

