import React from 'react';
import {Line} from 'react-chartjs-2';
import moment from 'moment';
import { Container, Row, Col} from 'reactstrap';

const ba = require('bitcoinaverage');

 
var publicKey = 'Nzg0MzMxNDMyM2UwNDAzYjhjYmRhYjMwYzcxZGQ4YjU';
var secretKey = 'OGQyMWM4NTUwNjhmNGY5ZWFjYWQzMmFiYzdkZGFmMGE3YTQ0NTU5YjhmNWE0MTJhOTU4MWJlY2IxN2ViMjUxYQ';
 
var restClient = ba.restfulClient(publicKey, secretKey);
var wsClient = ba.websocketClient(publicKey, secretKey);


export default class App extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {  myArray:[],  myArray1:[], last:'' ,low:'',high:'',open:'', timer:'3000'};
  }

  async componentDidMount(){
   this.timer = setInterval(()=> this.apiCall('1s'), this.state.timer) 
   //this.apiCall();
  }


 apiCall= (tym) =>{
  var symbol_set = 'global';
  var symbol = 'BTCUSD';
  restClient.getTickerDataPerSymbol('global', 'BTCUSD',(response)=> {
   console.log(JSON.parse(response));
     let price = JSON.parse(response)
    let dat = price.last
   
     let dat1 = moment().format('h:mm:ss a');
    this.setState({myArray:[...this.state.myArray,dat],myArray1:[...this.state.myArray1,dat1], last:price.last, high: price.high,low:price.low,open:price.open.day})
     return true;
 }, function(error){
     console.log(error);
     return false;
 }) 

}

render() {    
const states = {
  labels: this.state.myArray1,
  fontColor: "#323130",    
  datasets: [
    {
      label: 'BTC-USD',
      lineTension: 0.2,
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "black",
      borderWidth: -2,
      data: this.state.myArray,
      position:'right',
      

    }
    
  ],
  
}
    return (
      <div>
      

        <Container>   
          <Row md={4}>
            <Col>Last : {this.state.last} </Col>
            <Col>Open :{this.state.open}</Col>
            <Col>High :{this.state.high}</Col>
            <Col>Low :{this.state.low}</Col>
          </Row>
        </Container>
        <Line
          data={states}
          options={{
            title:{
              display:true,
              text:'BITCOIN - US DOLLARS',
              fontSize:20,
              
            },
            legend:{
              display:true
            }
          }}
        />
      </div>
    );
  }
}

