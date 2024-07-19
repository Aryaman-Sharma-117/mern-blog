import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignIn() {
  const [formData,setFormData]=useState({});
  const[errMsg,setErrMsg]=useState(null);
  const [load,setLoad]=useState(false);
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }
  const submitHandler = async(e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password){
      return setErrMsg('Fill out all fields')
    }
    try{
      setLoad(true)
      setErrMsg(null)
      const res = await fetch('/api/auth/signin',{
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
      if(res.ok){
        navigate('/')
      }
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
            You can sign in with your email and password or use your Google account
          </p>
        </div>

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={submitHandler}>
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
                  
                ) : 'Sign In'
              }
            </Button>
          </form>
          <div className='flex gap-4 mt-5'>
            <span>Have an account? </span>
            <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
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