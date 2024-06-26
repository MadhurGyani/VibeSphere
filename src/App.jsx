import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import SigninForm from './_auth/SigninForm'

function App() {

  return (
    <>
    <main className='h-screen flex'>
      <Routes>
        {/* public routes */}
        <Route path='/sign-in' element={<SigninForm/>}/>

        {/* private routes */}
        

      </Routes>
    </main>
    </>
  )
}

export default App
