import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

  constructor(props) {
  super(props);
  this.state = {
    response: '',
    post: '',
    responseToPost: '',
    option:'Single',
    selText: ''
  };
  this.handleOptionChange = this.handleOptionChange.bind(this);
  this.handleSelTextChange = this.handleSelTextChange.bind(this)
  }

  componentDidMount() {
  }

  handleOptionChange(event, index, value) {
    this.setState({ responseToPost: false });
    this.setState({ option: value });
  }

  handleSelTextChange(e) {
    var st = window.getSelection().toString();
    //alert('selText1:'+st);
    const response = fetch('/api/selectedText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selText: st, opt:this.state.option}),
    })
    .then(res => res.json())
    .then(resp => {
      //alert('res1:'+resp.result);
      this.setState({ responseToPost: resp.result });
    })
    .catch(err => {
      console.log(err)
    });

  }

  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <header className="App-header">
        </header>
        
        <form onSubmit={this.handleSubmit}>

        <p onMouseUp={this.handleSelTextChange}>
        India (ISO: Bhārat), also known as the Republic of India (ISO: Bhārat Gaṇarājya),[18][e] is a country in South Asia. It is the seventh largest country by area and with more than 1.3 billion people, it is the second most populous country as well as the most populous democracy in the world. Bounded by the Indian Ocean on the south, the Arabian Sea on the southwest, and the Bay of Bengal on the southeast, it shares land borders with Pakistan to the west;[f] China, Nepal, and Bhutan to the northeast; and Bangladesh and Myanmar to the east. In the Indian Ocean, India is in the vicinity of Sri Lanka and the Maldives, while its Andaman and Nicobar Islands share a maritime border with Thailand and Indonesia.
        The Indian subcontinent was home to the urban Indus Valley Civilisation of the 3rd millennium BCE. In the following millennium, the oldest scriptures associated with Hinduism began to be composed. Social stratification, based on caste, emerged in the first millennium BCE, and Buddhism and Jainism arose. Early political consolidations took place under the Maurya and Gupta empires; later peninsular Middle Kingdoms influenced cultures as far as Southeast Asia. In the medieval era, Judaism, Zoroastrianism, Christianity, and Islam arrived, and Sikhism emerged, all adding to the region's diverse culture. Much of the north fell to the Delhi Sultanate; the south was united under the Vijayanagara Empire. The economy expanded in the 17th century in the Mughal Empire. In the mid-18th century, the subcontinent came under British East India Company rule, and in the mid-19th under British Crown rule. A nationalist movement emerged in the late 19th century, which later, under Mahatma Gandhi, was noted for nonviolent resistance and led to India's independence in 1947.   
        </p>

        <SelectField
        floatingLabelText="Select options"
        value={this.state.option}
        onChange={this.handleOptionChange} >
        <MenuItem key="Single" value="Single" primaryText="Single" />
        <MenuItem key= "Multiple" value="Multiple" primaryText="Multiple" />
        <MenuItem key= "Vowel" value="Vowel" primaryText="Vowel" />
        </SelectField>
        </form>
        
        <footer className="App-result">        
        <p>{this.state.responseToPost}</p>
        </footer>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
