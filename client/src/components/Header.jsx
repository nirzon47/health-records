// Header component of the app

// Icons for the tabs
import {
	FaSignInAlt,
	FaSignOutAlt,
	FaUser,
	FaPenAlt,
	FaCalculator,
} from 'react-icons/fa'

// Other imports
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

function Header() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.auth)
	const { records } = useSelector((state) => state.records)

	const onLogout = () => {
		dispatch(logout())
		dispatch(reset())
		navigate('/')
	}

	return (
		<header className='header'>
			<div className='logo'>
				<Link to='/'>Health Records</Link>
			</div>
			<ul>
				{user ? (
					<>
						{records.length > 0 ? (
							<>
								{/* If user exists and there is a record, show Check BMI, Edit Details and Logout tabs */}
								<li>
									<Link to='/bmi'>
										<FaCalculator /> Check BMI
									</Link>
								</li>
								<li>
									<Link to='/edit-details'>
										<FaPenAlt /> Edit Details
									</Link>
								</li>
								<li>
									<button className='btn' onClick={onLogout}>
										<FaSignOutAlt /> Logout
									</button>
								</li>
							</>
						) : (
							<>
								{/* If user exists and there is NO record, show Enter Details and Logout tabs */}
								<li>
									<Link to='/details'>
										<FaPenAlt /> Enter Details
									</Link>
								</li>
								<li>
									<button className='btn' onClick={onLogout}>
										<FaSignOutAlt /> Logout
									</button>
								</li>
							</>
						)}
					</>
				) : (
					<>
						{/* If user does not exist, show log in and sign up tabs */}
						<li>
							<Link to='/login'>
								<FaSignInAlt /> Login
							</Link>
						</li>
						<li>
							<Link to='/register'>
								<FaUser /> Sign Up
							</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	)
}
export default Header
