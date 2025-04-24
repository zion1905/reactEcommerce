import React, { useEffect,useState } from "react";
import "../styles/orderHistory.css";
import { useNavigate } from "react-router-dom";


export default function Cart() {
  const [orders,setOrders]=useState([])
  const navigate = useNavigate();


  useEffect(() => {
    let products = JSON.parse(localStorage.getItem('cartItems'))    
    setOrders(products||[])
  }, [])

  function handleRemove(orderIndex) {
      let confirmCancel= window.confirm("Are you sure want to remove this item")
      if(confirmCancel){
        let remainingProducts=orders.filter((order,index)=>index!==orderIndex)
        setOrders(remainingProducts)
        localStorage.setItem('cartItems',JSON.stringify(remainingProducts))
      }

  }
  function handleCheckout(order) {
    localStorage.setItem("isFromCartPage",true)
    navigate("/confirm-order", { state: { product:order } });

  }
  
  return (
    <div style={{minHeight:'85vh'}}>
    <div className="order-history-container">
    <h2 className="order-history-title">Cart</h2>
    {orders.length===0?<div className="no-orders" ><h4>No Products</h4></div>:
    <div className="order-list">
    {orders.map((order, index) => (
      <div key={index} className="order-card">
        <div className="order-header">
        <img src={order.product.image} alt={order.product.product} className="product-image" />
          <h3 className="order-name">{order.product.product}</h3>
          <span className="order-qty">Qty: {order.quantity}</span>
        </div>
        <div>
            <button onClick={()=>handleRemove(index)}>Remove</button> 
            <button onClick={()=>handleCheckout(order.product)}>Checkout</button> 
             
        </div>
      </div>
    ))}
  </div>
  }
  </div>
  </div>
  );
}
