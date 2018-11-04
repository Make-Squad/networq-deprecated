import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

class UploadPage extends React.Component {
  render() {
    return (
      <Layout>
        {/* <div class="container-fluid img-fluid">
          <h1 class="text-center">SnapCard</h1>
          <div class="row justify-content-around">
            <div class="col-sm-6">
              <input type="file" onchange={this.uploadFile} />
              <img
                src="https://via.placeholder.com/150"
                style="width: 85%"
                alt="Image preview"
              />
            </div>
            <div class="col-sm-6">
              <img
                class="placeholder"
                style="width: 100%"
                src="https://via.placeholder.com/150"
                alt=""
              />
            </div>
          </div>
          <div class="d-flex flex-row justify-content">
            <div class="col d-flex justify-content-center">
              <h3 text-center>Bob the Builder</h3>
            </div>
          </div>
        </div> */}
      </Layout>
    )
  }
}

export default UploadPage
