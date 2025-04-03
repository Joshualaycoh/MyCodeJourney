import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

    const Footer = ({isDarkMode}) => {
  return (
    <div className='mt-28'>
      <div className='text-center'>
      <Image src={isDarkMode ? assets.logo_dark : assets.logo} alt='' className='w-36 mx-auto mb-2' />
      </div>
      <div className='w-max flex items-center gap-2 mx-auto'>
      <Image src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon} className='w-6' alt='' />
      j.laycohomo@gmail.com
      </div>
      <div className='text-center sm:flex items-center justify-between border-t
        border-gray-400 mx-[10%] mt-12 py-6'>
        <p>@ 2025 Joshua Homo. All rights reserved.</p>
        <ul className='flex items-center justify-center gap-10 mt-4 sm:mt-0' >
            <li><a target='_black' href="https://github.com/Joshualaycoh">Github</a></li>
            <li><a target='_black' href="https://instagram.com">LinkedIn</a></li>
            <li><a target='_black' href="https://instagram.com">X</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
