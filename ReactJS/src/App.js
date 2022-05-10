import React, { Component } from 'react';
import "./App.css"

class Home extends Component {
  
  state = {
    show: false,
    data: [],
    rating: 1,
  }
  componentDidMount = () => {
    // Write your code here
  }
    
  handleGetData = () => {
    // Write your code here
  }

  handleApply = async (id) => {
    // Write your code here
  };

  handleRating = (e) => {
    // Write your code here
  }

  handleAddRating = async (id) => {
    // Write your code here
  }

  handleDrop = async (id) => {
    // Write your code here
  }

  render() {
    return (
      <div className="home">
        <header>
            <h2>ABC Learning</h2>
        </header>
        {/* write your code here */}
        <div className="cardContainer">
            <div className="card">
              <ul>
                <div className="header">
                  <li></li>
                  <li></li>
                  <li></li>                        
                  <li>
                  <li>Rate: 
                    <select className="rating" name="rating">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                    <button className="rate">Add</button>
                  </li>
                  <button className="drop">Drop Course</button>
                  </li>
                  <li><button className="btn">Apply</button></li>
                </div>
                <div className="footer">
                  <li></li>
                </div>
              </ul>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;