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
    this.handleGetData();
    this.timer = setInterval(() => this.handleGetData(), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  handleGetData = () => {
    // Write your code here
    this.setState({ ...this.state, show: true });
    fetch("/courses/get")
      .then(response => response.json())
      .then(result => {
        this.setState({ data: result, show: false })
      })
      .catch(e => {
        console.log(e);
        this.setState({ ...this.state, show: false });
      });
  };

  handleApply = async (id) => {
    // Write your code here
    this.state.data[id].isApplied = true;
    this.setState({
      ...this.state,
      data: this.state.data
    })
    var url = '/courses/enroll/' + this.state.data[id]["_id"];
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => alert(data["message"]));
  };

  handleRating = (e) => {
    // Write your code here
    this.setState({ rating: e.target.value });
  }

  handleAddRating = async (id) => {
    // Write your code here
    this.state.data[id].isRated = true;
    this.state.data[id].noOfRatings = this.state.data[id].noOfRatings + 1;
    this.state.data[id].rating = (((this.state.data[id].rating * this.state.data[id].noOfRatings) + this.state.rating) / (this.state.data[id].noOfRatings + 1)).toFixed(1)

    this.setState({
      ...this.state,
      data: this.state.data
    })
    var url = '/courses/rating/' + this.state.data[id]["_id"];
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "rating": this.state.rating
      })
    };
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        alert(data["message"]);
        this.handleGetData();
      });
  }

  handleDrop = async (id) => {
    // Write your code here
    this.state.data[id].isApplied = false;
    this.setState({
      ...this.state,
      data: this.state.data
    })
    var url = '/courses/drop/' + this.state.data[id]["_id"];
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => alert(data["message"]));
  }



  render() {
    return (
      <div className="home">
        <header>
          <h2>ABC Learning</h2>
        </header>
        {
          this.state.show ? "Fetching DATA" :
            this.state.data.map(
              (course, index) => (
                <div className="cardContainer" key={index}>
                  <div className="card">
                    <ul>
                      <div className="header">
                        <li>{course.courseName}</li>
                        <li>{course.courseDept}</li>
                        <li>{course.description}</li>
                        {
                          course.isApplied ?
                            (
                              <li>
                                {
                                  !course.isRated ?
                                    (
                                      <li> Rate :
                                        <select className="rating" name="rating" onChange={(e) => { this.handleRating(e) }}>
                                          <option>1</option>
                                          <option>2</option>
                                          <option>3</option>
                                          <option>4</option>
                                          <option>5</option>
                                        </select>
                                        <button className="rate" onClick={() => { this.handleAddRating(index) }}>Add</button>
                                      </li>
                                    ) :
                                    []
                                }
                                <button className="drop" onClick={() => { this.handleDrop(index) }}>Drop Course</button>
                              </li>
                            ) :
                            (
                              <li><button className="btn" onClick={() => { this.handleApply(index) }}>Apply</button></li>
                            )
                        }
                      </div>
                      <div className="footer">
                        <li>{course.duration} hrs . {course.noOfRatings} Ratings . {course.rating}/5</li>
                      </div>
                    </ul>
                  </div >
                </div >
              )
            )
        }
      </div>
    );
  }
}

export default Home;