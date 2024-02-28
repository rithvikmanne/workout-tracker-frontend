import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

import axios from 'axios';

const WeightChart = () => {

    const [data, setData] = useState([]);

    const formatDate = (date) => {
        const dateStr = date.split('-');
        const year = dateStr[0];
        const day = dateStr[1];
        const month = dateStr[2];
        return new Date(year + ',' + day + ',' + month);
    }

    const valueFormatter = (date) =>
        date.getHours() === 0
            ? date.toLocaleDateString('fr-FR', {
                month: '2-digit',
                day: '2-digit',
            })
            : date.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
            });

    const getWeights = () => {
        try {
            const response = axios.get('http://localhost:8080/weights/all', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                let weightsArr = [];
                let datesArr = [];
                // console.log(response.data);
                setData(response.data);
                response.data.forEach(element => {
                    element.date = formatDate(element.date);
                    // weightsArr.push(formatDate(element.date));
                    // datesArr.push(element.value);
                });
                console.log(data);
                // setWeights(weightsArr);
                // setDates(datesArr);
            })
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getWeights();
        console.log(data);
    }, [])

    return (
        <LineChart
            xAxis={[
                {
                    dataKey: 'date',
                    scaleType: 'time',
                    valueFormatter,
                    tickMinStep: 3600 * 1000 * 24, // min step: 24h

                    //   valueFormatter: (value) => (value.toString())
                },
            ]}
            series={[{
                dataKey: 'value',
                showMark: true, 
            }]}
            dataset={data}
            width={700}
            height={500}
        />
    )

}

export default WeightChart;