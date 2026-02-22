import { createSlice } from '@reduxjs/toolkit';
import {
  RECEIVED_PRODUCTS,
  RECEIVED_PRODUCT,
  UPDATED_PRODUCT,
  DELETED_PRODUCT,
  RECEIVING_PRODUCTS,
  RECEIVING_PRODUCT,
  UPDATING_PRODUCT,
  DELETING_PRODUCT,
  RECEIVED_IMAGES
} from '../actions/products';

const defaultState = {
    data: [],
    images: [],
    isReceiving: false,
    isUpdating: false,
    isDeleting: false,
    idToDelete: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState: defaultState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(RECEIVED_PRODUCTS, (state, action) => {
        state.data = action.payload;
        state.isReceiving = false;
      })
      .addCase(RECEIVED_PRODUCT, (state, action) => {
        state.data.push(action.payload);
        state.isReceiving = false;
      })
      .addCase(UPDATED_PRODUCT, (state, action) => {
        const index = state.data.findIndex((product) => product.id === action.payload.id);
        if (index >= 0) {
          state.data[index] = {
            ...state.data[index],
            ...action.payload,
          };
        }
        state.isUpdating = false;
      })
      .addCase(DELETED_PRODUCT, (state, action) => {
        const indexToDelete = state.data.findIndex((product) => product.id === action.payload.id);
        if (indexToDelete >= 0) {
          state.data.splice(indexToDelete, 1);
        }
        state.isDeleting = false;
        state.idToDelete = null;
      })
      .addCase(RECEIVING_PRODUCTS, (state) => {
        state.isReceiving = true;
      })
      .addCase(RECEIVING_PRODUCT, (state) => {
        state.isReceiving = true;
      })
      .addCase(UPDATING_PRODUCT, (state) => {
        state.isUpdating = true;
      })
      .addCase(DELETING_PRODUCT, (state, action) => {
        state.isDeleting = true;
        state.idToDelete = action.payload.id;
      })
      .addCase(RECEIVED_IMAGES, (state, action) => {
        state.images = action.payload;
      });
  },
});

export default productsSlice.reducer;
