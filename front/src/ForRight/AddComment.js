import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import PropTypes from 'prop-types'

function AddComment ({ comment }) {
  const submit = async (values, { setSubmitting }) => {
    const conf = {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }

    values.post_id = comment
    const Dat = new Date()
    let mon
    if ((Dat.getMonth() + 1) < 10) {
      mon = '0' + (Dat.getMonth() + 1)
    } else {
      mon = (Dat.getMonth() + 1)
    }
    values.date = Dat.getFullYear() + '-' + mon + '-' + Dat.getDate()

    try {
      await axios.post('http://localhost:3000/api/comments/create-comment', values, conf).then(res => console.log(res))
      alert('Post added')
    } catch (e) {
      console.log(e)
    }

    setSubmitting(false)
  }

  return (
    <div className='right-part'>
      <Formik
        initialValues={{ text: '' }}
        validate={values => {
          const errors = {}
          if (!values.text) {
            errors.text = 'Required'
          }
          return errors
        }}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label><b>Text</b></label>
            <Field type="text" name="text" placeholder="Enter text" className="Field" />
            <ErrorMessage name="text" component="div" />
            <button type="submit" disabled={isSubmitting} className="sign">
              Отправить
            </button>
          </Form>
        )}
      </Formik>
    </div>)
}

export default AddComment

AddComment.propTypes = {
  comment: PropTypes.number
}
