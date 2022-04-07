// Form for editing existing records

import { useState } from 'react'
import { FaPenAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { editRecord } from '../features/records/recordsSlice'

function EditDetails() {
	const dispatch = useDispatch()

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

	const onSubmit = (e) => {
		e.preventDefault()
		dispatch(editRecord(formData))
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaPenAlt /> Edit details
				</h1>
				<p>All fields are required</p>
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
							placeholder='Enter your name *'
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
							placeholder='Enter your height in centimetres *'
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
							placeholder='Enter your weight in kilograms *'
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
							placeholder='Enter your age *'
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
export default EditDetails
