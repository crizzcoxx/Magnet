import React, { Component } from 'react'
import styled from 'styled-components'
//import axios from 'axios'
import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop'
//import 'react-image-crop/dist/ReactCrop.css'
// import {
//   Menu,
//   Image,
//   Icon,
//   Button,
//   Modal,
//   Header,
// } from 'semantic-ui-react'

import { medBlue, darkerWhite, lightBlue, hangryGrayBtn } from '../../../../../.semantic/src/site/variables'


const imageMaxSize = 10000000000 //bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(',').map(item => item.trim())

class ProfilePic extends Component {
  constructor(props) {
    super(props)
    this.imagePreviewCanvasRef = React.createRef()
    this.fileInputRef = React.createRef()
    this.state = {
      imgSrc: null,
      imgSrcExt: null,
      crop: {
        aspect: 1 / 1,
      },
    }
    this.verifyFile = this.verifyFile.bind(this)
    this.handleOnDrop = this.handleOnDrop.bind(this)
    this.handleImageLoaded = this.handleImageLoaded.bind(this)
    this.handleOnCropChange = this.handleOnCropChange.bind(this)
    this.handOnCropComplete = this.handOnCropComplete.bind(this)
    this.handleDownloadClick = this.handleDownloadClick.bind(this)
    this.handleClearToDefault = this.handleClearToDefault.bind(this)
    this.handleFileSelect = this.handleFileSelect.bind(this)
  }
  verifyFile(files) {
    if (files && files.length > 0) {
      const currentFile = files[0]
      const currentFileType = currentFile.type
      const currentFileSize = currentFile.size
      if (currentFileSize > imageMaxSize) {
        alert('Your file is too large.\nDecrease your file size & Try once more.')
        return false
      }
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        alert('You can only upload image files.\nTry once more.')
        return false
      }
      return true
    }
  }
  handleOnDrop(files, rejectedFiles) {
    console.log('handledrop works', files)
    console.log('these are the rejected files from profilpic modual', rejectedFiles)
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyFile(rejectedFiles)
    }
    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files)
      if (isVerified) {
        //imageBase64Data
        const currentFile = files[0]
        const myFileItemReader = new FileReader()
        myFileItemReader.addEventListener('load', () => {
          console.log('reader result', myFileItemReader.result)
          const myResult = myFileItemReader.result
          this.setState({
            imgSrc: myResult,
            imSrcExt: extractImageFileExtensionFromBase64(myResult)
          })
        }, false)
        myFileItemReader.readAsDataURL(currentFile)
      }
    }
  }
  handleImageLoaded(image) {
    console.log('image load handler', image)
  }
  handleOnCropChange(crop) {
    console.log('console logging the handleOnCropCHange', crop)
    this.setState({
      crop: crop,
    })
  }
  handOnCropComplete(crop, pixelCrop) {
    console.log('crop complete crop and pixel', crop, pixelCrop)
    const canvasRef = this.imagePreviewCanvasRef.current
    const { imgSrc } = this.state
    console.log('checking state in the step before crop comptlete', imgSrc)
    image64toCanvasRef(canvasRef, imgSrc, pixelCrop)
  }
  handleDownloadClick() {
    //event.preventDefault()
    const { imgSrc } = this.state
    if (imgSrc) {
      const canvasRef = this.imagePreviewCanvasRef.current
      const { imgSrcExt } = this.state
      const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt)
      const myFilename = 'previewFile.' + imgSrcExt
      // file to be uploaded
      const myNewCroppedFile = base64StringtoFile(imageData64, myFilename)
      console.log(myNewCroppedFile)
      // download file
      downloadBase64File(imageData64, myFilename)
      this.handleClearToDefault()
    }
  }

  handleClearToDefault(event) {
    if (event) event.preventDefault()
    const canvas = this.imagePreviewCanvasRef.current
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.setState({
      imgSrc: null,
      imgSrcExt: null,
      crop: {
        aspect: 1 / 1,
      },
    })
    this.fileInputRef.current.value = null
  }
  handleFileSelect(event) {
    // console.log(event)
    const { files } = event.target.files
    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files)
      if (isVerified) {
        // imageBase64Data
        const currentFile = files[0]
        const myFileItemReader = new FileReader()
        myFileItemReader.addEventListener('load', () => {
          // console.log(myFileItemReader.result)
          const myResult = myFileItemReader.result
          this.setState({
            imgSrc: myResult,
            imgSrcExt: extractImageFileExtensionFromBase64(myResult),
          })
        }, false)
        myFileItemReader.readAsDataURL(currentFile)
      }
    }
  }
  render() {
    const { imgSrc } = this.state
    const CanvasPreview = styled.canvas`
      &#canvas-preview {
        margin-top: 1em 1em 1em 8em
      }
    `
    return (
      <div>
        <input ref={this.fileInputRef} type="file" accept={acceptedFileTypes} multiple={false} onChange={this.handleFileSelect} />
        {imgSrc !== null ?
          <div>
            <ReactCrop
              src={imgSrc}
              crop={this.state.crop}
              onImageLoaded={this.handleImageLoaded}
              onComplete={this.handOnCropComplete}
              onChange={this.handleOnCropChange}
            />
            <canvas
              ref={this.imagePreviewCanvasRef}
              id="canvas-preview"
            >
            </canvas>
            <p>Preview Image Crop</p>
            <button
              onClick={this.handleDownloadClick}
            >Download
            </button>
            <button
              onClick={this.handleClearToDefault}
            >Clear
            </button>
          </div>
          :
          <Dropzone
            onDrop={this.handleOnDrop}
            maxSize={imageMaxSize}
            multiple={false}
            accept={acceptedFileTypes}
          >Drop Image here or click to upload
          </Dropzone>
        }
      </div>
    )
  }
}

export default ProfilePic
//export default withRouter(ProfilePic)
