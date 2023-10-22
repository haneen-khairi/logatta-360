import AuthCard from '@/Components/UI/AuthCard'
import SiteImage from '@/Components/UI/SiteImage'
import InputField from '@/Components/fields/InputField'
import { AxiosInstance } from '@/Functions/AxiosInstance'
import { emailRegex } from '@/Functions/RegexFunction'
import MainLayout from '@/Layouts/MainLayout'
import { useSnackbar } from '@/custom-hooks/useSnackbar'
import { Button, Checkbox } from '@nextui-org/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function index() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange'
  });
  const showSnackbar = useSnackbar()
  const route = useRouter()
  function onSubmitForgetPassword(data){
    console.log('===forget===' , data)
    forgetPassword(data)
    // reset()
  }
  async function forgetPassword(data){
    try {
      const forgetPasswordRes = await AxiosInstance(
        `post`,
        `${process.env.NEXT_PUBLIC_API_KEY}/account/password/reset/auth/`,
        {},
        {},
        data
      );
      if(forgetPasswordRes.status){
        showSnackbar(`${forgetPasswordRes.data}`,`success`)
        reset()
      }else{
        showSnackbar(`${forgetPasswordRes.error}`,`error`)
      }
      route.push({pathname: '/verify-email', query: {email : data.email}})
    } catch (error) {
      console.log('=== error ===', error)
    }
  }
  useEffect(() => {
    if(!route.isReady){
      return;
    }
  

  }, [route])
  
  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Forget password`}</title>
    </Head>
    <section className='login'>
      <AuthCard title='Forgot Password' text='To proceed with reseting your password, please provide your email address' logo={false}>
        <form onSubmit={handleSubmit(onSubmitForgetPassword)}>
          <div className="grid grid-cols-1 gap-y-[24px]">
            <InputField register={register} 
            errorMessage={{ required: 'Email is required' , 
            pattern: {
              value: emailRegex,
                  // Change this regex pattern as needed
              message: "Email is invalid",
              },
            }}
            errors={errors}
            name='email' label={''} placeholder={'Email (Required)'} id={'email'} type={'email'} maxLength={200} />
            
            <Button className='special_button' disabled={!isValid ? true : false} type='submit'>Next</Button>
          </div>

        </form>
      </AuthCard>
    </section>
  </MainLayout>
  
}
