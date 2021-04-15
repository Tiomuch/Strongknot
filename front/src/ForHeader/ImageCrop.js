import React, { useState } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import PropTypes from 'prop-types'

const Cropper = ({ getImage }) => {
  const [src, selectFile] = useState(null)
  const handleFileChange = e => {
    selectFile(URL.createObjectURL(e.target.files[0]))
  }

  const [image, setImage] = useState(null)
  const [crop, setCrop] = useState({ aspect: 16 / 9 })
  const [result, setResult] = useState(null)

  async function getCroppedImg () {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    const base64Image = canvas.toDataURL('image/jpg')
    setResult(base64Image)

    const base = await fetch(base64Image)
    const file = await base.blob()
    getImage(file)
  }

  return (
    <div>
    <div>
      <input type='file' accept='image/*' onChange={handleFileChange}/>
    </div>
    {src && <div>
        <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop}/>
        <button type='button' className='exit' onClick={getCroppedImg}>Crop Image</button>
      </div>}
    {result && <div>
      <img src={result} alt='Cropped Image' className='img-fluid'/>
    </div>}
    </div>
  )
}

export default Cropper

Cropper.propTypes = {
  getImage: PropTypes.func
}
