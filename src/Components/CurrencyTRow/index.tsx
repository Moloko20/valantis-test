import React from 'react'

import { Tooltip } from 'Components/UI/Tooltip'
import { Context } from 'Contexts/context'

export type CurrencyDataType = {
    ID: string
    Name: string
    Previous: number
    Value: number
    Date?: string
    CharCode?: string
}

type CurrencyRowPropsType = {
    currency: CurrencyDataType
}

function CurrencyRowComponent({ currency }: CurrencyRowPropsType) {
    const [tooltipIsVisible, setTooltipIsVisible] = React.useState(true)
    const [tooltipCoords, setTooltipCoords] = React.useState([0, 0])
    const context = React.useContext(Context)

    const rowHoverHandler = () => {
        setTooltipIsVisible(true)
    }

    const rowUnHoverHandler = () => {
        setTooltipIsVisible(false)
    }

    const rowMoveHandler = React.useCallback(
        (event: React.MouseEvent) => {
            if (tooltipIsVisible) {
                setTooltipCoords([event.pageX, event.pageY])
            }
        },
        [tooltipCoords],
    )

    const rowClickHandler = React.useCallback(() => {
        context.setCurrentName(currency.Name)
    }, [])

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
                onClick={rowClickHandler}
            >
                {currency.Date ? (
                    <td>{currency.Date.split('T')[0].split('-').reverse().join('.')}</td>
                ) : (
                    <td>{currency.CharCode}</td>
                )}
                <td>{currency.Value}</td>
                <td colSpan={2} className={'different' + differentClassName}>
                    {different}
                </td>
                <td>
                    {tooltipIsVisible && <Tooltip value={currency.Name} coords={tooltipCoords} />}
                </td>
            </tr>
        </>
    )
}

export const CurrencyRow = React.memo(CurrencyRowComponent)