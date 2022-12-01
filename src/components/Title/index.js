import React from 'react'

export default function Title({ title }) {
    return (
        <>
            <p className='text-3xl text-slate-700 font-bold'>
                {title}
            </p>
            <div className="border-2 border-blue-500 w-16 mt-2"></div>
        </>
    )
}
