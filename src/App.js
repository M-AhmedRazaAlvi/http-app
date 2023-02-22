import React, { Component } from "react";
import "./App.css";
import http from "./service/httpService";
import config from "./config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    posts: []
  };

  componentDidMount = async () => {
  const {data : posts}= await http.get(config.apiEndpoint);
  console.log(posts); 
  // this.setState({posts});
    //const { data: posts } = await http.get(config.apiEndpoint);
    this.setState({ posts });
  };

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndpoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    const originalPosts = this.state.posts;
    post.title = "UPDATED";
    post.body="BODY";
    //put example
    const posts = [...originalPosts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts }); 
    // try {
    //   await http.put(`${config.apiEndpoint}/${post.id}`, post);
    // } catch (ex) {
    //   alert("Something failed while updating a post.");
    //   this.setState({ posts: originalPosts });
    // }
    //patch example
    //http.patch(`${config.apiEndpoint}/${post.id}`, { title: post.title });
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;
    const posts = originalPosts.filter(p => post.id !== p.id);
    this.setState({ posts });

    try {
      //// check for the toastify massages in blow line
      // await http.delete("s" +config.apiEndpoint+ "/" +post.id);
      await http.delete(config.apiEndpoint+ "/" +post.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) 
        alert("This post has already been deleted");
       this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary"
                onClick={this.handleAdd}
        >
          Add
        </button>
        <table className="table " style={{marginLeft:50, marginRight:50}} >
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
