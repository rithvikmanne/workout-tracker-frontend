import { useEffect, useState } from 'react';


import MainCard from "ui-component/cards/MainCard";
import Grid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';
import { TextField } from "@mui/material";
import SubCard from 'ui-component/cards/SubCard';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import Button from '@mui/material/Button';
import axios from 'axios';

const AddWeight = () => {
    var today = new Date();
    const [date, setDate] = useState(today);
    const [weight, setWeight] = useState(0.0);

    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    }

    const formatDate = (date) => {
        let dateNum = new Date(date).getDate();
        let monthNum = new Date(date).getMonth() + 1; 
        let yearNum = new Date(date).getFullYear();

        if (dateNum <= 9) {
            dateNum = '0' + dateNum.toString();
        }
        if (monthNum <= 9) {
            monthNum = '0' + monthNum.toString();
        }
        return yearNum.toString() + '-' + monthNum + '-' + dateNum;
    }

    const validateFields = (weight) => {
        const isWeightValid = !isNaN(weight) && weight != 0;
        return isWeightValid;
    }

    const handlePostWeight = () => {
        try {
            const newDate = formatDate(date);
            axios.post('http://localhost:8080/weights/add', {
                "date": newDate,
                "value": weight,
            }).then(() => {
                setWeight(0);
            })
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <MainCard title="Add New Weight">
                <SubCard>
                    <Grid container direction="column" justifyContent="space-between" alignItems="stretch" spacing='70'>

                        <Grid item >
                            <Grid container justifyContent="space-between">
                                <Grid item justifyContent="center">
                                    <MuiTypography variant="h4" gutterBottom>
                                        Date:
                                    </MuiTypography>
                                </Grid>
                                <Grid item>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker value={dayjs(date)} onChange={(newVal) => setDate(newVal)} />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container justifyContent="space-between">
                                <Grid item justifyContent="center">
                                    <MuiTypography variant="h4" gutterBottom>
                                        Weight:
                                    </MuiTypography>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        error={isNaN(weight)}
                                        id="outlined-basic"
                                        label="Weight"
                                        variant="outlined"
                                        value={weight}
                                        onChange={handleWeightChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </SubCard>
                <SubCard>
                    <Grid container justifyContent="flex-end">
                        <Button
                            item
                            variant="contained"
                            color="primary"
                            onClick={handlePostWeight}
                            disabled={!validateFields(weight)}
                        >
                            Add Weight
                        </Button>
                    </Grid>
                </SubCard>
            </MainCard>
    )
}

export default AddWeight;