import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'

function editArticle ({ post }) {
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
      await axios.post(`http://localhost:3000/api/posts/edit-post/${post.id}`, values, { headers: { Authorization: localStorage.getItem('token') } }).then(res => console.log(res)) // eslint-disable-line object-curly-newline
      alert('Post has been edited')
    } catch (e) {
      console.log(e)
    }

    setSubmitting(false)
  }

  return (
    <div className="left-part">
      <Formik
        initialValues={{ title: `${post.title}`, description: `${post.description}` }}
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
            <Field type="title" name="title" className="Field" />
            <ErrorMessage name="title" component="div" />
            <label><b>Description</b></label>
            <Field type="description" name="description" className="Field" />
            <ErrorMessage name="description" component="div" />
            <button type="submit" disabled={isSubmitting} className="sign">
              Сохранить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default editArticle
