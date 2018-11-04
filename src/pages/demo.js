import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Webcam from 'react-webcam'
<<<<<<< HEAD
import axios from 'axios'
=======
import { Link } from 'gatsby'
>>>>>>> 953780b5beb98837ad904fa3624738c72581a6b4

import Clarifai from 'clarifai'

import '../components/styles.css'

const app = new Clarifai.App({
  apiKey: 'ee055cb5f7494c47b0640889e562e4e9',
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

    axios
      .get(
        'https://pedantic-wozniak-e1905a.netlify.com/.netlify/functions/cards-read/Kayne%20West',
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .then(response => console.log(response))
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

  render() {
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
        <form className="form" onSubmit={e => this._handleSubmit(e)}>
          <button className="fileInput imgPreview">{$imagePreview}</button>
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
            Upload Image
          </button>
        </form>

        <div>
          <h1>{this.state.name}</h1>
          <p>email: </p>
          <p>phone: </p>
          <p>city, state</p>
          <p>twitter</p>
        </div>
      </div>
    )
  }
}

export default Demo
