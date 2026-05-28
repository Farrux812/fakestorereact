import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ShopingItem = () => {
    const [store, setStore] = useState([])
    const [cart, setCart] = useState([])
    const [cartOpen, setCartOpen] = useState(false) 

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/`)
            .then((res) => {
                setStore(res.data)
            })
    }, [])

    const addToCart = (product) => {
        setCart([...cart, product])
    }

    return (
        <div className='wrapper'>
            <div>
                <header className='header'>
                    <input type="text" name="text" className="input" placeholder="Type here..." />
                    <div style={{ position: "relative", cursor: "pointer" }}
                        onClick={() => setCartOpen(!cartOpen)}>
                        <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z" />
                        </svg>
                        {cart.length > 0 && (<span style={{position: "absolute",top: "-5px",right: "-5px",background: "red",color: "white",borderRadius: "50%",padding: "2px 6px",fontSize: "12px"}}>{cart.length}</span>)}
                    </div>
                </header>
            </div>
            {cartOpen && (
                <div className='cart-box' style={{
                    position: "absolute",
                    top: "70px",
                    right: "20px",
                    width: "300px",
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "10px",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                    zIndex: 100
                }}>
                    <h3>Sizning korzinangiz</h3>
                    {cart.length === 0 ? (<p>Maxsulotlar mavjud emas</p>):
                    (cart.map((item, i) => (
                            <div key={i} >
                                <img src={item.image} alt="" style={{ width: "40px", height: "40px", objectFit: "contain", marginRight: "10px" }} />
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: "14px", margin: 0 }}>{item.title.slice(0, 20)}...</p>
                                    <span>{item.price}$</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
            <div className='home-store'>
                {store.map((stores, index) => (
                    <div key={index} className='stores'>
                        <div className='store'>
                            <img src={stores.image} alt="" className='img-store' />
                            <h3>{stores.title.slice(0, 30)}</h3>
                            <p>{stores.description.slice(0, 100)}</p>
                            <h2>{stores.price}$</h2>
                            <button onClick={() => addToCart(stores)}>Buy</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShopingItem;