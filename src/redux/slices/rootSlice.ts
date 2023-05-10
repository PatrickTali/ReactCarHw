import { createSlice } from '@reduxjs/toolkit';

export interface CarState {
    make: string,
    model: string,
    price: number,
    year: number,
    vin: string,
    
}

const initialState: CarState = {
    make: 'Nissan',
    model: '',
    price: 0,
    year: 2023,
    vin: '',
   
}

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        chooseMake: (state, action) => { state.make = action.payload },
        chooseModel: (state, action) => { state.model = action.payload },
        choosePrice: (state, action) => { state.price = action.payload },
        chooseYear: (state, action) => { state.year = action.payload },
        chooseVin: (state, action) => { state.vin = action.payload },

}})


export const reducer = rootSlice.reducer;
export const {
    chooseMake,
    chooseModel,
    choosePrice,
    chooseYear,
    chooseVin,
} = rootSlice.actions;