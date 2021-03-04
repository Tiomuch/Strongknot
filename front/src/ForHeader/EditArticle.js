import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'

function editArticle () {
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
        onSubmit={async (values, { setSubmitting }) => {
          values.date = new Date()
          values.userid = 47 // реализую позже

          try {
            await axios.put('http://localhost:3000/api/posts/create-post', values).then(res => console.log(res))
            alert('Post has been sent')
            // const data = await result.json() // eslint-disable-line no-unused-vars
          } catch (e) {
            console.log(e)
          }

          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label><b>Title</b></label>
            <Field type="title" name="title" placeholder="Enter Title" className="Field" />
            <ErrorMessage name="title" component="div" />
            <label><b>Description</b></label>
            <Field type="description" name="description" placeholder="Enter Description" className="Field" />
            <ErrorMessage name="description" component="div" />
            <button type="submit" disabled={isSubmitting} className="sign">
              Отправить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default editArticle
