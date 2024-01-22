import React from 'react';
import { View } from 'react-native';
import Plotly from 'react-native-plotly';

export default class Stock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            stockChartsXValues: [],
            stockChartsYValues: []
        }
    }
    componentDidMount(){
        this.fetchStock();
    }
    fetchStock(){
        const pointerToThis = this;
        console.log(pointerToThis);
        const API_KEY = 'P3VDO0WF8RJ48BDF';
        let stockSymbol = 'MSWFT';
        let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=compact&apikey=demo${API_KEY}`;
        let stockChartsXValuesFunction = [];
        let stockChartsYValuesFunction = [];

        fetch(API_CALL)
        .then(
            function(response){
                return response.json();
            }
        )

        .then(
            function(data) {
                for (var key in data['Time Series (Daily)']){
                    stockChartsXValuesFunction.push(key);
                    stockChartsYValuesFunction.push(data['Time Series (Daily)'][key]['1. open'] );
                }

                pointerToThis.setState({
                    stockChartsXValues: stockChartsXValuesFunction,
                    stockChartsYValues: stockChartsYValuesFunction,
                    
                })
            }
        )
    }

    render(){
        return(
            <View>
            <View>
                <Plotly
                data={
                    [
                        {
                            x: this.state.stockChartsXValues,
                            y: this.state.stockChartsYValues,
                            type:'scatter',
                            mode:'lines+markers',
                            marker:{color:'red'},
                        },
                    ]
                } layout={{width:320, height:340, title: 'Stocks'}} />
            </View>
            </View>
        );
    }
}