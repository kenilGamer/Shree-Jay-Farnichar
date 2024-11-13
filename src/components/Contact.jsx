import React from 'react'
import Topbar from '../partials/Topbar'
import Navbar from '../partials/Navbar'

function Contact() {
  return (
    <div className='h-screen'>
        <Topbar/>
        <Navbar/>
        {/* <h1 className='text-white text-3xl font-black uppercase text-center mb-10'>Contact Us</h1> */}
        <div className='flex items-center justify-center mt-10'>
            <div className='w-[400px] h-[500px] bg-[#1D1D1D] p-4 flex flex-col  gap-[14px] relative rounded-lg border-4 border-[#282828] '>
                <h1 className='text-white text-3xl font-black uppercase text-center mb-10'>Contact Us</h1>
                <form className='flex flex-col gap-4'>
                    <input type="text" placeholder='Name' className='p-2 rounded-md bg-[#282828] text-white' />
                    <input type="email" placeholder='Email' className='p-2 rounded-md bg-[#282828] text-white' />
                    <input type="text" placeholder='Phone' className='p-2 rounded-md bg-[#282828] text-white' />
                    <input type="text" placeholder='Message' className='p-2 rounded-md bg-[#282828] text-white' />
                    <button className='bg-[#282828] text-white p-2 rounded-md'>Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Contact