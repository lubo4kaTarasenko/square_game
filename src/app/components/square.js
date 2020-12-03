import React from 'react'

export default class Square extends React.Component {    
  constructor(props) {
    super(props);
    this.state = {
      count: 100,
      letter: '',
      progress: 0,
      points: ''
    }
  }
  render() {
    let count = this.state.count
    let marginT =  (200 - count) / 2  
    return (
      <div className='container'> 
        <div className='grow_field'>
            <div id='score'><b>Score = <span id='numb'>{count}</span></b></div>             
            <div id='max'>             
              <div id='main' style={ { width: count, height: count, marginTop: marginT } }></div>
            </div>        
        </div>
        <span id="plus">{this.state.points}</span>
        <div className='task_field'> 
          <div id='letters' className={this.colorizeProgress()}>{this.state.letter}</div>
          <p><progress id="progress" max="100" value={this.state.progress} 
            style={ { opacity: (this.state.letter ? 100 : 0)}} /></p>   
          <p><button className="start" onClick={()=>{this.startGame()}}>Start</button></p>     
        </div>
      </div>  
  )}
  
  putRandomLetter(){
    if(this.state.letter != '') { 
      const points = 15;
      const newScore = this.state.count - points;
      this.setState({count: newScore, letter: '', points: `- ${points}`});
      this.checkScore(newScore)
      if (newScore <= 0) return 
    }

    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", 
                  "T", "U", "V", "W", "X", "Y", "Z"]
    const letter = letters[Math.floor(Math.random()*letters.length)];
    this.setState({letter: letter, progress: 0, points: '' });
    
    if (this.progressTimer){
      clearInterval(this.progressTimer)
      this.progressTimer = null
    }
    this.progressTimer = setInterval(() => this.showProgress(), 200);
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
    let points = 10
    const progress = this.state.progress
    if (progress >= 50) points = 7
    if (progress >= 70) points = 5
    const count = this.state.count
    const newScore = points + count;
    this.setState({ count: newScore, letter: '' , points: `+ ${points}`});
    this.checkScore(newScore)
  }

  countDown(){
    let points = 20
    const progress = this.state.progress
    if (progress >= 50) points = 23
    if (progress >= 70) points = 25
    const count = this.state.count
    const newScore = count - points;
    this.setState({count: newScore, letter: '', points: `- ${points}`});
    this.checkScore(newScore)
  }

  checkScore(score) {
    if(score >= 200) {
      this.setState({count: 200, points: ''});
      clearInterval(this.timerId)
      clearInterval(this.progressTimer)
      this.progressTimer = null
      alert('Congrats!');
    }

    if(score <= 0) {
      this.setState({count: 0, points: ''});
      clearInterval(this.timerId)
      clearInterval(this.progressTimer)
      this.progressTimer = null
      alert('You are lost!');
    }
  }

  showProgress(){
    const progress = this.state.progress
    let newProgress = progress + 11
    if (progress > 100) newProgress = 0
    this.setState({progress: newProgress});
  }

  colorizeProgress(){
    const progress = this.state.progress
    if (progress < 50) return 'green'
    if (progress >= 50 && progress < 70) return 'yellow'
    if (progress >= 70) return 'red'   
  }

  startGame(){
    this.putRandomLetter() 
    this.timerId =  setInterval(() => this.putRandomLetter(), 2000); 
  }
} 