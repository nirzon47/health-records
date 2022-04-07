import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import recordsService from './recordsService'

const initialState = {
	records: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}

// Create new records
export const createRecord = createAsyncThunk(
	'records/create',
	async (recordData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			return await recordsService.createRecord(recordData, token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Get user records
export const getRecord = createAsyncThunk(
	'records/get',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			return await recordsService.getRecord(token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const recordsSlice = createSlice({
	name: 'records',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			// Extra reducers for createRecord
			.addCase(createRecord.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createRecord.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.records.push(action.payload)
			})
			.addCase(createRecord.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})

			// Extra reducers for getRecord
			.addCase(getRecord.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getRecord.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.records = action.payload
			})
			.addCase(getRecord.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	},
})

export const { reset } = recordsSlice.actions
export default recordsSlice.reducer
