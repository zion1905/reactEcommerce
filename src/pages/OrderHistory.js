import React, { useEffect,useState } from "react";
import "../styles/orderHistory.css";

export default function OrderHistory() {
  const [orders,setOrders]=useState([])
  const oneDay = 24 * 60 * 60 * 1000;
  const now = Date.now();

  useEffect(() => {

    let products = JSON.parse(localStorage.getItem('orderedItems'))||[]
    products= products.map(product=>{
      return {...product,isLessThanOneDay:now - product.time <= oneDay?true:false}
    })
    setOrders(products)

  },[now,oneDay])

  function handleCancel(orderIndex) {
      let confirmCancel= window.confirm("Are you sure want to cancel the order")
      if(confirmCancel){
        let remainingProducts=orders.filter((order,index)=>index!==orderIndex)
        setOrders(remainingProducts)
        localStorage.setItem('orderedItems',JSON.stringify(remainingProducts))
      }

  }
  
  return (
    <div style={{minHeight:'85vh'}}>
    <div className="order-history-container">
    <h2 className="order-history-title">Order History</h2>
    {orders.length===0?<div className="no-orders" ><h4>No Orders</h4></div>:
    <div className="order-list">
    {orders.map((order, index) => (
      <div key={index} className="order-card">
        <div className="order-header">
          <h3 className="order-name">{order.product.name}</h3>
          <span className="order-qty">Qty: {order.quantity}</span>
        </div>
        <div className="order-details">
          <div>Size: {order.product.Size}</div>
          <div>Rating: ⭐ {order.product.Rating}</div>
          <div>
            Price: {order.product.currency} {order.product.price}
          </div>
        </div>
        <div className="order-total">
          Total (+Delivery): {order.product.currency} {order.total}
        </div>
        {order.isLessThanOneDay?<div>
            <button onClick={()=>handleCancel(index)}>Cancel</button>  
        </div>:null
        }
      </div>
    ))}
  </div>
  }
  </div>
  </div>
  );
}
