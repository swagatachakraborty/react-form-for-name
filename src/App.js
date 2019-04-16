import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      display: ''
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
        res.text();
      })
      .then(res => this.setState({ display: res }));
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
      </main>
    );
  }
}

export default App;
