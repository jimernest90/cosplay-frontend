import React from 'react'
import Axios from 'axios'

export default class AddCostume extends React.Component {
    constructor() {
        super()
        this.state = {
           img:'',
           name: '',
           description:'' 
        }
    }
    onChange = (e) => {

        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onSubmit = async(e) => {
        // e.preventDefault()
        await Axios.post('/costumes', {
            img:this.state.img,
            name:this.state.name,
            description:this.state.description
        })
    }
    render() {
        console.log(this.state)
        return (
            <div className='form'>
            <div className='form-title'>
            <h1>Add Costume</h1>
            </div>  
            <div className='form-content'>  
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text" 
                        name="img" 
                        placeholder='image url'
                        value={this.state.img}
                        onChange={(e) => this.onChange(e)} />
                    <input 
                        type="text"
                        name="name"
                        placeholder='name'
                        value={this.state.name}
                        onChange={(e) => this.onChange(e)} />
                    <input 
                        type="text" 
                        value={this.state.description} 
                        placeholder='description'
                        name="description" 
                        onChange={(e) => this.onChange(e)} /> 
                    <button type="submit" value="Add" className='submit-button'>Add</button>
                </form>
                </div>
            </div>
        )
    }
}