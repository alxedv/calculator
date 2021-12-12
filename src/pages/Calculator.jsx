import { Component } from 'react'
import '../style/Calculator.css';

export default class Calculator extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.clearNum = this.clearNum.bind(this);
    this.deleteNum = this.deleteNum.bind(this);
    this.funcBtn = this.funcBtn.bind(this);
    this.equal = this.equal.bind(this);

    this.state = {
      selectedNum: '',
      reserved: 0,
      isResult: false,
      operator: '',
    }
  }

  handleClick({ target }) {
    const { isResult } = this.state;
    isResult && this.setState({
      selectedNum: '',
      isResult: false,
    })
    this.setState((prevState) => ({ selectedNum: prevState.selectedNum +target.value }))
  }

  funcBtn({ target }){
    const { selectedNum } = this.state;
    this.setState({ 
      reserved: selectedNum,
      selectedNum: '',
      operator: target.value,
     })
  }

  equal() {
    const { reserved, selectedNum, operator } = this.state;
    const floatSelected = parseFloat(selectedNum);
    const floatReserved = parseFloat(reserved);
    let equal = 0;
    switch(operator) {
      case '+':
        equal = floatReserved + floatSelected;
        break;
      case '-':
        equal = floatReserved - floatSelected;
        break;
      case '*':
        equal = floatReserved * floatSelected;
        break;
      case '/':
        equal = floatReserved / floatSelected;
        break;
      default:
        break;
    }
    this.setState({ selectedNum: String(equal), isResult: true, operator: '' })
  }

  clearNum() {
    this.setState({ selectedNum: '', operator: ''})
  }

  deleteNum() {
    const { selectedNum } = this.state;
    const newNumbers = selectedNum.slice(0, -1);
    this.setState({ selectedNum: newNumbers })
  }

  render() {
    const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '00'];
    const { selectedNum, operator } = this.state;
    return (
      <div className="calculator">
        <div className="display">
          <div>
            { selectedNum }
          </div>
          <div>
            { operator }
          </div>
        </div>
        <div className="erase-div">
            <button
              className="clear"
              onClick={ this.clearNum }
              >
              CLEAR
            </button>
            <button
              className="delete"
              onClick={ this.deleteNum }
            >
              DELETE
            </button>
          </div>
        <div className="buttons">
          <div className="number-buttons">
            {buttons.map((element) => (
              <button 
              className="button"
              onClick={ this.handleClick }
              value={ element }
              >
                { element }
              </button>
            ))}
          </div>
          <div className="function-buttons">
            <button onClick={ this.funcBtn } value="+">+</button>
            <button onClick={ this.funcBtn } value="-">-</button>
            <button onClick={ this.funcBtn } value="*">X</button>
            <button onClick={ this.funcBtn } value="/">/</button>
            <button onClick={ this.equal }>=</button>
          </div>
        </div>
      </div>
    )
  }
}
