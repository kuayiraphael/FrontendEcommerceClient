// For Add Item to Cart
export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: {
      _id: product._id, // Ensure _id is included
      name: product.name,
      price: product.price,
      img: product.img,
    },
  };
};

export const delCart = (product) => {
  return {
    type: "DELITEM",
    payload: product, // Pass the full product object
  };
};

