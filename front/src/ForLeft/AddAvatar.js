import React, { useState } from 'react'
import axios from 'axios'
import ImageCrop from '../ForHeader/ImageCrop'
import FormData from 'form-data'

function EditProfile () {
  const [image, setImage] = useState(null) // eslint-disable-line no-unused-vars

  const getImage = (src) => {
    setImage(src)
  }

  const submit = async () => {
    if (image !== null) {
      const imageFormData = new FormData()

      const config = {
        method: 'POST',
        headers: { 'content-type': 'multypart/form-data', // eslint-disable-line object-curly-newline
          Authorization: localStorage.getItem('token') } // eslint-disable-line object-curly-newline
      }

      imageFormData.append('avatar', image)

      try {
        await axios.post('http://localhost:3000/api/other/avatar', imageFormData, config).then(res => console.log(res))
        alert('Avatar has been add')
      } catch (e) {
        console.log(e)
      }
    } else {
      alert('Add picture please')
    }
  }

  return (
    <div className='left-part'>
      <form>
        <label><b>Avatar</b></label>
        <ImageCrop getImage={getImage} />
        <button type="submit" onClick={submit} className="sign">
          Отправить
        </button>
      </form>
    </div>)
}

export default EditProfile
