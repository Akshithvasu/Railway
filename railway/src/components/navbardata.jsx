import React from 'react';
import homeIcon from '../images/home.png';
import user_icon from '../images/booking.png'
import bookIcon from '../images/train.png';
import bookUpdateIcon from '../images/payment.png';
import './navbar.css'
export const Sidebardata=[
    {
        title:<div className='title'>Home</div>,
       icon:<img className="nav" src={homeIcon} alt=""/>,
        link:"/"
    },
    {
        title:<div  className='title'>Booking</div>,
        icon:<img  className="nav"src={user_icon} alt=""/>,
        link:"/booking"
    },
    {
        title:<div className='title'>SearchRoute</div>,
        icon:<img className="nav" src={bookIcon} alt=""/>,
        link:"/searchroute"
    },
    {
        title:<div className='title'>Payment</div>,
        icon:<img  className="nav"src={ bookUpdateIcon} alt=""/>,
        link:"/calculate-price"
    },
]