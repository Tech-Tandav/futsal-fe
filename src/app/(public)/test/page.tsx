"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'


const page = () => {
  const onSubmit = (data:any)=>{
    
  }
  const { register, handleSubmit, formState:{errors, isSubmitting}, reset, getValues} = useForm()
  return (
    <form  onSubmit={handleSubmit(onSubmit)} className='flex flex-col mx-auto max-w-sm gap-y-2 bg-gray-100 p-4 rounded-2xl'>
        <h1 className='font-medium text-2xl mb-1 '>Form</h1>

        <label>Username</label>
        <input {...register('username',{
            required:"Email is required"})
        } type="text" placeholder="username" className='border border-green-800 rounded-2xl px-2 py-2'/>

        <label>Email</label>
        <input {...register('email',{
          minLength:{
            value:10,
            message:"Password must be at least 10 character"
          }
        })} type="email" placeholder="email" className='border border-green-800 rounded-2xl px-2 py-2'/>

        <label>Phone</label>
        <input {...register('phone')} type="text" placeholder="phone" className='border border-green-800 rounded-2xl px-2 py-2'/>

        <label>Password</label>
        <input {...register('password')} type="password"  placeholder="password" className='border border-green-800 rounded-2xl px-2 py-2'/>

        <button disabled={isSubmitting} className='border border-green-800 rounded-2xl px-2 py-2 bg-green-400 mt-4 disabled:bg-green-200' type="submit">Submit</button>
    </form>
  )
}

export default page