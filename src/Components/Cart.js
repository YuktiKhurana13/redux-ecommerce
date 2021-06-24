import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
export default class Cart extends Component {

    constructor() {
        super();
        this.state = {
            showCheckout: false,
            name:"",
            email:"",
            address:""
        }
    }

    handleInput=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    createOrder=(e)=>{
        e.preventDefault();
        const order={
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            cartItems:this.props.cartItems,

        };
        this.props.createOrder(order);
    }

    render() {
        const { cartItems } = this.props;
        console.log(this.props);
        console.log(cartItems)
        return (
            <>
                <div>
                    {cartItems.length === 0 ? <div className="cart cart-header">Cart is Empty</div>
                        : <div className="cart cart-header">You have {cartItems.length} items in Cart</div>}
                </div>
                <div className="cart">
                    <Fade left cascade>
                        <ul className="cart-items">
                            {cartItems.map((item) => (
                                <li key={item._id}>
                                    <div>
                                        <img className="cart-image" src={item.image} alt={item.title} />
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="cartItem-price">
                                            {item.count + " x " + formatCurrency(item.price)}{" "}
                                            <button onClick={() => { this.props.removeFromCart(item) }}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Fade>
                </div>
                {cartItems.length !== 0 && (
                    <div>
                        <div className="cart total">
                            <div>
                                Total:{" "}
                                {formatCurrency(cartItems.reduce((a, c) => a + (c.price * c.count), 0))}
                            </div>
                            <button className="button primary"
                             onClick={() => this.setState({ showCheckout: true, })}>
                                Proceed
                            </button>
                        </div>
                        {this.state.showCheckout && (
                            <div className="cart">
                                <Fade right cascade>
                                    <form onSubmit={this.createOrder}>
                                        <ul className="form-container">
                                            <li>
                                                <label>Email:</label>
                                                <input
                                                name="email"
                                                type="email" 
                                                required
                                                onChange={this.handleInput}
                                                ></input>
                                            </li>
                                            <li>
                                                <label>Name:</label>
                                                <input
                                                name="name"
                                                type="text" 
                                                required
                                                onChange={this.handleInput}
                                                ></input>
                                            </li>
                                            <li>
                                                <label>Address:</label>
                                                <input
                                                name="address"
                                                type="text" 
                                                required
                                                onChange={this.handleInput}
                                                ></input>
                                            </li>
                                            <li>
                                                <button type="submit" className="button primary">
                                                    Checkout
                                                </button>
                                            </li>
                                        </ul>
                                    </form>
                                </Fade>
                            </div>
                        )}
                    </div>
                    )}
            </>
        )
    }
}
