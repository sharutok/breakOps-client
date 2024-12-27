import React from 'react'

function AutomigBoard({ data }) {
    return (
        <div style={{ border: "1px solid grey" }} className='w-full p-5 rounded-xl text-xl'>
            <div className='bg-[#f1ceae] p-2 rounded-2xl flex justify-center text-xl'>
                <span style={{ fontFamily: "Source Sans Pro" }} >AutoMig</span>
            </div>
            {Object.keys(data).length?
                Object.entries(data).map(x => {
                    return (
                        <div>
                            <div className='mt-5'>
                                <span className='font-medium'>{x[0]}</span>
                            </div>
                            <div className='grid justify-center grid-cols-3 gap-4 '>
                                {x[1].map(y => {
                                    return (
                                        <div style={{ background: y.status ? '#f7a399' : 'white', border: y.status ? "3px solid #a4161a" : "1px solid #ced4da" }} className='border p-2 rounded-xl flex justify-center'>
                                            <span >{y.equipment}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })
                : <p className='text-center font-semibold p-5'>
                    No Breakdown
                </p>
            }
        </div>
    )
}

export default AutomigBoard