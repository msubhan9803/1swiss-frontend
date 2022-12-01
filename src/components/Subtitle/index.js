import React from 'react'

export default function Subtitle({ subtitle, color = "text-slate-700" }) {
    return (
        <>
            <p className={`text-xl font-bold mt-2 ${color}`}>
                {subtitle}
            </p>
        </>
    )
}
