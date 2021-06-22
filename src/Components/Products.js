import React from 'react';
import formatCurrency from '../util';

export default class Products extends React.Component{
    render(){
        return(
            <div className="products">
                {this.props.products.map((product)=>(
                    <li key={product._id}>
                        <div className="product">
                            <a href={"#"+product._id}>
                                <img src={product.image}  alt={product.title}/>
                                <p>
                                    {product.title}
                                </p>
                            </a>
                            <div className="product-price">
                                <div>{formatCurrency(product.price)}</div>
                                <button className="button primary">Add to Cart</button>
                            </div>
                        </div>
                    </li>
                ))}
            </div>
        )
    }
}