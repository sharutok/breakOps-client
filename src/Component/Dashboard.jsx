import React, { useCallback, useEffect } from 'react'
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

function Dashboard() {

    const { isLoading, data, isError } = useQuery({ queryKey: ['dashboard-data'], queryFn: getData, staleTime: Infinity })

    async function getData() {
        try {
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
   
    
    if (isLoading) {
        return(<>Loading.....</>)
    }
    return (
      <div>
            <Header/>
            <div className='flex gap-10 mx-10 my-10'>
                <ElectrodeBoard data={data?.data?.electrode} />
                <AutomigBoard data={data?.data?.auto_mig} />
            </div>
      </div>
  )
}

export default Dashboard