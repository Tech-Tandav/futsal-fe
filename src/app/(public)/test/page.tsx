import React from 'react'

const page = () => {
  // const [data, setData] = 
  return (
    <form className='flex flex-col mx-auto max-w-sm gap-y-2 bg-gray-100 p-4 rounded-2xl'>
        <h1 className='font-medium text-2xl mb-1 '>Form</h1>
        <label>Username</label>
        <input type="text" placeholder="username" className='border border-green-800 rounded-2xl px-2 py-2'/>
        <label>Email</label>
        <input type="email" placeholder="email" className='border border-green-800 rounded-2xl px-2 py-2'/>
        <label>Phone</label>
        <input type="text" placeholder="phone" className='border border-green-800 rounded-2xl px-2 py-2'/>
        <label>Password</label>
        <input type="password"  placeholder="password" className='border border-green-800 rounded-2xl px-2 py-2'/>
        <button className='border border-green-800 rounded-2xl px-2 py-2 bg-green-400 mt-4' type="submit">Submit</button>
    </form>
  )
}

export default page