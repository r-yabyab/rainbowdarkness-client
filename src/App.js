import './App.css';
import React from 'react';
import { HomePage } from './components/HomePage';
import { TopNav } from './components/TopNav';
import { Routes, Route } from 'react-router-dom'
import Darkness from './components/Darkness';
import { BottomHeader } from './components/BottomHeader';
import { ButtonJs } from './components/ButtonJs';
import { Rainbow2 } from './components/Rainbow2';
import { Rainbow3 } from './components/Rainbow3';

export function App() {
  return (
    <>
    <TopNav />

      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/darkness' element={<Darkness />} />
        <Route path='/rainbow2' element={<Rainbow2 />} />
        <Route path='/rainbow3' element={<Rainbow3 />} />
      </Routes>

<BottomHeader />
    </>
  )
}

