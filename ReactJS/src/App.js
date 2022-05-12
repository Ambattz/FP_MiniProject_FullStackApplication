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
  }

  handleGetData = async () => {
    // Write your code here
    const fetchPromise = await fetch("http://localhost:8001/courses/get");
    const data = await fetchPromise.json();
    this.setState({ data: data, show: true })
  }

  handleApply = async (id) => {
    // Write your code here
    var url = 'http://localhost:8001/courses/enroll/' + id;
    const requestOptions = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
    };
    const fetchPromise = await fetch(url, requestOptions)
    const data = await fetchPromise.json();
    alert(data["message"]);
    this.handleGetData();
  };

  handleRating = (e) => {
    // Write your code here
    this.setState({ rating: e.target.value }, () => {
    });
  }

  handleAddRating = async (id) => {
    // Write your code here
    var url = 'http://localhost:8001/courses/rating/' + id;
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "rating": this.state.rating
      })
    };
    const Promise = await fetch(url, requestOptions)
    const da = await Promise.json();
    alert(da["message"]);
    this.handleGetData();
  }

  handleDrop = async (id) => {
    // Write your code here
    var url = 'http://localhost:8001/courses/drop/' + id;
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    const fetchPromise = await fetch(url, requestOptions)
    const data = await fetchPromise.json();
    alert(data["message"]);
    this.handleGetData();
  }

  render() {
    return (
      <div className="home">
        <header>
          <h2>ABC Learning</h2>
        </header>

        {
          !this.state.show || !this.state.data ? "Fetching DATA" :
            this.state.data.map(
              (course, index) => (
                <div className="cardContainer" key={index}>
                  <div className="card">
                    <ul>
                      <div className="header">
                        <li>{course.courseName}</li>
                        <li>{course.courseDept}</li>
                        <li>{course.description}</li>
                        {course.isApplied ?
                          (<li>
                            {
                              !course.isRated &&
                              (<li>Rate:
                                <select
                                  className="rating"
                                  name="rating"
                                  onChange={(e) => { this.handleRating(e) }}>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                </select>
                                <button className="rate"
                                  onClick={() => {
                                    this.handleAddRating(this.state.data[index]["_id"]);
                                  }}> Add</button>
                              </li>)
                            }
                            <button
                              className="drop"
                              onClick={() => {
                                this.handleDrop(this.state.data[index]["_id"]);
                              }}>Drop Course</button>
                          </li>) :
                          (<li>
                            <button
                              className="btn"
                              onClick={() => {
                                this.handleApply(this.state.data[index]["_id"]);
                              }}>Apply</button>
                          </li>)}
                      </div>
                      <div className="footer">
                        <li>{course.duration} hrs . {course.noOfRatings} Ratings . {course.rating}/5</li>
                      </div>
                    </ul>
                  </div>
                </div >
              )
            )
        }

      </div>
    );
  }
}

export default Home;