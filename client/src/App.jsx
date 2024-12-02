/* eslint-disable react/no-unknown-property */
import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const apiCall = () => {
    axios.get('http://localhost:8088')
    .then((data) => {
      console.log("button clicked!");
      
      console.log(data)
    })
  }
  return (
    <>
      <button className='btn' style={{background: "green", color: "white"}} onClick={apiCall}>Make API Call</button>
    </>
  )
}

export default App
