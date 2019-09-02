import React, {Component} from 'react'

export default class Form extends Component {
    handleChange = e => {
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit = e => {
        console.log('Form data:', this.state)
    }
    render() {
        let form = {
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit
        }
        return this.props.render(form)
    }
}