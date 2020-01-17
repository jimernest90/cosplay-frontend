import React from 'react'
import Axios from 'axios'
import { NavLink } from 'react-router-dom'

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
            <>
            <form className='itemForm' onSubmit={this.addItem}>
            <h2>Add Item</h2>
                <input name='img' value={this.state.img} placeholder='image' onChange={this.handleChange} />
                <input name='name' value={this.state.name} placeholder='name' onChange={this.handleChange} />
                <input name='description' value={this.state.description} placeholder='description' onChange={this.handleChange} />
                <input type='submit' value='add' className='itemButton'/>   
                <NavLink exact to='/'><div className='backButton'>Back</div></NavLink> 
            </form>
           
            </>
            
        )
    }
}
export default ItemForm;