import AuthCard from '@/Components/UI/AuthCard'
import SiteImage from '@/Components/UI/SiteImage'
import InputField from '@/Components/fields/InputField'
import { AxiosInstance } from '@/Functions/AxiosInstance'
import { emailRegex, passwordRegex } from '@/Functions/RegexFunction'
import MainLayout from '@/Layouts/MainLayout'
import { useSnackbar } from '@/custom-hooks/useSnackbar'
import { Button, Checkbox } from '@nextui-org/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function index() {
  const showSnackbar = useSnackbar()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange'
  });
  const route =  useRouter()
  const [validation, setValidation] = useState([])
  const [disable, setDisable] = useState(true)
  const [userObject , setUserObject] = useState({
    email: "",
    password: ""
  })
  // function onGetUserData(event){
  //   const {name , value} = event?.target
  //   const userData = {...userObject}
  //   let validationArray = [];
  //   userData[name] = value.trim()
  //   console.log('getting data...' , userData)
  //   setUserObject(userData)
  //   if(userData.email === ""){
  //     validationArray.push({name: 'email', error: 'Email is required'})
  //     setDisable(true)
  //   }else if(!emailRegex.test(userData.email)){
  //     validationArray.push({name: 'email', error: 'Email is invalid'})
  //     setDisable(true)
  //   }else if(userData.password === ""){
  //     validationArray.push({name: 'password', error: 'Password is required'})
  //     setDisable(true)
  //   }else if(!passwordRegex.test(userData.password)){
  //     validationArray.push({name: 'password', error: 'Password is invalid'})
  //     setDisable(true)
  //   }else{
  //     setDisable(false)
  //   }

  //   setValidation(validationArray)
  // }
  // function resetForm(){
  //   setUserObject({
  //     email: "",
  //     password: ""
  //   })
  //   loginForm.current.reset()
  // }
  function onLogin(data){
    // event.preventDefault();
    console.log('=== login data ===', data)
    loginLogic(data)
  }
  async function loginLogic(data){
    try {
      const respLogin = await AxiosInstance(`post`, `${process.env.NEXT_PUBLIC_API_KEY}/account/login/`, {}, {}, data)
      console.log('=== res login ===' , respLogin)
      if(respLogin.status){
        localStorage.setItem('token', respLogin.data.access)
        localStorage.setItem('refresh_token', respLogin.data.refresh)
        route.push('/')
        reset()
      }else{
        showSnackbar(respLogin.error, `error`)
      }

    } catch (error) {
      
    }
  }
  useEffect(() => {
    if(!route.isReady){
      return
    }
    
    
  }, [route])
  
  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Login`}</title>
    </Head>
    <section className='login'>
      <AuthCard title='Login to your account' text='Please enter your credentials to login to your account'>
        <form onSubmit={handleSubmit(onLogin)}>
          <div className="grid grid-cols-1">
            <InputField 
            register={register} 
            errorMessage={{ required: 'Email is required' , 
            pattern: {
              value: emailRegex,
                  // Change this regex pattern as needed
              message: "Email is invalid",
              },
            }}
            errors={errors}
            
            name='email' label={''} placeholder={'adeeb@mail.com'} id={'email'} type={'email'} maxLength={200} />
            <InputField 
            register={register} 
            errorMessage={{ required: 'Password is required' , 
            pattern: {
              value: passwordRegex,
                  // Change this regex pattern as needed
              message: "Password is invalid",
              },
            }}
            errors={errors}
            name='password' label={''} placeholder={`••••••••`} id={'password'} type={'password'} maxLength={200} />
            <div className="login__remember mb-[24px]">
              <Checkbox >Remember Me</Checkbox>
              <Link href={'/forget-password'} className='login__remember--forget'>Forgot Password?</Link>
            </div>
            <Button className='special_button' disabled={!isValid ? true : false} type='submit'>Login</Button>
          </div>

        </form>
        <div className="dont_have_acoount flex justify-center">
          <p>Not Registered Yet?</p>
          <Link href={'/create-account'}>Create Account <SiteImage src={'/assets/images/chevron_right.svg'} /></Link>
        </div>
      </AuthCard>
    </section>
  </MainLayout>
  
}
