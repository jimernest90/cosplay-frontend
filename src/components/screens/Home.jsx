import React from 'react'
import Axios from 'axios'
import '../../styles/Home.css'
import { Redirect } from 'react-router-dom'
import AddCostume from '../screens/AddCostume'


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      costumes: [],
      clicked: false
    }
  }
  handleChange =(event) =>{
    console.log(event.target.name)
    this.setState({ [event.target.name]: event.target.value})
  }
  componentDidMount() {
    this.getItems()
  }
  async getItems() {
    const response = await Axios('/costumes')
    // console.log('response',response)
    const data = response.data
    this.setState({
      costumes: data
    })
  }
  handleUpdateCostume = (e, id) => {
    const data = {
      name: this.state.name,
      description: this.state.description,
      img: this.state.img
    }
    Axios.put(`/costumes/${id}`, data)
      .then(updatedCostume => {
      })
      .catch(error => console.log(error))
    window.location.reload(false)
  }
  handleDeleteCostume = (deletedCostume) => {
    fetch(`/costumes/${deletedCostume.id}`, {
      method: 'DELETE'
    })
      .then(json => {
        this.setState(state => {
          const costumes = state.costumes.filter((costume, index) => costume.id !== deletedCostume)
          return {
            costumes,
          }
        })
        window.location.reload(false)
      })
      .catch(error => console.log(error))
  }
  openForm = (id) => {
    console.log('clicked')
    this.setState({
      clicked: true,
      redirectID: id
    })
  }

  render(props) {
    // console.log(this.state.costumes)
    let itemForm = this.state.clicked && <Redirect to={`/itemForm/${this.state.redirectID}`} />


    return (
      this.state.costumes.map((costume, index) => {
        return (
          <div className='cardContainer'>
          <div className='card' key={index}>
            <div className='costumeName'>{costume.name}</div>
            <div className='costume' onClick={() => this.openForm(costume.id)}>
              <img src={costume.img} alt={costume.name} className='costumeImage' width='400px' height='400px' />
              <div className='instructions'>click picture to add an accessory</div>
            </div>
            <div className='costumeDescription'>{`Description: ${costume.description}`}
              <button className='danger' onClick={() => this.handleDeleteCostume(costume)}
              >X</button>
            </div>
            <div className='acc'>Accessories</div>
            <div className='itemContainer'>

              {costume.items.map((item, index) => {
                return (

                  <div className='items' key={index}>
                    <img src={item.img} alt={item.name} className='itemImage' width='400px' height='400px' />
                    <div className='itemName'>{item.name}</div>
                    {/* <button type='submit' 
                className='danger'/> */}
                  </div>

                )
              })}
            </div>
            {itemForm}
            <div className='forms'>
            <div className='editForm'>
            <form className='form' onSubmit={(e) => this.handleUpdateCostume(e, costume.id)}>
            <h1>Edit Costume</h1>
              <input name='image' value={this.state.img} placeholder='image' onChange={this.handleChange} />
              <input name='name' value={this.state.name} placeholder='name' onChange={this.handleChange} />
              <input name='description' value={this.state.description} placeholder='description' onChange={this.handleChange} />
              <button>edit</button>
            </form>
            </div>
            <AddCostume />
            </div>
          </div>
          </div>
        )
      })

    )
  }
}

export default Home;