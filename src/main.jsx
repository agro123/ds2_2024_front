/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainRouter from './routes'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<MainRouter />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
