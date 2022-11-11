import { createSlice } from "@reduxjs/toolkit";

const reservationLayoutSlice = createSlice({
  name: "reservations",
  initialState: {
    disabled: [],
    disabledSmall: {},
    tableCombinations: [],
    selected: [],
    loading: false,
    error: false,
  },
  reducers: {
    disabledAction: (state, action) => {
      const { newDisabled } = action.payload;
      state.disabled = newDisabled;
    },
    selectedAction: (state, action) => {
      const { newSelected } = action.payload;
      state.selected = newSelected;
    },
    disableSmallTablesAction: (state, action) => {
      const { newdisableSmallTables } = action.payload;
      state.disabledSmall = newdisableSmallTables;
    },
    tableCombinationsAction: (state, action) => {
      const { newTableCombinations } = action.payload;
      state.tableCombinations = newTableCombinations;
    },
  },
});
export const {
  disabledAction,
  tableCombinationsAction,
  selectedAction,
  disableSmallTablesAction,
} = reservationLayoutSlice.actions;
export default reservationLayoutSlice.reducer;
