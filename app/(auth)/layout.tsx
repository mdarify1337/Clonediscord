import React from 'react'

export default function AuthenticationLayout(
        { children }: { children: React.ReactNode }) 
        {
    return (
        <div className='flex  justify-center items-center  h-full'>
            {children}
        </div>
    )
}
