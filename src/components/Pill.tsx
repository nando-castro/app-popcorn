import React from 'react'


export function Pill({ children }: { children: React.ReactNode }) {
return <span className="px-2 py-1 rounded-full text-xs bg-neutral-100">{children}</span>
}