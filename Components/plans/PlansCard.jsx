import React from 'react'
import SiteImage from '../UI/SiteImage'
import { Button } from '@nextui-org/react'

export default function PlansCard({
    id,
    type,
    status ,
    title,
    text,
    date,
    onMarkComplete = (id) => {
        console.log('=== clicked ===', id)
    }
}) {
    function convertDateFormat(dateString) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
    
        const date = new Date(dateString); // Parse the date string
        const day = date.getDate(); // Get the day
        const month = months[date.getMonth()]; // Get the month name
        const year = date.getFullYear(); // Get the year
    
        return `${day}, ${month}, ${year}`; // Return the formatted date string
    }
  return <div className={`card card__plan ${type}`}>
    <div className="card__plan--top">
        <h4 className="card__plan--header">{title}</h4>
        <span><SiteImage src={'/assets/images/calender.svg'} /> <p className="card__plan--date">{convertDateFormat(date)}</p></span>
    </div>
    <p className="card__plan--paragraph">{text}</p>
    <div className="card__plan--bottom">
        {type === 'past' ? <div className='flex justify-between items-center'>
        <Button onClick={()=> onMarkComplete(id)} className='special_button' endContent={
            <SiteImage src={'/assets/images/check.svg'} />
        }>Mark as Completed </Button>
        <div className="card__plan--status">
            <p className='past'>Past Due <SiteImage src={'/assets/images/danger_check.svg'} /></p>
        </div> 
        </div> : type === 'to_do' ? <Button onClick={()=> onMarkComplete(id)} className='special_button' endContent={
            <SiteImage src={'/assets/images/check.svg'} />
        }>Mark as Completed </Button> : <div className="card__plan--status">
            <p className='done'>Done <SiteImage src={'/assets/images/success_check.svg'} /></p>
        </div> }

    </div>
  </div>
}
