import React from 'react'

const CostumeForm = (props) => {
	return(
		<form className='form' onSubmit ={props.onSubmit}>
			<input name='image' value={props.img} placeholder='image' onChange={props.onChange}/>
			<input name='name' value={props.name} placeholder='name' onChange={props.onChange}/>
			<input name='description' value={props.description} placeholder='description' onChange={props.onChange}/>
		</form>
	)
}
export default CostumeForm;