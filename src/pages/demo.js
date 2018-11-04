import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Webcam from 'react-webcam'

import Clarifai from 'clarifai'

import '../components/styles.css'

const app = new Clarifai.App({
  apiKey: '30e5e4a0abad4ef4b3b280a3941ef46c',
})

class Demo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'none',
      file: '',
      imagePreviewUrl: '',
    }
  }
  // https://codepen.io/hartzis/pen/VvNGZP
  _handleSubmit(e) {
    e.preventDefault()
    // TODO: do something with -> this.state.file
    var url = this.state.imagePreviewUrl
    var base64Data = url.split('base64,')[1]

    app.models
      .predict('e466caa0619f444ab97497640cefc4dc', { base64: base64Data })
      .then(response => {
        const res = response['outputs']['0']['data']['regions']['0']['data']
        const celebName = res['face']['identity']['concepts']['0']['name']

        this.setState({
          name: celebName,
        })
      })

    // console.log('handle uploading-', base64Data);
  }

  _handleImageChange(e) {
    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      })
    }

    reader.readAsDataURL(file)
  }

  setRef = webcam => {
    this.webcam = webcam
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot()

    this.setState({
      imagePreviewUrl: imageSrc,
    })
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user',
    }

    let { imagePreviewUrl } = this.state
    let $imagePreview = null
    if (imagePreviewUrl) {
      $imagePreview = <img id="image_upload_preview" src={imagePreviewUrl} />
    } else {
      $imagePreview = (
        <img
          id="image_upload_preview"
          src="http://placehold.it/100x100"
          alt="your image"
        />
      )
    }

    return (
      <div className="form-container">
        <h1>{this.state.name}</h1>
        <div className="previewComponent">
          <form onSubmit={e => this._handleSubmit(e)}>
            <input
              className="fileInput"
              type="file"
              onChange={e => this._handleImageChange(e)}
            />
            <button
              className="submitButton"
              type="submit"
              onClick={e => this._handleSubmit(e)}
            >
              <span class="mi mi-face" />
              Upload Image
            </button>
          </form>
          <div className="imgPreview">{$imagePreview}</div>
        </div>

        <hr />

        <div>
          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/png"
            width={350}
            videoConstraints={videoConstraints}
          />
          <button onClick={this.capture}>Capture photo</button>
        </div>
      </div>
    )
  }
}

export default Demo
