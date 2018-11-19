import React from 'react';
import Header from './templates/Header';
import Footer from './templates/Footer';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <div id="container">
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }

}

export default App;
