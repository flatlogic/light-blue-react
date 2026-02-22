import { createSlice } from '@reduxjs/toolkit';
import { RECEIVED_DATA_SUCCESS, RECEIVING_DATA } from '../actions/analytics';

const defaultState = {
    visits: {},
    performance: {},
    server: {},
    revenue: [],
    mainChart: [],
    isReceiving: false
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: defaultState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(RECEIVED_DATA_SUCCESS, (state, action) => {
        const {
          visits,
          performance,
          server,
          revenue,
          mainChart,
        } = action.payload;
        state.visits = visits;
        state.performance = performance;
        state.server = server;
        state.revenue = revenue;
        state.mainChart = mainChart;
        state.isReceiving = false;
      })
      .addCase(RECEIVING_DATA, (state) => {
        state.isReceiving = true;
      });
  },
});

export default analyticsSlice.reducer;
