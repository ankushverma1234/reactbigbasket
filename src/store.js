import { configureStore, createSlice } from '@reduxjs/toolkit';

// Load cart data from localStorage (for persistence after reload)
const savedCart = localStorage.getItem('cart');
const initialCartState = savedCart ? JSON.parse(savedCart) : [];

// Product Slice: Contains predefined products for Veg, NonVeg, Milk, Chocolate
const productSlice = createSlice({
  name: 'products',
  initialState: {
    veg: [
      { id: 1, name: 'Tomato', price: 50, image: '/vegimages/tomato.jpg' },
      { id: 2, name: 'Potato', price: 40, image: '/vegimages/potato.jpg' },
      { id: 3, name: 'Brinjal', price: 30, image: '/vegimages/brinjal.jpg' },
      { id: 4, name: 'Broccoli', price: 50, image: '/vegimages/broccoli.jpg' },
      { id: 5, name: 'Cauliflower', price: 40, image: '/vegimages/cauliflower.jpg' },
      { id: 6, name: 'Cluster beans', price: 35, image: '/vegimages/cluster beans.jpg' },
      { id: 7, name: 'Green beans', price: 35, image: '/vegimages/green beans.jpg' },
      { id: 8, name: 'Ladies finger', price: 30, image: '/vegimages/ladies finger.jpg' },
      { id: 9, name: 'Peas', price: 40, image: '/vegimages/peas.jpg' },
      { id: 10, name: 'Cabbage', price: 30, image: '/vegimages/Cabbage.jpg' },
      { id: 11, name: 'Green Chilli', price: 30, image: '/vegimages/Green chilli.jpg' },
      { id: 12, name: 'Capsicum', price: 60, image: '/vegimages/capsicum.jpg' },
      { id: 13, name: 'Turnip', price: 70, image: '/vegimages/Turnip.jpg' },
      { id: 14, name: 'Bitter Gaurd', price: 75, image: '/vegimages/Bitter Gaurd.jpg' },
      { id: 15, name: 'White Raddish', price: 40, image: '/vegimages/white raddish.jpg' }
    ],
    nonveg: [
      { id: 16, name: 'Chicken Lollipop', price: 150, image: '/nonveg/chicken lolipop.jpg' },
      { id: 17, name: 'Chicken Pakoda', price: 100, image: '/nonveg/chicken pakoda.jpg' },
      { id: 18, name: 'Chicken Tikka Masala', price: 140.65, image: '/nonveg/chicken tikka masala.jpg' },
      { id: 19, name: 'Chilli Chicken', price: 125, image: '/nonveg/chilli chicken.jpg' },
      { id: 20, name: 'Crab Curry', price: 150, image: '/nonveg/crab curry.jpg' },
      { id: 21, name: 'Fish Biryani', price: 130, image: '/nonveg/fish biryani.jpg' },
      { id: 22, name: 'Fish Curry', price: 150, image: '/nonveg/Fish Curry.jpg' },
      { id: 23, name: 'Mutton Curry', price: 140, image: '/nonveg/mutton curry.jpg' }
    ],
    milk: [
      { id: 24, name: 'Butter Milk', price: 30, image: '/milk/butter milk.jpg' },
      { id: 25, name: 'Butter', price: 40, image: '/milk/butter.jpg' },
      { id: 26, name: 'Cheese', price: 50, image: '/milk/cheese.jpg' },
      { id: 27, name: 'Curd', price: 60, image: '/milk/curd.jpg' },
      { id: 28, name: 'Custered', price: 70, image: '/milk/custered.jpg' },
      { id: 29, name: 'Ghee', price: 120, image: '/milk/ghee.jpg' },
      { id: 30, name: 'Lassi', price: 50, image: '/milk/lassi.jpg' },
      { id: 31, name: 'Milk powder', price: 600.54, image: '/milk/milk powder.jpg' },
      { id: 32, name: 'Paneer', price: 160, image: '/milk/paneer.jpg' },
      { id: 33, name: 'Rasgulla', price: 120, image: '/milk/rasgulla.jpg' }
    ],
    chocolate: [
      { id: 34, name: '5Star', price: 20, image: '/chocolate/5star.jpg' },
      { id: 35, name: 'Amul Chocolate', price: 80, image: '/chocolate/amul chocolate.jpg' },
      { id: 36, name: 'Cadburry Dairymilk', price: 100, image: '/chocolate/cadburry dairymilk.jpg' },
      { id: 37, name: 'Chocolove Chocolate', price: 50, image: '/chocolate/chocolove chocolate.jpg' },
      { id: 38, name: 'Harshey', price: 100, image: '/chocolate/harshey.jpg' },
      { id: 39, name: 'Mars', price: 60, image: '/chocolate/mars.jpg' },
      { id: 40, name: 'Nestle Chocolate', price: 20, image: '/chocolate/nestle chocolate.jpg' },
      { id: 41, name: 'Snickers', price: 50, image: '/chocolate/snickers.jpg' }
    ]
  },
  reducers: {}
});

// Cart Slice: Handles cart operations like add, remove, quantity changes
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1;
        } else {
          state.splice(index, 1);
        }
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    clearCart: () => []
  }
});

// Order Slice: Used to save past orders
const orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    }
  }
});

// User Slice: For registration, login, logout and authentication
const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    users: []
  },
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
    },
    loginUser: (state, action) => {
      const user = state.users.find(
        u =>
          (u.email === action.payload.username ||
           u.phone === action.payload.username ||
           u.username === action.payload.username) &&
          u.password === action.payload.password
      );
      if (user) {
        state.isAuthenticated = true;
      } else {
        alert('Invalid credentials');
        state.isAuthenticated = false;
      }
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
    }
  }
});

// Export Cart Actions
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart
} = cartSlice.actions;

// Export User Actions
export const { registerUser, loginUser, logoutUser } = userSlice.actions;

// Export Order Actions
export const { addOrder } = orderSlice.actions;

// Configure Store
const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer,
    user: userSlice.reducer
  }
});

// Save cart data to localStorage on store update (for persistence)
store.subscribe(() => {
  const cartData = store.getState().cart;
  localStorage.setItem('cart', JSON.stringify(cartData));
});

export default store;
