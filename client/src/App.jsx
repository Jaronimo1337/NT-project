import Main from './components/Main.jsx'
import AdminPage from './components/Admin/AdminPage.jsx'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='w-[100%] p-0 m-0'>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App