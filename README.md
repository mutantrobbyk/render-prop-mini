<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250" align="right">

# Project Summary

In this project, we will practice using Render Props.  "A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic" - react docs

## Setup

- `cd` into the project directory.
- Run `create-react-app ./`.
- Remove the service worker from `src/index.js`:
  - Delete `import registerServiceWorker from './registerServiceWorker';`
  - Delete `registerServiceWorker();`
- Run `npm start`.
- In a seperate terminal, `cd` into the project directory.
- Create the following folders inside of src
  - components

## RP 1

### Summary

The goal for this project is to use the `Render Prop` pattern to create a `Form` component, that will handle form state, but for any type of form. Let's take a look real quick at what a typical LoginForm component looks like.
```jsx
class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    //do something with form data...
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text "onChange={this.handleEmailChange} placeholder="email" />
        <input type="password" onChange={this.handlePasswordChange} placeholder="password" />
        <button type="submit">Submit</button>
      </form>
    )
  }
}
``` 
So, here we have a LoginForm component that keeps track of the users email and password on the components state.  When a user types into the `email` input field, we have a `handleEmailChange` callback function that will update state with the new value for their email.  The same goes for the password input field. The idea with using the render props pattern to create a `Form` component, is that this component will work for any type of form, without knowing what input fields it will have.  So we will want to create a more generic way of keeping track of, and updating state.  We will do this by adding a `name` attribute to the input fields, that we can access from `e.target.name`.  This way we can have one method `handleChange` that will work with any input field.

### Step 1

- Inside the components folder, create the following file:
  - Form.js
- Create a class Component `Form` that has `handleChange`, `handleSubmit`, and `render` methods:  
  - We want this component to be able to work for any type of form (i.e. Login or Registration), so the `handleChange` method should use the `name` attribute on the event target for the key on the object we pass into setState.  
  - Let's have `handleSubmit` just log `this.state` to the console.  
  - In the `render` method, create an object called `form` that has the `handleChange` and `handleSubmit` methods, and then return the render method on `props` invoked, and pass in the form object.
 
### Solution

<details>

<summary> <code> ./src/components/Form.js </code> </summary>

```jsx
import { Component } from 'react'

export default class Form extends Component {
  handleChange = e => {
    let { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    console.log('form data:', this.state)
  }

  render() {
    let form = {
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit
    }
    return this.props.render(form)
  }
}
```

</details>

### Step 2

- Inside the components folder, create the following files:
  - LoginForm.js
  - RegistrationForm.js
- In `LoginForm.js` import `React` and our `Form` component.
- Create a function component `LoginForm`.
- `LoginForm` will render the `Form` component, and we will pass a `render` prop to the `Form` component.  The render prop will be equal to a function that returns the jsx code for our login form.  This is the function that is invoked in the render method of our `Form` component.
- Now, in the `RegistrationForm.js` file we will do the same thing as the `LoginForm.js` file, excpet the render prop function with return the jsx code for a registration form instead.

### Solution

<details>

<summary> <code> ./src/components/LoginForm.js </code> </summary>

```jsx
import React from 'react'

import Form from './Form'

export default function(props) {
  return (
    <Form render={form => {
      return (
        <div>
          <h1>Login Form</h1>
          <input 
            type="text" 
            name="email" 
            placeholder="email"
            onChange={form.handleChange}/>
          <input 
            type="text" 
            name="password" 
            placeholder="password"
            onChange={form.handleChange}/>
          <button onClick={form.handleSubmit}>submit</button>
        </div>
      )
    }}/>
  )
}
```

</details>

<details>

<summary> <code> ./src/components/RegistrationForm.js </code> </summary>

```jsx
import React from 'react'

import Form from './Form'

export default function(props) {
  return (
    <Form render={form => {
      return (
        <div>
          <h1>Registration Form</h1>
          <input 
            type="text" 
            name="name" 
            placeholder="name"
            onChange={form.handleChange}/>
          <input 
            type="text" 
            name="email" 
            placeholder="email"
            onChange={form.handleChange}/>
          <input 
            type="text" 
            name="password" 
            placeholder="password"
            onChange={form.handleChange}/>
          <input 
            type="text" 
            name="confirmPassword" 
            placeholder="confirm Password"
            onChange={form.handleChange}/>
          <button onClick={form.handleSubmit}>submit</button>
        </div>
      )
    }}/>
  )
}
```

</details>

### Step 3

- In App.js, bring in our newly created `LoginForm` and `RegistrationForm` components and add them to the jsx code in the render method.

### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```jsx
import React, { Component } from 'react';
import './App.css';

import SuperSecret from './components/SuperSecret'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginForm />
        <RegistrationForm />
      </div>
    );
  }
}

export default App;
```

</details>

## Black Diamond

Create this same Form component using the Higher-Order Component pattern instead.

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250">
</p>
