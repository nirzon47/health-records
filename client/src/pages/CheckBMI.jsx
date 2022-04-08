// Page that shows the BMI of the user if the details are entered accordingly

import { FaCalculator } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

function CheckBMI() {
	const navigate = useNavigate()

	const { records } = useSelector((state) => state.records)
	const bmi = records[0] && records[0].bmi
	let bmiPrecise

	if (bmi) {
		bmiPrecise = bmi.toPrecision(4)
	} else {
		navigate('/')
	}
	let feedback = ''

	// Checks in which category the user falls in
	if (bmiPrecise < 18.5) {
		feedback = 'Underweight'
	} else if (bmiPrecise >= 18.5 && bmiPrecise < 25) {
		feedback = 'Healthy'
	} else if (bmiPrecise >= 25 && bmiPrecise < 30) {
		feedback = 'Overweight'
	} else if (bmiPrecise >= 30) {
		feedback = 'Obese'
	}

	return (
		<>
			<section className='heading'>
				<br />
				<br />
				<h1>
					<FaCalculator /> BMI
				</h1>
				<p>Your BMI goes here</p>
				<br />
				<h2>{bmiPrecise !== 0 && bmiPrecise}</h2>
				<br />
				<p>You are {feedback}</p>
			</section>
			<p className='pnavigate'>
				In case there are errors, go back to <Link to='/'>Dashboard</Link>
			</p>
		</>
	)
}
export default CheckBMI
