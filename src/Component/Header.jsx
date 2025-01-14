import React from 'react'

function Header() {
    return (
      
        <div className='w-full h-16 border-b-[#b9b2b2] border-b border-solid mb-5 flex justify-between px-2'>
            <div className='items-center flex gap-2'>
          <img src='https://adorwelding.org/Adorhub_uploads/PCM.png' width={40} />
          <span className='text-xl'>ADOROPS - Raipur</span>
            </div>
            {/* <div onClick={()=>window.location.href="/settings"} className='items-center flex gap-2 cursor-pointer'>
                Manage
            </div> */}
      </div>
  )
}

export default Header