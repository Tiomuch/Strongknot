import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import PropTypes from 'prop-types'

function EditProfile () {
  const submit = async (values, { setSubmitting }) => {
    const conf = {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }

    try {
      await axios.post('http://localhost:3000/api/other/edit-profile', values, conf).then(res => console.log(res))
      alert('User has been updated')
    } catch (e) {
      console.log(e)
    }

    setSubmitting(false)
  }

  return (
       <div className='left-part'>
         <Formik
           initialValues={{ first_name: `${localStorage.getItem('first_name')}`, last_name: `${localStorage.getItem('last_name')}` }}
           validate={values => {
             const errors = {}
             if (!values.first_name) {
               errors.first_name = 'Required'
             } else if (!values.last_name) {
               errors.last_name = 'Required'
             }
             return errors
           }}
           onSubmit={submit}
         >
           {({ isSubmitting }) => (
             <Form>
               <label><b>Name</b></label>
               <Field type="first_name" name="first_name" placeholder="Enter name" className="Field" />
               <ErrorMessage name="first_name" component="div" />
               <label><b>Last Name</b></label>
               <Field type="last_name" name="last_name" placeholder="Enter last name" className="Field" />
               <ErrorMessage name="last_name" component="div" />
               <button type="submit" disabled={isSubmitting} className="sign">
                 Отправить
               </button>
             </Form>
           )}
         </Formik>
       </div>)
}

export default EditProfile

EditProfile.propTypes = {
  name: PropTypes.string,
  secondName: PropTypes.string
}
