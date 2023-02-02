import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isOpen: 'false',
  mode: ''
}
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers:{
    showModal: (state) => {
      state.isOpen = "true"
    },
    closeModal: (state) => {
      state.isOpen = "false"
    },
    changeMode: (state, action) => {
      state.mode = action.payload
    }
  }
})

export const { showModal, closeModal, changeMode } = modalSlice.actions
export default modalSlice
