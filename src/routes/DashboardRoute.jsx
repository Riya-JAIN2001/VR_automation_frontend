import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import Header from '../components/Header'

function DashboardRoute() {
  return (
    <>
    <Header/>
    <Dashboard/>
    </>
  )
}

export default DashboardRoute