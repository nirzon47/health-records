// Other imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Pages
import EditDetails from './pages/EditDetails'
import CheckBMI from './pages/CheckBMI'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import Details from './pages/Details'

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
						<Route path='/bmi' element={<CheckBMI />} />
					</Routes>
				</div>
			</Router>
			<ToastContainer toastStyle={{ backgroundColor: '#030303' }} />
		</>
	)
}

export default App
