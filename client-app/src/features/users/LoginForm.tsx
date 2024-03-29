import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';

export default observer(function LoginForm() {
    const history = useHistory();
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.login(values).then(history.push('/activities')).catch(error =>
                setErrors({ error: 'Invalid email or password' }))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),

            })
            }
        >

            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign Up' color='teal' textAlign='center' />
                    <MyTextInput name='displayName' placeholder='Display name' />
                    <MyTextInput name='username' placeholder='Username' />
                    <MyTextInput name='email' placeholder='email' />
                    <MyTextInput name='password' placeholder='password' type='password' />
                    <ErrorMessage
                        name='error' render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />} />

                    <Button disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} positive content='Regsiter' type='submit' fluid />

                </Form>

            )}

        </Formik >
    )
})