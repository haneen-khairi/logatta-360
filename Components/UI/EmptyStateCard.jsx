import React from 'react'
import SiteImage from './SiteImage'

export default function EmptyStateCard({
    imageSrc = "",
    className = "",
    title = "You haven’t reached the plan yet",
    text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    button = {
        link: '',
        text: ''
    }
}) {
    return <div className={`card card__empty ${className}`}>
        <SiteImage className='card__empty--image' src={imageSrc} />
        <div className="card__empty--content">
            <h4 className='card__empty--content-header'>
                {title}
            </h4>
            <p className='card__empty--content-paragraph'>{text}</p>
        </div>
    </div>
}
