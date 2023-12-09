import {   createSlice } from "@reduxjs/toolkit";


const initialState= {
    language : "EN",
    favorates : [],
}

const globalSlice = createSlice({
    name :"global",
    initialState, 
    reducers : {
        changeLanguage : (state) =>{
            if(state.language === "EN")
                state.language= "AR"
            else
                state.language = "EN"
        },
        addToFavorates : (state,action) =>{
            console.log(action)
            state.favorates[action.payload] = true
        },
        removeFromFavorates : (state,action )=>{
            console.log(action)
            delete state.favorates[action.payload]
        }
    },

});


export const {addToFavorates, removeFromFavorates,changeLanguage} = globalSlice.actions ;

export default globalSlice.reducer;