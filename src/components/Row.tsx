import React from 'react';


export function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
return (
<div className="flex items-center justify-between py-1.5">
<div className="text-neutral-600">{label}</div>
<div>{value}</div>
</div>
)
}