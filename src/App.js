import React, { Component } from 'react';
import './App.scss';
import Car from './car/car'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
import Counter from './Counter/Counter'

export const ClickedContext = React.createContext(false)
class App extends Component {

  constructor(props){
    console.log('App constructor')
    super(props)
    this.state = {
      clicked: false,  
      cars: [
        { name: 'Ford', year: 2019  },
        { name: 'Audi', year: 2016  },
        { name: 'Mazda', year: 2008  }
      ],
      pageTitle: 'React components',
      showCars: false
    };
  }
  
  toggleCarsHandler = () => {
    this.setState({
      showCars: !this.state.showCars
    })
  };
  onChangeName = (name, index) => {
   
   const car = this.state.cars[index]
   car.name = name
   const cars = [...this.state.cars]
   cars[index] = car
   this.setState({ cars })
  }

  deleteHandler(index)  {
    const cars = this.state.cars.concat()
    cars.splice(index,1)
    this.setState({cars})

  }
  
  componentWillMount() {
		console.log("TCL: App -> componentWillMount -> M")
    
  }
  componentDidMount() {
		console.log("TCL: App -> componentDidMount -> M")
    
  }
  
  render() {
    console.log("render")
    const divStyle = {
      'textAlign': 'center'
    };

    let cars = null

    if (this.state.showCars) {
      cars = this.state.cars.map((car, index) => {
            return ( 
            <ErrorBoundary key = { index } >
              < Car 
                name = { car.name } 
                year = { car.year }
                index = {index}
                onDelete={this.deleteHandler.bind(this, index)}
                onChangeName = { event => this.onChangeName(event.target.value, index)}
              />
            </ErrorBoundary>
            )
          })
    }
    return ( < div style = { divStyle } >
      {/* <h1> { this.state.pageTitle } </h1>          */}
      <h1>{this.props.title}</h1>

      <ClickedContext.Provider value={this.state.clicked}>
      <Counter  />
      </ClickedContext.Provider>
      <hr/>
      <button style = {{marginTop:'10px'}} className={'AppButton'} onClick = {  this.toggleCarsHandler}>Toggle cars </button>
      <button onClick={() => this.setState({clicked: true})}>Change clicked</button>
      <div style={{
        width: 400,
        margin: 'auto',
        paddingTop: '20px'

      }}>
       { cars }
      </div> 
      </div>        
    );
  }
}

export default App;