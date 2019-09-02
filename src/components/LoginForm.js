import React from 'react'
import Form from './Form'

export default function LoginForm(props) {
    return(
        <Form
        render={
            form => {
                return (
                    <div>
                        <h1>LOGIN FORM</h1>
                        <input type="text" name= 'email' placeholder='email' onChange={form.handleChange}/>
                        <input type="text" name='password' placeholder='password' onChange={form.handleChange}/>
                        <button onClick={form.handleSubmit}>SUBMIT</button>
                    </div>
                )
            }
        }
        />
    )
}