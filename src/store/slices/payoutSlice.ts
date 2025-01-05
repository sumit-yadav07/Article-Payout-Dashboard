import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PayoutState {
  globalPayoutRate: number;
}

const initialState: PayoutState = {
  globalPayoutRate: 100,
};

const payoutSlice = createSlice({
  name: 'payout',
  initialState,
  reducers: {
    setGlobalPayoutRate: (state, action: PayloadAction<number>) => {
      state.globalPayoutRate = action.payload;
    },
  },
});

export const { setGlobalPayoutRate } = payoutSlice.actions;
export default payoutSlice.reducer;