import React from 'react'
import { Tooltip } from 'Components/UI/Tooltip'

type CurrencyRowPropsType = {
    currency: {
        CharCode: string
        ID: string
        Name: string
        Nominal: number
        NumCode: string
        Previous: number
        Value: number
    }
}

export function CurrencyRow({ currency }: CurrencyRowPropsType) {
    const [tooltipIsVisible, setTooltipIsVisible] = React.useState(true)
    const [tooltipCoords, setTooltipCoords] = React.useState([0, 0])

    const rowHoverHandler = () => {
        setTooltipIsVisible(true)
    }

    const rowUnHoverHandler = () => {
        setTooltipIsVisible(false)
    }

    const rowMoveHandler = (event: React.MouseEvent) => {
        if (tooltipIsVisible) {
            setTooltipCoords([event.pageX, event.pageY])
        }
    }

    let different: number | string = +(
        (currency.Value / 100) *
        (currency.Value - currency.Previous)
    ).toFixed(1)

    let differentClassName: string = ''

    if (different > 0) {
        differentClassName = 'different--up'
    } else if (different < 0) {
        differentClassName = 'different--down'
        different = Math.abs(different)
    }

    if (String(different).length < 2) {
        different = different + '.0'
    }

    require('./index.sass')

    return (
        <>
            <tr
                onMouseEnter={rowHoverHandler}
                onMouseLeave={rowUnHoverHandler}
                onMouseMove={rowMoveHandler}
            >
                <td>{currency.CharCode}</td>
                <td>{currency.Value}</td>
                <td colSpan={2} className={differentClassName}>
                    {different}
                </td>
                <td>
                    {tooltipIsVisible && <Tooltip value={currency.Name} coords={tooltipCoords} />}
                </td>
            </tr>
        </>
    )
}
