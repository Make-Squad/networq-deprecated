import React, { Component } from 'react'
import ReactDOM from 'react-dom'

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
      query_format: '',
      file: '',
      imagePreviewUrl: '',
      email: '',
      twitter: '',
      city: '',
      phone: '',
      state: '',
    }
  }

  titleCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map(function(word) {
        return word.replace(word[0], word[0].toUpperCase())
      })
      .join(' ')
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
          query: this.titleCase(celebName),
        })
      })

    fetch('/.netlify/functions/cards-read/' + this.state.name)
      .then(response => response.json())
      .then(json => {
        const res_email = json[0]['data']['email']
        const res_twitter = json[0]['data']['twitter']
        const res_city = json[0]['data']['city']
        const res_phone = json[0]['data']['phone']
        const res_state = json[0]['data']['state']

        this.setState({
          email: res_email,
          twitter: res_twitter,
          city: res_city,
          phone: res_phone,
          state: res_state,
        })
        // console.log(json[0])
      })
    // .then(json => this.setState({ loading: true, msg: json.msg }))
    // console.log('handle uploading-', base64Data)
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
          <p>email: {this.state.email}</p>
          <p>phone: {this.state.phone}</p>
          <p>
            location: {this.state.city} {this.state.state}
          </p>
          <p>twitter: {this.state.twitter}</p>
        </div>
      </div>
    )
  }
}

export default Demo