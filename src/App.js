import React from 'react';
import { products } from './data.json';
import Products from './Components/Products';
import Filter from './Components/Filter';
import Cart from './Components/Cart'

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      products: products,
      size: "",
      sort: "",
      cartItems:localStorage.getItem("CartItems") ? JSON.parse(localStorage.getItem("CartItems")) : []
    }
  }

  createOrder=(order)=>{
    alert("save order for "+ order.name);
  }

  sortProducts=(e)=>{
    const sort=e.target.value;

    this.setState((state)=>({
      sort:sort,
      products:this.state.products
      .slice()
      .sort((a,b)=>
        sort==="lowest"?
        ((a.price>b.price)?1:-1):
        sort==="highest"?
        ((a.price<b.price)?1:-1):
        ((a._id<b._id)?1:-1)
      )
    }))
  }

  filterProducts=(e)=>{
    if(e.target.value ===""){
      this.setState({
        size:e.target.value,
        products:products
      })
    }else{
      this.setState({
        size:e.target.value,
        products:products.filter(
          (product)=>product.availableSizes.indexOf(e.target.value)>0
        ),
      })
    }
    
  }

  addToCart=(product)=>{
    const cartItems=this.state.cartItems.slice();
    let alreadyInCart=false;

    cartItems.forEach((item)=>{
      if(item._id===product._id){
        item.count++;
        alreadyInCart=true;
      }
    });
    if(!alreadyInCart){
      cartItems.push({...product,count:1});
    }

    this.setState({cartItems});
    localStorage.setItem("CartItems",JSON.stringify(cartItems));
  }

  removeFromCart=(product)=>{
    let cartItems=this.state.cartItems.slice();

    // let index=cartItems.indexOf(product);

    // cartItems.splice(index,1);
    let newCartItmes=cartItems.filter((x)=>x._id!==product._id)
    this.setState({cartItems:newCartItmes});
    localStorage.setItem("CartItems",JSON.stringify(newCartItmes));
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href='/'>React Shopping App</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length} size={this.state.size} sort={this.state.sort}
              filterProducts={this.filterProducts}
              sortProducts={this.sortProducts}/>

              <Products products={this.state.products} addToCart={this.addToCart} />
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems}
               removeFromCart={this.removeFromCart}
               createOrder={this.createOrder} />
            </div>
          </div>
        </main>
        <footer>
          All Rights' reserved
        </footer>
      </div>
    );
  }

}

export default App;
