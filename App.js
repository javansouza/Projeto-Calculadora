import React, {Component} from 'react'
import {StyleSheet, Text, View, ScrollView} from 'react-native'
import Button from './src/components/Button'
import Display from './src/components/Display'
import DisplayMemory from './src/DisplayMemory'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
  displayMemory: '',
  operationIndex: 0,
  operationBool: false,
  equalBool: false,
}

export default class App extends Component{

  state = {...initialState}

  addDigit = n => {

    this.setState({operationBool: false})   
    this.setState({equalBool: false})
   
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
   
      if(n === '.' && this.state.displayValue.includes('.') && this.state.clearDisplay === false){
        return
      }
    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n 
    this.setState({displayValue, clearDisplay: false, displayMemory: '' + this.state.displayMemory + n })
    
      if(n !== '.'){
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values [this.state.current] = newValue
      this.setState({ values })
    }

    
        
  }

  clearMemory = () => {
    this.setState({...initialState})
  }

  setOperation = operation => {     
    if(this.state.equalBool === false || operation !== '='){
      if(this.state.operationBool === false){
        this.setState({operationBool: true})
        this.setState({displayMemory: this.state.displayMemory + ' ' + operation + ' '})   

        if(this.state.operation !== null && operation !== null){    

        this.state.values[0] = eval(`${this.state.values[0]} ${this.state.operation} ${this.state.values[1]}`)  

          if(operation === '=' && this.state.equalBool === false){       
          this.setState({equalBool: true})
          this.setState({operationBool: false})
          this.setState({current: 1, operation: null, clearDisplay: true, displayValue: this.state.values[0] })             
          this.setState({displayMemory: this.state.displayMemory + ' ' + operation + ' ' + this.state.values[0]}) 
          this.state.values[1] = 0             
          }else{
             
           // this.state.values[0] = eval(`${this.state.values[0]} ${this.state.operation} ${this.state.values[1]}`)    
            this.setState({current: 1, operation,  clearDisplay: true, displayValue: this.state.values[0]})        
            if(this.state.operationBool === true){
              this.setState({displayMemory: this.state.displayMemory + ' ' + operation + ' '})
            }else{
              this.setState({displayMemory: this.state.displayMemory + ' ' + '=' + ' ' + this.state.values[0] + ' ' + operation + ' '}) 
            }       
           
           
           }
                
        
        }else{
          this.setState({current: 1, operation,  clearDisplay: true}) 
        }     
        
      }                 
         
    }
  }

  mudarSinal = () => {
    this.setState({displayValue: this.state.displayValue * -1})
    this.state.values[this.state.current] =  this.state.values[this.state.current] * -1
    if(this.state.values[this.state.current] === 0){
      this.setState({displayMemory: this.state.displayMemory + '  +/-  ' + this.state.values[this.state.current-1]}) 
    }else{
      this.setState({displayMemory: this.state.displayMemory + '  +/-  ' + this.state.values[this.state.current]}) 
    }
    
  }

  render(){
    return(      
      <View style={styles.container}>
        <DisplayMemory value={this.state.displayMemory}></DisplayMemory>             
        <Display value={this.state.displayValue}></Display>
        <View style={styles.buttons}>
          <Button label='AC' double onClick={this.clearMemory}/>
          <Button label='+/-' onClick={this.mudarSinal}/>          
          <Button label='/' operation onClick={() => this.setOperation('/')}/>
          <Button label='7' onClick={() => this.addDigit(7)} />
          <Button label='8' onClick={() => this.addDigit(8)}/> 
          <Button label='9' onClick={() => this.addDigit(9)}/>
          <Button label='*' operation onClick={() => this.setOperation('*')}/>
          <Button label='4' onClick={() => this.addDigit(4)}/>
          <Button label='5' onClick={() => this.addDigit(5)}/>
          <Button label='6' onClick={() => this.addDigit(6)}/>
          <Button label='-' operation onClick={() => this.setOperation('-')}/>
          <Button label='1' onClick={() => this.addDigit(1)}/>
          <Button label='2' onClick={() => this.addDigit(2)}/>
          <Button label='3' onClick={() => this.addDigit(3)}/>
          <Button label='+' operation onClick={() => this.setOperation('+')}/>
          <Button label='0' double onClick={() => this.addDigit(0)}/>
          <Button label='.'onClick={() => this.addDigit('.')}/>
          <Button label='='operation onClick={() => this.setOperation('=')}/>
        </View>
      </View>
    );

  }


} 

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },

  buttons:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
  
    
})