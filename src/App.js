import React from 'react';
import { products } from './data.json';
import Products from './Components/Products';
import Filter from './Components/Filter';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      products: products,
      size: "",
      sort: ""
    }
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

              <Products products={this.state.products} />
            </div>
            <div className="sidebar">
              Cart Items
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
