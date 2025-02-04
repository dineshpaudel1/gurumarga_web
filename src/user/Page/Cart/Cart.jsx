import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
          <a href="/">
            <button className="bg-[#5e17eb] hover:bg-[#5e17eb]/90 text-white py-2 px-4 rounded">
              Browse Courses
            </button>
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-4 border-b"
              >
                <div className="flex items-center">
                  <img
                    src={`http://localhost:8080${
                      item.thumbnail || "/placeholder.svg"
                    }`}
                    alt={item.courseTitle}
                    className="w-24 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <h3 className="font-medium">{item.courseTitle}</h3>
                    <p className="text-sm text-gray-500">
                      {item.courseDescription}
                    </p>
                    <p className="text-sm text-gray-500">
                      Category: {item.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      Price: NRS {item.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) =>
                      updateQuantity(item.id, Number.parseInt(e.target.value))
                    }
                    className="w-16 mr-4 p-2 border rounded"
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>NRS {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Tax</span>
                <span>NRS {(total * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 text-lg font-semibold">
                <span>Total</span>
                <span>NRS {(total * 1.1).toFixed(2)}</span>
              </div>
              <button className="w-full bg-[#5e17eb] hover:bg-[#5e17eb]/90 text-white py-2 px-4 rounded">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
