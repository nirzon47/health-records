// Page that shows the BMI of the user if the details are entered accordingly

import { FaCalculator } from 'react-icons/fa'
import { useSelector } from 'react-redux'

function CheckBMI() {
	const { bmi } = useSelector((state) => state.records.records[0])
	const bmiPrecise = bmi.toPrecision(4)
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
				<h2>{bmiPrecise}</h2>
				<br />
				<p>You are {feedback}</p>
			</section>
		</>
	)
}
export default CheckBMI
