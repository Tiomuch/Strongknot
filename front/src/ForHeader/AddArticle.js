import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import ImageCrop from './ImageCrop'
import FormData from 'form-data'

function addArticle () {
  const [image, setImage] = useState(null) // eslint-disable-line no-unused-vars

  const getImage = (src) => {
    setImage(src)
  }

  const submit = async (values, { setSubmitting }) => {
    const Dat = new Date()
    let mon
    if ((Dat.getMonth() + 1) < 10) {
      mon = '0' + (Dat.getMonth() + 1)
    } else {
      mon = (Dat.getMonth() + 1)
    }
    values.date = Dat.getFullYear() + '-' + mon + '-' + Dat.getDate()

    if (image !== null) {
      const formData = new FormData()
      const config = {
        method: 'POST',
        headers: { 'content-type': 'multypart/form-data', // eslint-disable-line object-curly-newline
          Authorization: localStorage.getItem('token')
        }
      }

      formData.append('image', image)

      for (const key in values) {
        formData.append(key, values[key])
      }

      try {
        await axios.post('http://localhost:3000/api/posts/create-post', formData, config).then(res => console.log(res))
        alert('Post has been sent')
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        const config = {
          method: 'POST',
          headers: { Authorization: localStorage.getItem('token') }
        }

        await axios.post('http://localhost:3000/api/posts/create-post', values, config).then(res => console.log(res))
        alert('Post has been sent')
      } catch (e) {
        console.log(e)
      }
    }

    setSubmitting(false)
  }

  return (
    <div className="right-part">
      <Formik
        initialValues={{ title: '', description: '' }}
        validate={values => {
          const errors = {}
          if (!values.title) {
            errors.title = 'Required'
          }
          return errors
        }}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label><b>Title</b></label>
            <Field type="title" name="title" placeholder="Enter Title" className="Field" />
            <ErrorMessage name="title" component="div" />
            <label><b>Description</b></label>
            <Field type="description" name="description" placeholder="Enter Description" className="Field" />
            <ErrorMessage name="description" component="div" />
            <label><b>Image</b></label>
            <ImageCrop getImage={getImage} />
            <button type="submit" disabled={isSubmitting} className="sign">
              Отправить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default addArticle
