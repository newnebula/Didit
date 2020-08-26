import React from 'react';
import { Bar, Chart } from 'react-chartjs-2';

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
                backgroundColor: "rgb(0, 0, 0)",

            }
        ]
    }

    const legend ={
        "labels": { "fontColor": "rgb(0,0,0)"}

    }
    return(
                    <Bar
                    options={{ maintainAspectRatio: true, responsive:true }} legend={legend} data={data}/>
    )


}

export default MonthGraph
