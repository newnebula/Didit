import React from 'react';
import { HorizontalBar, Chart } from 'react-chartjs-2';

const MonthGraph = props => {
    Chart.defaults.global.defaultColor= 'rgba(60, 49, 20, 1)';
    const monthDataArray = props.monthData

    let forLabels = []
    let i=0;
    for(i in monthDataArray){
        forLabels.push((Number(i)+1))
    }

    const data = {
        labels: forLabels,
        datasets:[
            {
                label: "Your didits per day!",
                data: monthDataArray,
                // backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                backgroundColor: "rgb(255, 255, 255)",

            }
        ]
    }

    const legend ={
        display: false
    }
    return(
                    <HorizontalBar
                    options={{ scales: {
                                         yAxes: [{
                                             display: true,
                                             scaleLabel: {
                                                 display: true,
                                                 labelString: 'Days of the month',
                                                 fontColor:'#FFFFFF',
                                                 fontSize:20
                                             },
                                             ticks: {
                                                fontColor: "white",
                                                fontSize: 14
                                               }
                                         }],
                                         xAxes: [{
                                             display: true,
                                             scaleLabel: {
                                                 display: true,
                                                 labelString: 'Done didits',
                                                 fontColor: '#FFFFFF',
                                                 fontSize:20
                                             },
                                             ticks: {
                                                   fontColor: "white",
                                                   fontSize: 14,
                                                   stepSize: 1
                                             }
                                         }]
                                  }
                          }} legend={legend} data={data}/>
    )


}

export default MonthGraph
