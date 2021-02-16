import React, {useState} from 'react'
import {connect} from 'react-redux'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'

import './sign-in.styles.scss'

const SignIn = ({googleSignInStart, emailSignInStart}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async event => {
        event.preventDefault()

        emailSignInStart({email, password})
    }

    return(
        <div className='sign-in'>
            <h2>I alreadyhave an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    name='email'
                    type='email'
                    value={email}
                    handleChange={(e) => setEmail(e.target.value)}
                    label='email'
                    required
                />

                <FormInput
                    name='password'
                    type='password'
                    value={password}
                    handleChange={(e) => setPassword(e.target.value)}
                    label='password'
                    required
                />

                <div className='buttons'>
                    <CustomButton type='submit' value="Submit" >
                        Sign in
                    </CustomButton>

                    <CustomButton
                        type='button'
                        onClick={googleSignInStart}
                        isGoogleSignIn
                    >
                        Sign in with google
                    </CustomButton>
                </div>

            </form>
        </div>
    )

}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart(email, password))
})

export default connect(null, mapDispatchToProps)(SignIn)