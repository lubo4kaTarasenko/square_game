import React from 'react'

export default class Square extends React.Component {    
  constructor(props) {
    super(props);
    this.state = {
      count: 100,
      letter: '',
      progress: 0
    }
  }
  render() {
    let count = this.state.count
    let marginT =  (200 - count) / 2  
    return (
      <div className='container'> 
        <div className='grow_field'>
            <div id='score'><b>Score = <span id='numb'>{count}</span></b></div> 
            <div id='max'><div id='main' style={ { width: count, height: count, marginTop: marginT } }>
            </div></div>        
        </div>
        <div className='task_field'> 
          <div id='letters'>{this.state.letter}</div>
          <p><progress id="progress" max="60" value={this.state.progress} 
            style={ { opacity: (this.state.letter ? 100 : 0)} } /></p>   
          <p><button className="start" onClick={()=>{this.startGame()}}>Start</button></p>     
        </div>
      </div>  
  )}
  
  putRandomLetter(){
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", 
                  "T", "U", "V", "W", "X", "Y", "Z"]
    var letter = letters[Math.floor(Math.random()*letters.length)];
    this.setState({letter: letter, progress: 0 })
    if (this.progressTimer){
      clearInterval(this.progressTimer)
      this.progressTimer = null
    }
    this.progressTimer = setInterval(() => this.showProgress(), 500);
  }

  componentDidMount() {
    this.isLetterEq()
  }

  isLetterEq(){
    document.addEventListener('keydown', (event) => {
      event.code === `Key${this.state.letter}` ? this.countUp() : this.countDown();
    })
  }

  countUp(){
    const points = 10
    const count = this.state.count
    const newScore = points + count;
    this.setState({ count: newScore, letter: '' });
    this.checkScore(newScore)
  }

  countDown(){
    const points = 20
    const count = this.state.count
    const newScore = count - points;
    this.setState({count: newScore, letter: ''});
    this.checkScore(newScore)
  }

  checkScore(score) {
    if(score >= 200) {
      clearInterval(this.timerId)
      alert('Congrats!');
    }

    if(score <= 0) {
      clearInterval(this.timerId)
      alert('You are lost!');
    }
  }

  showProgress(){
    const progress = this.state.progress
    let newProgress = progress + 10
    if (progress > 60) newProgress = 0
    this.setState({progress: newProgress});
  }

  startGame(){
    this.putRandomLetter() 
    this.timerId =  setInterval(() => this.putRandomLetter(), 3000); 
  }
} 