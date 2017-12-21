import React from 'react';

class Notes extends React.Component {
  state = {
    value: "",
    timeout: null
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
    if (this.state.timeout) {
      clearTimeout(this.state.timeout)
    }
    const typingTimeOut = setTimeout(() => {
      //add fetch request here to update our note
      console.log('timed out!')
    }, 5000)
    this.setState({timeout: typingTimeOut})
  }

  render() {
    console.log(this.state)
    return (
      <div className="column column-50" id="notes">
        <h2>Notes</h2>
        <div className="notes-container">
           <textarea placeholder="What are you thinking about?" onChange={this.handleChange} value={this.state.value}></textarea>
        </div>
      </div>
    )
  }

}

export default Notes
