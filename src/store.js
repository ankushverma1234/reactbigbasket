import { configureStore, createSlice } from '@reduxjs/toolkit';

// Product Slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    veg: [
      { name: 'Tomato', price: 50, image: '/vegimages/potato.jpg' },
      { name: 'Potato', price: 40, image: '/vegimages/tomato.jpg' },
      { name: 'Brinjal', price: 30, image: '/vegimages/brinjal.jpg' },
      { name: 'Broccoli', price: 50, image: '/vegimages/broccoli.jpg' },
      { name: 'Cauliflower', price: 40, image: '/vegimages/cauliflower.jpg' },
      { name: 'Cluster beans', price: 35, image: '/vegimages/cluster beans.jpg' },
      { name: 'Green beans', price: 35, image: '/vegimages/green beans.jpg' },
      { name: 'Ladies finger', price: 30, image: '/vegimages/ladies finger.jpg' },
      { name: 'Peas', price: 40, image: '/vegimages/peas.jpg' },
      { name: 'Cabbage', price: 30, image: '/vegimages/Cabbage.jpg' },
      { name: 'Green Chilli', price: 30, image: '/vegimages/Green chilli.jpg' },
      { name: 'Capsicum', price: 60, image: '/vegimages/capsicum.jpg' },
      { name: 'Turnip', price: 70, image: '/vegimages/Turnip.jpg' },
      { name: 'Bitter Gaurd', price: 75, image: '/vegimages/Bitter Gaurd.jpg' },
      { name: 'White Raddish', price: 40, image: '/vegimages/white raddish.jpg' }
    ],
    nonveg: [
      { name: 'Chicken Lollipop', price: 150, image: '/nonveg/chicken lolipop.jpg' },
      { name: 'Chicken Pakoda', price: 100, image: '/nonveg/chicken pakoda.jpg' },
      { name: 'Chicken Tikka Masala', price: 140.65, image: '/nonveg/chicken tikka masala.jpg' },
      { name: 'Chilli Chicken', price: 125, image: '/nonveg/chilli chicken.jpg' },
      { name: 'Crab Curry', price: 150, image: '/nonveg/crab curry.jpg' },
      { name: 'Fish Biryani', price: 130, image: '/nonveg/fish biryani.jpg' },
      { name: 'Fish Curry', price: 150, image: '/nonveg/Fish Curry.jpg' },
      { name: 'Mutton Curry', price: 140, image: '/nonveg/mutton curry.jpg' }
    ],
    milk: [
      { name: 'Butter Milk', price: 30, image: '/milk/butter milk.jpg' },
      { name: 'Butter', price: 40, image: '/milk/butter.jpg' },
      { name: 'Cheese', price: 50, image: '/milk/cheese.jpg' },
      { name: 'Curd', price: 60, image: '/milk/curd.jpg' },
      { name: 'Custered', price: 70, image: '/milk/custered.jpg' },
      { name: 'Ghee', price: 120, image: '/milk/ghee.jpg' },
      { name: 'Lassi', price: 50, image: '/milk/lassi.jpg' },
      { name: 'Milk powder', price: 600.54, image: '/milk/milk powder.jpg' },
      { name: 'Paneer', price: 160, image: '/milk/paneer.jpg' },
      { name: 'Rasgulla', price: 120, image: '/milk/rasgulla.jpg' }
    ],
    chocolate: [
      { name: '5Star', price: 20, image: '/chocolate/5star.jpg' },
      { name: 'Amul Chocolate', price: 80, image: '/chocolate/amul chocolate.jpg' },
      { name: 'Cadburry Dairymilk', price: 100, image: '/chocolate/cadburry dairymilk.jpg' },
      { name: 'Chocolove Chocolate', price: 50, image: '/chocolate/chocolove chocolate.jpg' },
      { name: 'Harshey', price: 100, image: '/chocolate/harshey.jpg' },
      { name: 'Mars', price: 60, image: '/chocolate/mars.jpg' },
      { name: 'Nestle Chocolate', price: 20, image: '/chocolate/nestle chocolate.jpg' },
      { name: 'Snickers', price: 50, image: '/chocolate/snickers.jpg' }
    ]
  },
  reducers: {}
});

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          return state.filter(i => i.name !== action.payload.name);
        }
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(i => i.name !== action.payload.name);
    },

    // ✅✅✅ ADDED THIS FUNCTION TO FIX THE ERROR
    clearCart: () => []
  }
});

// Order Slice
const orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    }
  }
});

// ✅ Export order actions
export const { addOrder } = orderSlice.actions;

// ✅ Export cart actions
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart // ✅✅✅ ADDED THIS EXPORT
} = cartSlice.actions;

// ✅ Cart selector
export const selectCartCount = (state) => {
  return state.cart.reduce((total, item) => total + item.quantity, 0);
};

// ✅ Store Configuration
const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer
  }
});

export default store;
