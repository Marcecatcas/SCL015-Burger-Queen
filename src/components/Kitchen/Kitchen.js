import React, { useState, useEffect } from 'react'
import logo from '../Images/logosushi.jpg'
import './Kitchen.css'
import { useFirebaseApp } from 'reactfire'; 
import 'firebase/firestore';

function KitchenPage() {
const [orders, setOrders] = useState([]);
const firebase = useFirebaseApp();
const getOrders = async () => {
  await firebase.firestore()
  .collection("pedidos")
  .onSnapshot((querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({...doc.data(), id: doc.id})
    })
    setOrders(docs)
  })
}


const deleteItem = async (id) =>{
  if (window.confirm("estas seguro que deseas eliminar el pedido?")) {
    await firebase.firestore()
    .collection("pedidos").doc(id).delete();
    console.log("pedido eliminado")
  }
}

useEffect(()=>{
  getOrders();
}, []);



    return (
      <div className="kitchen-page-container">
    
    <div className="container">
      <header className="headerClientPage">
        <div className="logoContainer">
          <p className="logoName">SUSHI <br/> QUEEN</p>
          <img src={logo} className="logoHeader" alt="logosushi"/>
          </div>
          <a href="/cliente"className="headerButton">CLIENTE</a>
          </header>
          <div>
            <div className="order-header-container">
              <h2 className="order-header-title">
                PEDIDOS
              </h2>
            </div>
            <div className="mainOrdersContainer">
                {orders.map(item=>(
                  <div key={item.id} className="ordersContainer">
                  <h1 key={item.id} className="display-flex">{item.name}</h1>
                  {item.order.map(a=>(<p key={a.id}>{'1x ' + a.name}</p>))}
                  <button className="orderButton" onClick={()=>{deleteItem(item.id)}}>Listo</button>
                  </div>
                ))}
            </div>
          </div>
    </div>
      </div>
    );
  }
  
  export default KitchenPage;
  