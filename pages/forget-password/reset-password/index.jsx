import AuthCard from '@/Components/UI/AuthCard'
import SiteImage from '@/Components/UI/SiteImage'
import InputField from '@/Components/fields/InputField'
import { AxiosHeadersInstance } from '@/Functions/AxiosHeadersInstance'
import { AxiosInstance } from '@/Functions/AxiosInstance'
import { passwordRegex } from '@/Functions/RegexFunction'
import MainLayout from '@/Layouts/MainLayout'
import { useSnackbar } from '@/custom-hooks/useSnackbar'
import { Button } from '@nextui-org/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function index() {
  const route = useRouter()
  const {email} = route.query
  const showSnackbar = useSnackbar()
  const {
    register,
    reset,
    handleSubmit,
    formState: {errors , isValid},
    watch

  } = useForm({
    mode: 'onChange'
  })
  function onResetPasword(data){
    resetPasswordApi(data)
  }
  async function resetPasswordApi(data){
    try {
      const resetPasswordRes = await AxiosInstance(
        `post`,
        `${process.env.NEXT_PUBLIC_API_KEY}/account/password/reset/`,
        {},
        {},
        {
          email,
          password: data.password,
          confirm_password: data.confirm_password
        }
      );
      if(resetPasswordRes.status){
        showSnackbar(`${resetPasswordRes.data}`,`success`)
        reset()
        route.push({pathname: '/', query: {email : data.email}})
      }else{
        showSnackbar(`${resetPasswordRes.error}`,`error`)
      }
    } catch (error) {
      console.log('=== error ===', error)
    }
  }
  const password = watch('password' , '')
  useEffect(() => {
    if(!route.isReady){
      return;
    }
  

  }, [route])
  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Reset password`}</title>
    </Head>
    <section className='login'>
      <AuthCard title='Set a new Password' text='Please set a new password to update it to your account' logo={false}>
        <form onSubmit={handleSubmit(onResetPasword)}>
          <div className="grid grid-cols-1 gap-y-[24px]">
            <InputField register={register} errors={errors} 
            errorMessage={{ required: 'Password is required' , 
            pattern: {
              value: passwordRegex,
                  // Change this regex pattern as needed
              message: "Password is invalid",
              },
              
            }}  name='password' label={''} placeholder={`Password (Required)`} id={'password'} type={'password'} maxLength={200} />
            <InputField register={register} errors={errors} errorMessage={{ required: 'Confirm assword is required' , 
              pattern: {
              value: passwordRegex,
                  // Change this regex pattern as needed
              message: "Password is invalid",
              },
              validate: (value) => value === password || "Passwords do not match",

            }} name='confirm_password' label={''} placeholder={`Confirm Password (Required)`} id={'confirm_password'} type={'password'} maxLength={200} />
            
            <Button type='submit' disabled={!isValid ? true : false} className='special_button'>Save</Button>
          </div>

        </form>
        <div className="dont_have_acoount flex justify-center">
          <p>Not Registered Yet?</p>
          <Link href={'/createAccount'}>Create Account <SiteImage src={'/assets/images/chevron_right.svg'} /></Link>
        </div>
      </AuthCard>
    </section>
  </MainLayout>
  
}
