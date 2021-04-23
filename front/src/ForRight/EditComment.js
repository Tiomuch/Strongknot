import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'

function editComment ({ comment }) {
  const submit = async (values, { setSubmitting }) => {
    const Dat = new Date()
    let mon
    if ((Dat.getMonth() + 1) < 10) {
      mon = '0' + (Dat.getMonth() + 1)
    } else {
      mon = (Dat.getMonth() + 1)
    }
    values.date = Dat.getFullYear() + '-' + mon + '-' + Dat.getDate()

    try {
      await axios.post(`http://localhost:3000/api/comments/edit-comment/${comment.comment_id}`, values, { headers: { Authorization: localStorage.getItem('token') } }).then(res => console.log(res)) // eslint-disable-line object-curly-newline
      alert('Post has been edited')
    } catch (e) {
      console.log(e)
    }

    setSubmitting(false)
  }

  return (
    <div className="right-part">
      <Formik
        initialValues={{ title: `${comment.text}` }}
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
            <Field type="text" name="text" className="Field" />
            <ErrorMessage name="text" component="div" />
            <button type="submit" disabled={isSubmitting} className="sign">
              Сохранить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default editComment
