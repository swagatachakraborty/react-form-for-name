import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      display: '',
      visitors: 0
    };
  }

  handleClick() {
    const name = document.getElementById('name').value;
    document.getElementById('name').value = '';
    fetch('/update', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name })
    })
      .then(res => {
        if (res.status === 404) return '';
        return res.json();
      })
      .then(({ display, visitors }) => {
        this.setState({ display: display, visitors: visitors });
      });
  }

  render() {
    return (
      <main>
        <div className="input-section">
          <h2>Enter Name : </h2>
          <input name="name" id="name" />
          <button onClick={this.handleClick}> Submit</button>
        </div>

        <div className="output-section">
          <h2>Output :</h2>
          <div className="display">{this.state.display}</div>
        </div>

        <div>{this.state.visitors}</div>
      </main>
    );
  }
}

export default App;
