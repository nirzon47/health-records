import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import Details from './pages/Details'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EditDetails from './pages/EditDetails'

function App() {
	return (
		<>
			<Router>
				<div className='container'>
					<Header />

					<Routes>
						<Route path='/' element={<Dashboard />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/details' element={<Details />} />
						<Route path='/edit-details' element={<EditDetails />} />
					</Routes>
				</div>
			</Router>
			<ToastContainer toastStyle={{ backgroundColor: '#030303' }} />
		</>
	)
}

export default App
