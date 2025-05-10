import React, { useEffect, useState } from "react";
import "../styles/orderHistory.css";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const oneDay = 24 * 60 * 60 * 1000;
  const now = Date.now();

  useEffect(() => {
    let products = JSON.parse(localStorage.getItem("orderedItems")) || [];
    products = products.map((product) => {
      return {
        ...product,
        isLessThanOneDay: now - product.time <= oneDay ? true : false,
      };
    });
    setOrders(products);
  }, [now, oneDay]);

  function handleCancel(orderIndex) {
    let confirmCancel = window.confirm("Are you sure you want to cancel the order?");
    if (confirmCancel) {
      let remainingProducts = orders.filter((order, index) => index !== orderIndex);
      setOrders(remainingProducts);
      localStorage.setItem("orderedItems", JSON.stringify(remainingProducts));
    }
  }

  return (
    <div >
      <div className="order-history-container">
        <h2 className="order-history-title">Order History</h2>
        {orders.length === 0 ? (
          <div className="no-orders">
            <h4>No Orders</h4>
          </div>
        ) : (
          <div className="order-list">
            {orders.map((order, index) => (
              <div key={index} className="order-card">
                <div className="order-header">
                  <h3 className="order-name">{order.product.name}</h3>
                  <span className="order-qty">Qty: {order.quantity}</span>
                </div>
                <div className="order-body">
                  <img
                    src={order.product.image}
                    alt={order.product.name}
                    className="order-product-image"
                  />
                  <div className="order-details">
                    <div><strong>Size:</strong> {order.product.size}</div>
                    <div><strong>Rating:</strong> ⭐ {order.product.rating}</div>
                    <div><strong>Price:</strong> ₹{order.product.price}</div>
                  </div>
                </div>

                <div className="order-total">
                  Total (+Delivery): ₹{order.total}
                </div>

                {order.isLessThanOneDay && (
                  <div className="order-actions">
                    <button className="cancel-btn" onClick={() => handleCancel(index)}>
                      Cancel Order
                    </button>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
