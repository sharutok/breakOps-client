import React from 'react'
import Header from './Header'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { endpoints } from './endpoints';
import axios from 'axios';

export default function Settings() {
  const [startDateValue, setStartDateValue] = React.useState(dayjs(window.sessionStorage.getItem("start_date"))||dayjs(new Date()));
  const [endDateValue, setEndDateValue] = React.useState(dayjs(window.sessionStorage.getItem("end_date"))||dayjs(new Date()));
  const [equipmentList, setEquipmentList] = React.useState([]);

  const { isLoading, data, isError } = useQuery({ queryKey: ['list-of-equipment-id-data'], queryFn: getData, staleTime: 16 * 60 * 1000 })
  
  const ignored_equipment_id = useQuery({ queryKey: ['list-of-ignored-equipment-id-data'], queryFn: getIgnoredEquipmentId, staleTime: Infinity })

  
  async function getIgnoredEquipmentId(){
    try {
      const resp=await axios.get(endpoints.list_of_rejected_equipment_id)
      return resp?.data
    } catch (error) {
      console.log("error in getIgnoredEquipmentId",error);
    }
  }

  async function getData() {
    try {
      const data = await axios.get(endpoints.list_of_equipment_id)
      return data
    } catch (error) {
      console.log("getData", error);
    }
  }

  async function Submit() {
    // console.log(dayjs(startDateValue).format("DD-MM-YYYY"), dayjs(endDateValue).format("DD-MM-YYYY"), equipmentList);
    try {
      window.sessionStorage.setItem("start_date", dayjs(startDateValue).format("YYYY-MM-DD"))
      window.sessionStorage.setItem("end_date", dayjs(endDateValue).format("YYYY-MM-DD"))
      await axios.post(endpoints.list_of_rejected_equipment_id, { equipmentList })
    } catch (error) {
      console.log("error",error);
    }
  }


  if (isLoading) {
    return (<>Loading.....</>)
  }

  return (
    <form onSubmit={Submit}>
    <div className='grid gap-5'>
      <Header />
      <p>Select Date</p>
      <div className='flex gap-5'>
        <DatePickerValue get={startDateValue} set={setStartDateValue} label={"Start Date"}/>
        <DatePickerValue get={endDateValue} set={setEndDateValue} label={"End Date"}/>
      </div>
      <div className='grid gap-5'>
      <p>Ignore equipment ID</p>
          <Autocomplete
          onChange={(e, selectedValue) => {setEquipmentList(selectedValue)}}
          multiple
          limitTags={10}
          id="multiple-limit-tags"
          options={data?.data.map(x=>{return x.equipment_id})}
            size='small'
            defaultValue={ignored_equipment_id?.data}
          getOptionLabel={(option) => String(option)}
          renderInput={(params) => (
            <TextField required {...params} label="Equipment Id" size='small' />
          )}
          sx={{ width: '500px' }}
          />
      </div>
      </div>
      <div className='mt-5'>
        <Button onClick={Submit} variant="outlined">Update</Button>
      </div>
          </form>
  )
}



function DatePickerValue({label,get,set}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker format='DD-MM-YYYY' label={label} value={get} onChange={(newValue) => set(newValue)}/>
    </LocalizationProvider>
  );
}
