import React from 'react'

export default class Square extends React.Component {    
  constructor(props) {
    super(props);
    this.state = {
     // square = []
    }
  }
  render() {
    return (
      <div className='container'> 
        <div className='grow_field'>
            <div id='score'><b>Score = <span id='numb'>100</span></b></div> 
            <div id='max'><div id='main'></div></div>        
        </div>
        <div className='task_field'> 
          <div id='letters'></div>    
          <button className="start" onClick={()=>{this.startGame()}}>Start</button>     
        </div>
      </div>  
  )}
  
  returnRandomLetter(){
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", 
                  "T", "U", "V", "W", "X", "Y", "Z"]
    var letter = letters[Math.floor(Math.random()*letters.length)];
    return letter
  }

  putLetter(letter){
    const lettersCont = document.getElementById('letters')
    lettersCont.innerHTML = `<b>${letter}</b>`
    this.isLetterEq(letter)
  }

  isLetterEq(letter){
    document.addEventListener('keydown', function(event) {
      if (event.code === `Key${letter}`) this.countUp()
    })
  }

  countUp(){
    const points = 10
    const count = document.getElementById('numb')
    let countVal = count.value
    count.innerHTML = `${countVal += points}`
  }

  countDown(){

  }


  startGame(){
    //let timerId = 
    setInterval(() => this.putLetter(this.returnRandomLetter()), 3000);
    //setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);    
  }




} 