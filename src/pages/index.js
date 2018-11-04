import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: 'null' }
  }

  handleClick = e => {
    e.preventDefault()

    fetch('/.netlify/functions/hello')
      .then(response => response.json())
      .then(json => this.setState({ loading: true, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state

    return (
      <Layout>
        <div className="home-container">
        <h1></h1>
        <p>Welcome to Networq!</p>
        <p>
          <button onClick={this.handleClick}>
            {loading ? msg : 'Call Lambda'}
          </button>
          <br />
        </p>
        
        <Link to="/demo/">Go to Demo</Link>
        <div>
          <Link to="/video/">Go to Video</Link>
        </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage
