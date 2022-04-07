// Component that goes through the record and print each value in the object

function RecordItem({ records }) {
	return (
		<div className='records'>
			<span>
				<p className='record'>Name:</p>
				<p className='record-value'>{records.name}</p>
			</span>
			<span>
				<p className='record'>Age:</p>
				<p className='record-value'>{records.age}</p>
			</span>
			<span>
				<p className='record'>Height:</p>
				<p className='record-value'>{records.height}</p>
			</span>
			<span>
				<p className='record'>Weight:</p>
				<p className='record-value'>{records.weight}</p>
			</span>
		</div>
	)
}
export default RecordItem
