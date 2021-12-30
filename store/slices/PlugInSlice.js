import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    placesInfo: [],
}

export const plugInSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
        setPlacesInfo: (state, action) => {
            state.placesInfo = action.payload;
        }

    }
})

export const { setOrigin, setDestination, setTravelTimeInformation, setPlacesInfo } = plugInSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;
export const selectPlacesInfo = (state) => state.nav.placesInfo;

export default plugInSlice.reducer;