const getInitialCart = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

// redux/reducer/handleCart.js
const handleCart = (state = getInitialCart(), action) => {
  console.log("Action Type:", action.type);
  console.log("Action Payload:", action.payload);
  console.log("Current State:", state);

  const product = action.payload;
  let updatedCart;

  switch (action.type) {
    case "ADDITEM":
      // Use _id to find existing product
      const exist = state.find((x) => x._id === product._id);  // Ensure '_id' exists
      if (exist) {
        // Increase the quantity if product exists
        updatedCart = state.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        // Add new product to the cart
        updatedCart = [...state, { ...product, qty: 1 }];
      }
      // Update localStorage with the new cart
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log("Updated State after ADDITEM:", updatedCart);
      return updatedCart;

    case "DELITEM":
      // Use _id to find product for removal
      const exist2 = state.find((x) => x._id === product._id);  // Ensure '_id' exists
      if (exist2.qty === 1) {
        // Remove product if quantity is 1
        updatedCart = state.filter((x) => x._id !== exist2._id);
      } else {
        // Decrease the quantity if more than 1
        updatedCart = state.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty - 1 } : x
        );
      }
      // Update localStorage with the new cart
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log("Updated State after DELITEM:", updatedCart);
      return updatedCart;

    default:
      return state;
  }
};

export default handleCart;
