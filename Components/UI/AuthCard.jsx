import React from 'react'
import Logo from './Logo'

export default function AuthCard({
    children,
    className,
    title,
    text,
    logo = true
}) {
    return <div className={`card card__auth ${className}`}>
        {logo && <Logo className='logo' />}
        <h3 className="card__auth--header">{title}</h3>
        <p className="card__auth--paragraph">{text}</p>
        {children}
    </div>
}
