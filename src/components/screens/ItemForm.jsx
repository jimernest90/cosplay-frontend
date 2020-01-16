import React from 'react'
import Axios from 'axios'

class ItemForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        
      }
    }
    addItem = () => {
        let body = {
            img: this.state.img,
            name: this.state.name,
            description: this.state.description
        }
        
         let getItem = Axios.post(`/costumes/${this.props.match.params.id}/items`, body)
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        console.log(this.props)
        return (
            <form className='form' onSubmit={this.addItem}>
                <input name='img' value={this.state.img} placeholder='image' onChange={this.handleChange} />
                <input name='name' value={this.state.name} placeholder='name' onChange={this.handleChange} />
                <input name='description' value={this.state.description} placeholder='description' onChange={this.handleChange} />
                <input type='submit' value='add' />
            </form>
            
        )
    }
}
export default ItemForm;