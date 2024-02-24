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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

import Button from '@mui/material/Button';
import axios from 'axios';


const AddWorkout = () => {
    var today = new Date();
    const [date, setDate] = useState(today);
    const [duration, setDuration] = useState(0);
    const [type, setType] = useState('');

    const handleDurationChange = (event) => {
        setDuration(event.target.value);
    }

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const formatDate = (date) => {
        return new Date(date).getFullYear().toString() + '-0' + (new Date(date).getMonth() + 1).toString() + '-0' + new Date(date).getDate().toString();
    }

    const validateFields = (duration, type) => {
        const isDurationValid = !isNaN(duration) && duration !== 0;
        const isTypeValid = (type === 'LEGS' || type === 'CHEST' || type === 'BACK' || type === 'FLEXIBIILITY' || type === 'CALISTHENICS' || type === 'CARDIO') && type !== '';
        return isDurationValid && isTypeValid;
    }

    useEffect(() => {
        console.log('duration: '+ duration);
        console.log('type: ' + type);
        console.log('validateFields: ' + validateFields(duration, type));
    } , [duration, type]);

    const handlePostWorkout = () => {
        try {
            console.log('is this even working');
            // const newDate = date.toLocaleDateString();
            // console.log(newDate);
            console.log('the new date: ' + formatDate(date));
            const newDate = formatDate(date);
            // const newDate = date.getFullYear().toString() + '-0' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString();
            axios.post('http://localhost:8080/workouts/add', {
                "date": newDate,
                "duration": duration,
                "workoutType": type
            }).then((response) => {
                console.log('api worked');
                console.log(response);
            })
        } 
        catch (error) {
            console.error(error);
        }
    };

    return (
        <MainCard title="Add New Workout">
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
                                    Duration:
                                </MuiTypography>
                            </Grid>
                            <Grid item>
                                <TextField 
                                    error={isNaN(duration)}
                                    id="outlined-basic" 
                                    label="Duration" 
                                    variant="outlined" 
                                    value={duration} 
                                    onChange={handleDurationChange} 
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid container justifyContent="space-between">
                            <Grid item justifyContent="center">
                                <MuiTypography variant="h4" gutterBottom>
                                    Type:
                                </MuiTypography>
                            </Grid>
                            <Grid item>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="type">Type</InputLabel>
                                        <Select
                                            labelId="type"
                                            id="type-id"
                                            value={type}
                                            label="Type"
                                            onChange={handleTypeChange}
                                        >
                                            <MenuItem value={'LEGS'}>Legs</MenuItem>
                                            <MenuItem value={'CHEST'}>Chest</MenuItem>
                                            <MenuItem value={'BACK'}>Back</MenuItem>
                                            <MenuItem value={'FLEXIBIILITY'}>Flexibility</MenuItem>
                                            <MenuItem value={'CALISTHENICS'}>Calisthenics</MenuItem>
                                            <MenuItem value={'CARDIO'}>Cardio</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Box>
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
                        onClick={handlePostWorkout} 
                        disabled={!validateFields(duration, type)}
                    >
                        Add Workout
                    </Button>
                </Grid>
            </SubCard>

        </MainCard>
    )
}

export default AddWorkout;
