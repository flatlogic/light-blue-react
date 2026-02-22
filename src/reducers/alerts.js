import { createSlice } from '@reduxjs/toolkit';
import { DISMISS_ALERT } from '../actions/alerts';

const defaultState = {
  alertsList: [
    {
      id: 0,
      title: 'Sales Report',
      value: 65,
      color: 'primary',
      footer: 'Calculating x-axis bias... 65%',
    },
    {
      id: 1,
      title: 'Personal Responsibility',
      value: 23,
      color: 'danger',
      footer: 'Provide required notes',
    },
  ],
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState: defaultState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(DISMISS_ALERT, (state, action) => {
      const index = state.alertsList.findIndex((alert) => alert.id === action.id);
      if (index >= 0) {
        state.alertsList.splice(index, 1);
      }
    });
  },
});

export default alertsSlice.reducer;
