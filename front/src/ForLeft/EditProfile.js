import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import ImageCrop from '../ForHeader/ImageCrop'
import FormData from 'form-data'
import PropTypes from 'prop-types'

function EditProfile ({ name, secondName }) {
  const [id, setId] = useState(48) // eslint-disable-line no-unused-vars
  const [image, setImage] = useState(null) // eslint-disable-line no-unused-vars

  const getImage = (src) => {
    setImage(src)
  }

  const submit = async (values, { setSubmitting }) => {
    values.userid = id

    if (image !== null) {
      const formData = new FormData()
      const config = {
        header: { 'content-type': 'multypart/form-data' }
      }

      formData.append('avatar', image)

      for (const key in values) {
        formData.append(key, values[key])
      }

      console.log(formData)

      try {
        await axios.post(`http://localhost:3000/api/user/edit-user/${id}`, formData, config).then(res => console.log(res))
        alert('User has been updated')
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        await axios.post(`http://localhost:3000/api/user/edit-user/${id}`, values).then(res => console.log(res))
        alert('User has been updated')
      } catch (e) {
        console.log(e)
      }
    }

    setSubmitting(false)
  }

  return (
       <div className='right-part'>
         <Formik
           initialValues={{ name: `${name}`, secondName: `${secondName}` }}
           validate={values => {
             const errors = {}
             if (!values.name) {
               errors.title = 'Required'
             } else if (!values.secondName) {
               errors.secondName = 'Required'
             }
             return errors
           }}
           onSubmit={submit}
         >
           {({ isSubmitting }) => (
             <Form>
               <label><b>Name</b></label>
               <Field type="name" name="name" placeholder="Enter name" className="Field" />
               <ErrorMessage name="name" component="div" />
               <label><b>Second Name</b></label>
               <Field type="secondName" name="secondName" placeholder="Enter second name" className="Field" />
               <ErrorMessage name="secondName" component="div" />
               <label><b>Avatar</b></label>
               <ImageCrop getImage={getImage} />
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
