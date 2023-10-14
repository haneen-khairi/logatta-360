import EmptyStateCard from '@/Components/UI/EmptyStateCard'
import SiteImage from '@/Components/UI/SiteImage'
import { UserContext } from '@/Context/AuthContext'
import { AxiosHeadersInstance } from '@/Functions/AxiosHeadersInstance'
import MainLayout from '@/Layouts/MainLayout'
import { Button, Image } from '@nextui-org/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'

export default function index() {
  const route = useRouter()
  const [meeting, setMeeting] = useState()
  const {token , getToken} = useContext(UserContext)
  function onNavigateMeeting(){
    route.push('/')
  }
  async function getMeeting(){
    if(token){
      try {
        const meetingResponse = await AxiosHeadersInstance(`get`, `${process.env.NEXT_PUBLIC_API_KEY}/tests/meeting`)
        console.log('=== meetingResponse ===', meetingResponse)
        if(meetingResponse.status){
          setMeeting(meetingResponse?.data)

        }else{
          setMeeting(meetingResponse)
        }
      } catch (error) {
        console.log('=== error in get meeting ===', error)
      }
    }
  }
  function formatDate(inputDate) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
  
    const day = inputDate?.getDate();
    const month = months[inputDate?.getMonth()];
    const hours = inputDate?.getHours();
    const minutes = inputDate?.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    const formattedDate = `${day}th ${month} - ${hours}:${minutes?.toString().padStart(2, '0')} ${ampm}`;
    
    return inputDate;
  }
  useEffect(() => {
    if(!route.isReady){
      return
    }
    getMeeting()
    getToken()
    return () => {
      
    }
  }, [route , token])

  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Home`}</title>
    </Head>
    {token ? 
      <section className="meeting section__single">
       
        
        {meeting?.error ? <EmptyStateCard imageSrc='/assets/images/under_review.svg' title='Your Application is Under Review' text='Our experts will review your information and get back to you in 48 hours' />
             :
             <div className={`card card__empty card__meeting`}>
             <div className="card__empty--content">
             <SiteImage className='card__empty--image' src={'/assets/images/icon_calender.svg'} /> 
            <h4 className='card__empty--content-header'>
            Upcoming meeting
            </h4>
            <h6 className="card__meeting--title">Uplift Expert: {meeting?.expert}</h6>
            <span className="card__meeting--span">Meeting on</span>
            <h5 className="card__meeting--date">{formatDate(meeting?.meeting_datetime)}</h5>
            <p className='card__empty--content-paragraph'>{meeting?.description}</p>
            <Button as={Link} href={meeting?.url || ''} type='submit' className="card__meeting--button special_button" onClick={onNavigateMeeting}>Join</Button>
        </div>
        
    </div>}
      </section>
    : <>
      <section className="homecover">
        <div className="lg:flex justify-center items-center">
          <div className="homecover__content lg:w-8/12 md:w-12/12 md:mb-[40px]">
              <h1 className='homecover__content--header mb-[16px]'>Discover you Talents, Design your Future</h1>
              <p className='homecover__content--paragraph mb-[16px]'>Empower360 is your trusted partner in unlocking your unique potential, providing science-based guidance for confident, informed career decisions.</p>
              {/* <Button as={Link} href='' className="homecover__content--button special_button">Start Now</Button> */}
          </div>
          <Image className='lg:w-4/12 md:w-12/12 w-full' src='/assets/images/home_cover.svg' removeWrapper={true} />
        </div>
      </section>
      <section className="what mb-[160px]">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 justify-center gap-[120px] items-center">
          <SiteImage  src='/assets/images/what-are-we.svg' />
        <div className="what__content ">
          <SiteImage className="what__content--shape" src='/assets/images/what-are-we-shape.svg' />
          
              <h3 className='what__content--header mb-[16px]'>Who Are We?</h3>
              <p className='what__content--paragraph mb-[16px]'>"Empower360 was born out of a shared passion for empowering students to achieve their full potential. The founders, a group of graduate in UAE, witnessed firsthand the struggles students faced in making career decisions. Determined to make a difference, they embarked on a journey to create a platform that combined science-based assessments with personalized guidance, in patrnering with internationally known companies specialized in professional development. Drawing on their collective expertise, they founded Empower360, envisioning a future where every student could confidently navigate their career path and find fulfillment in the ever-changing job market."</p>
          </div>
        </div>
      </section>

      <section className="our_keys">
        <div className="our_keys__content">
          <h3 className="our_keys__content--header">Our Key Features</h3>
          <p className="our_keys__content--paragraph">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>

          <div className="grid lg:grid-cols-3 md:grid-cols-2  lg:gap-x-[40px] md:gap-x-[60px]">
            <div className="our_keys__content--card">
                {/* <h4 className="our_keys__content--card-header">6,000+</h4> */}
                <p className="our_keys__content--card-paragraph">-	Empower360 provides in-depth assessments, including The Learning Receptiveness Profiles test, The NAP Student Performer Brain Profile Assessment, and The DISC Profile assessment, to uncover students' interests, strengths, neural architecture, and personality traits.</p>
            </div>
            <div className="our_keys__content--card">
                {/* <h4 className="our_keys__content--card-header">2,500</h4> */}
                <p className="our_keys__content--card-paragraph">-	The platform offers personalized career recommendations and strategies for success based on the results of these assessments, helping students make informed decisions about their future careers.</p>
            </div>
            <div className="our_keys__content--card">
                {/* <h4 className="our_keys__content--card-header">120+</h4> */}
                <p className="our_keys__content--card-paragraph">-	Empower360 addresses challenges students face in career choice and academic performance by equipping them with tailored guidance and resources, ultimately boosting confidence and improving academic outcomes.</p>
            </div>
          </div>
        </div>
      </section>
    </> }

  </MainLayout>
}
