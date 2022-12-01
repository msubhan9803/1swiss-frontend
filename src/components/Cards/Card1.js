import React from 'react'

export default function Card1({ key, name, selected, imgSrc, title, value, width, height, handleSubscriberFieldUpdate, icon }) {
    return (
        <div
            key={key}
            className={`basis-1/2 flex flex-col justify-center text-center m-4 h-28 md:h-44  rounded-md p-8 border border-slate-300 hover:border-blue-500 cursor-pointer
            shadow-md ${selected === value && 'border-blue-500 bg-blue-50'}`}
            onClick={() => handleSubscriberFieldUpdate(name, value)}
        >
            { imgSrc && <img className='m-auto' src={imgSrc} width={width} height={height} alt="" />}
            {icon ? icon : ''}
            <p className={`text-xs md:text-md font-semibold text-slate-600 ${selected === value && 'text-blue-600'}`}>{title}</p>
        </div>
    )
}