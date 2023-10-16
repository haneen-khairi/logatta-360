import AuthCard from '@/Components/UI/AuthCard'
import SiteImage from '@/Components/UI/SiteImage'
import InputField from '@/Components/fields/InputField'
import { AxiosHeadersInstance } from '@/Functions/AxiosHeadersInstance'
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
      const resetPasswordRes = await AxiosHeadersInstance(
        `post`,
        `${process.env.NEXT_PUBLIC_API_KEY}/account/update-password/`,
        {},
        {},
        data
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
  const password = watch('new_password' , '')
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
          <div className="grid grid-cols-1">
            <InputField register={register} errors={errors} 
            errorMessage={{ required: 'Password is required' , 
            pattern: {
              value: passwordRegex,
                  // Change this regex pattern as needed
              message: "Password is invalid",
              },
              
            }}  
            name='new_password' label={''} placeholder={`Password (Required)`} id={'new_password'} type={'password'} maxLength={200} />
            <div
              className="password__message flex items-center justify-start gap-[8px] mb-[24px]"
            >
              <SiteImage
                alt="exclamation mark"
                width={16}
                height={16}
                src="/assets/images/info_icon.svg"
              />

              <p className="">Minimum 6 characters, at least one number, and special chareacter</p>
            </div>
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
