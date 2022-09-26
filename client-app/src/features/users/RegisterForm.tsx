import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';

export default observer(function RegisterForm() {
    const history = useHistory();
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.register(values).then(history.push('/activities')).catch(error =>
                setErrors({ error: 'Invalid email or password' }))}
        >

            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login' color='teal' textAlign='center' />
                    <MyTextInput name='email' placeholder='email' />
                    <MyTextInput name='password' placeholder='password' type='password' />
                    <ErrorMessage
                        name='error' render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />} />

                    <Button loading={isSubmitting} positive content='Login' type='submit' fluid />

                </Form>

            )}

        </Formik>
    )
})