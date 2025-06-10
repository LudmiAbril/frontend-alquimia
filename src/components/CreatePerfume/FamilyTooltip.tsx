import React from 'react'

interface FamilyTooltipProps {
    family: string
    description?: string
}
const FamilyTooltip = ({family}: FamilyTooltipProps) => {
    return (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-max max-w-[200px] bg-gray-700 text-white text-xs rounded-md px-3 py-2 shadow-lg z-10">
            Información sobre la familia "{family}".
        </div>
    )
}

export default FamilyTooltip