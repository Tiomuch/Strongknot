import React from 'react'
import Button from '@material-ui/core/Button'
// import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
// import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
// import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'

export default function FormDialog () {
  const [open, setOpen] = React.useState(false)

  const submit = async (values, { setSubmitting }) => {
    const Dat = new Date()
    let mon
    if ((Dat.getMonth() + 1) < 10) {
      mon = '0' + (Dat.getMonth() + 1)
    } else {
      mon = (Dat.getMonth() + 1)
    }
    values.date = Dat.getFullYear() + '-' + mon + '-' + Dat.getDate()
    values.userid = 47 // реализую позже
    try {
      await axios.post('http://localhost:3000/api/posts/create-post', values).then(res => console.log(res))
      alert('Post has been sent')
    } catch (e) {
      console.log(e)
    }

    setSubmitting(false)
    handleClose()
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Article
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Article</DialogTitle>
        <DialogContent>
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
                <button type="submit" disabled={isSubmitting} className="sign">
                  Отправить
                </button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  )
}
