// Form for entering user details

import { useEffect, useState } from 'react'
import { FaPenAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createRecord } from '../features/records/recordsSlice'

function Details() {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.auth)
	const records = useSelector((state) => state.records)
	const navigate = useNavigate()

	const [formData, setformData] = useState({
		name: '',
		height: '',
		weight: '',
		age: '',
	})

	const { name, height, weight, age } = formData

	const onChange = (e) => {
		setformData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}

		if (records.length > 0) {
			navigate('/')
		}
	}, [user, navigate, dispatch, records])

	const onSubmit = (e) => {
		e.preventDefault()

		dispatch(createRecord({ name, height, weight, age }))
		navigate('/')
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaPenAlt /> Enter details
				</h1>
				<p>Please enter your details</p>
			</section>
			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							value={name}
							placeholder='Enter your name'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='number'
							className='form-control'
							id='height'
							name='height'
							value={height}
							placeholder='Enter your height in centimetres'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='number'
							className='form-control'
							id='weight'
							name='weight'
							value={weight}
							placeholder='Enter your weight in kilograms'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='number'
							className='form-control'
							id='age'
							name='age'
							value={age}
							placeholder='Enter your age'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<button type='submit' className='btn btn-block'>
							Submit
						</button>
					</div>
				</form>
			</section>
		</>
	)
}
export default Details
