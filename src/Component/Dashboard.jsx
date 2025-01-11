import React, { useCallback,useState, useEffect } from 'react'
import ElectrodeBoard from './ElectrodeBoard'
import AutomigBoard from './AutomigBoard'
import axios from 'axios'
import {
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import { endpoints } from './endpoints'
import Header from './Header'
import dayjs from 'dayjs'
import RefreshAlert from './RefreshAlert'

function Dashboard() {
    const [open, setOpen] = useState(false);
    const { isLoading, data, isError } = useQuery({
        queryKey: ['dashboard-data'], queryFn: getData,
        staleTime: 1000,
        refetchInterval: 15 * 60 * 1000, // Fetch data every 10 seconds
    })

    async function getData() {
        try {
            setOpen(true)
            setTimeout(() => {
                setOpen(false)
            },1500)
            const data = await axios.post(endpoints.dashboard,
                {
                    start_date: window.sessionStorage.getItem("start_date"),
                    end_date: window.sessionStorage.getItem("end_date")
                })            
            return data
        } catch (error) {
            console.log("getData",error);
        }
    }
    
    const setDefaultDate = useCallback(() => {
        if (typeof window !== "undefined") {
            if (!window.sessionStorage.getItem("start_date")) {
                window.sessionStorage.setItem("start_date", dayjs().format("YYYY-MM-DD"));
            }
            if (!window.sessionStorage.getItem("end_date")) {
                window.sessionStorage.setItem("end_date", dayjs().format("YYYY-MM-DD"));
            }
        }
    }, []); 

    useEffect(() => {
        setDefaultDate();
    }, [setDefaultDate]);

    // setInterval(() => {
    //     getData()
    // }, 30000)
    
    if (isLoading) {
        return(<>Loading.....</>)
    }
    return (
      <div>
            <Header />
            <RefreshAlert open={open} setOpen={setOpen } />
            <div className='flex gap-10 mx-10 my-10'>
                <ElectrodeBoard data={data?.data?.electrode} />
                <AutomigBoard data={data?.data?.auto_mig} />
            </div>
      </div>
  )
}

export default Dashboard