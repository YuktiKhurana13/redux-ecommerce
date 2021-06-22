import React from 'react';
import { products } from './data.json';
import Products from './Components/Products';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      products: products,
      size: "",
      sort: ""
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
              <Products products={products} />
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
