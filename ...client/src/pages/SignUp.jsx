import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  const [formData,setFormData]=useState({});
  const[errMsg,setErrMsg]=useState(null);
  const [load,setLoad]=useState(false);
  
  const changeHandler = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }
  const submitHandler = async(e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrMsg('Fill out all fields')
    }
    try{
      setLoad(true)
      setErrMsg(null)
      const res = await fetch('/api/auth/signup',{
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setLoad(false)
      if(data.success===false){
        return setErrMsg(data.message)
      }
      setFormData({})
    } catch(err){
      setErrMsg(err.message)
      setLoad(false)
    }
  }
  return (
    <div className='min-h-screen mt-20 items-center'>
      <div className='flex p-3 max-w-3xl max-auto flex-col md:flex-row items-center gap-5'>
        <div className='flex-1'>
          <Link to="/" className='text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              MERN
            </span>
            BLOG
          </Link>
          <p className='text-sm mt-5'>
            You can sign up with your email and password or use your Google account
          </p>
        </div>

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={submitHandler}>
            <div>
              <Label value='Your Username'/>
              <TextInput type='text' placeholder='Username' id='username' onChange={changeHandler}/>
            </div>
            <div>
              <Label value='Your Email'/>
              <TextInput type='text' placeholder='Email' id='email' onChange={changeHandler}/>
            </div>
            <div>
              <Label value='Your Password'/>
              <TextInput type='text' placeholder='Password' id='password' onChange={changeHandler}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={load}>
              {
                load ? (
                  <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Loading...</span>
                  </>
                  
                ) : 'Sign Up'
              }
            </Button>
          </form>
          <div className='flex gap-4 mt-5'>
            <span>Have an account? </span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
          </div>
          {
            errMsg && (
              <Alert className='mt-5' color='failure'>{errMsg}</Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
