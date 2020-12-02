import React from 'react'

export default class Square extends React.Component {    
  constructor(props) {
    super(props);
    this.state = {
      //square
    }
  }
  render() {
    return (
      <div className='container'> 
        <div className='grow_field'>
            <div id='score'><b>Score = 100</b></div> 
            <div id='main'></div>         
        </div>
        <div className='task_field'> 
          <div id='letters'></div>         
        </div>
      </div>  
  )}  
}