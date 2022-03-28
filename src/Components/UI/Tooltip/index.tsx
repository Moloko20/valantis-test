import React from 'react'

type TooltipPropsType = {
    value: string
    coords: number[]
}

function TooltipComponent({ value, coords }: TooltipPropsType) {
    const style: React.CSSProperties = {
        top: coords[1] + 15,
        left: coords[0] + 15,
        visibility: coords[0] === 0 ? 'hidden' : 'visible',
    }

    require('./index.sass')

    return (
        <div style={style} className="tooltip">
            {value}
        </div>
    )
}

export const Tooltip = React.memo(TooltipComponent)