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
  handleUpdateCostume = () =>{

  }
  handleDeleteCostume = (deletedCostume) => {
    fetch(`/costumes/${deletedCostume.id}`,{
      method: 'DELETE'
    })
    .then(json=>{
      this.setState(state => {
        const costumes = state.costumes.filter((costume, index)=> costume.id !== deletedCostume) 
        return {
          costumes,
        }
      })
      window.location.reload(false)
    })
    .catch(error => console.log(error))
   }
   openForm = (id) =>{
     console.log('clicked')
     this.setState({
       clicked: true,
       redirectID: id
     })
   }

  render(props) {
    // console.log(this.state.costumes)
    let itemForm = this.state.clicked && <Redirect to={`/itemForm/${this.state.redirectID}`}/>
    
    
    return (
      this.state.costumes.map((costume, index) => {
        return (
          
        <div className='card' key={index}>
          <div className='costumeName'>{costume.name}</div>
          <div className='costume'onClick={()=>this.openForm(costume.id)}>
                  <img src={costume.img} alt={costume.name} className='costumeImage' width='400px' height='400px'/>
                    </div>
          <div className='costumeDescription'>{`Description: ${costume.description}`}
          <button className='danger' onClick={()=> this.handleDeleteCostume(costume)} 
          >Delete</button>
          </div>
          <div className='acc'>Accessories</div>
          <div className='itemContainer'>
            
          {costume.items.map((item, index) => {
            return (
              
              <div className='items' key={index}>
                <img src={item.img} alt={item.name} className='itemImage' width='400px' height='400px'/>
                <div className='itemName'>{item.name}</div>
                {/* <button type='submit' 
                className='danger'/> */}
                </div>
                
            )
          })}
          </div>
          {itemForm}
          <AddCostume/>
        </div>
        
     
        )
      })
    
    )
  }
}

export default Home;