import SiteImage from '@/Components/UI/SiteImage'
import InputField from '@/Components/fields/InputField'
import TextareaField from '@/Components/fields/TextareaField'
import { AxiosInstance } from '@/Functions/AxiosInstance'
import { emailRegex } from '@/Functions/RegexFunction'
import MainLayout from '@/Layouts/MainLayout'
import { useSnackbar } from '@/custom-hooks/useSnackbar'
import { Button } from '@nextui-org/react'
import Head from 'next/head'
import React from 'react'
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
  function onSubmitContactUs(data){
    console.log('===submit contact form===', data)
    onCallContactUs(data)
    // reset()
  }
  async function onCallContactUs(data){
    try {
      const contactResponse = await AxiosInstance(`post`,`${process.env.NEXT_PUBLIC_API_KEY}/core/contact-us/`,{} ,{}, data)
      if(contactResponse.status){
        showSnackbar(contactResponse.data, 'success')
        reset()

      }else{
        showSnackbar(contactResponse.data, 'error')

      }
      console.log('===== contactResponse =====',contactResponse)
    } catch (error) {
      console.log('===== error contactResponse =====',error)

    }
  }
  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Contact us`}</title>
    </Head>
    <section className='contact'>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 lg:gap-[120px] md:gap-4 items-center">
        <div className="contact__content">
          <h1 className="contact__content--header">Get In Touch</h1>
          <p className='contact__content--paragraph'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500st has survived not only five centuries.</p>
          <form onSubmit={handleSubmit(onSubmitContactUs)}>
          <InputField 
          className={'mb-[5px]'}
          register={register} 
          errorMessage={{ required: 'Full name is required'}}
          errors={errors}
          name='name' label={''} placeholder={'Full Name'} id={'name'} type={'text'} maxLength={200} />
          <InputField 
          className={'mb-[5px]'}
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
          className={'mb-[5px]'}
          register={register} 
          errorMessage={{ required: 'Phone number is required'}}
          errors={errors}
          name='phone_number' label={''} placeholder={'Phone Number'} id={'phone_number'} type={'number'} maxLength={200} />
          <TextareaField 
          register={register} 
          errorMessage={{ required: 'Message is required'}}
          errors={errors}
          name='message' label={''} placeholder={'Message'} id={'message'}  maxLength={1000} />
            <Button type='submit' disabled={!isValid ? true : false} className='special_button contact__content--button'>Send</Button>
          </form>
        </div>
        <SiteImage src={'assets/images/contact-us-shape.svg'} />
      </div>
    </section>
  </MainLayout>
}
