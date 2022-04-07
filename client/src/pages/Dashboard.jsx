import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getRecord, reset } from '../features/records/recordsSlice'
import RecordItem from '../components/RecordItem'

function Dashboard() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { user } = useSelector((state) => state.auth)
	const { records, isLoading, isError, message } = useSelector(
		(state) => state.records
	)

	useEffect(() => {
		if (isError) {
			console.log(message)
		}

		if (!user) {
			navigate('/login')
		}

		dispatch(getRecord())

		return () => {
			dispatch(reset)
		}
	}, [user, navigate, isError, message, dispatch])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<section className='heading'>
				<section className='content'>
					{records[0] ? (
						<>
							<h1>Welcome {records[0].name}</h1>
							<p>Your records are here</p>
							<RecordItem key={records._id} records={records[0]} />
						</>
					) : (
						<>
							<h1>Welcome {user && user.email}</h1>
							<p>There are no records, please enter your details first</p>
							<Link to='/details' className='pnavigate'>
								<p> Click here</p>
							</Link>
						</>
					)}
				</section>
			</section>
		</>
	)
}
export default Dashboard
