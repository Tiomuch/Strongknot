import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'

function editArticle ({ post }) {
  return (
    <div className="right-part">
      <Formik
        initialValues={{ title: `${post.title}`, description: `${post.description}` }}
        validate={values => {
          const errors = {}
          if (!values.title) {
            errors.title = 'Required'
          }
          return errors
        }}
        onSubmit={async (values, { setSubmitting }) => {
          values.date = new Date()
          values.userid = post.userid
          values.id = post.id

          try {
            await axios.put(`http://localhost:3000/api/posts/edit-post/${post.id}`, values).then(res => console.log(res))
            alert('Post has been edited')
          } catch (e) {
            console.log(e)
          }

          setSubmitting(false)
        }}
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
