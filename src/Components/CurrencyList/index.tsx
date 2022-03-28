import React from 'react'

import { Context } from 'Contexts/context'

import { getCurrency, ValuteItem } from 'Services/getCurrency'

import { Loader } from 'Components/UI/Loader'
import { Tooltip } from 'Components/UI/Tooltip'

const HEAD_TITLES: string[] = ['Наименование валюты', 'Значение, ₽', 'Разница, %']

function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

    React.useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}

function CurrencyListComponent() {
    const [valutes, valutesSet] = React.useState<Array<ValuteItem>>([])
    const [loading, loadingSet] = React.useState<boolean>(false)

    const [currentCurrencyName, currentCurrencyNameSet] = React.useState('')
    const debouncedName = useDebounce<string>(currentCurrencyName, 400)

    const [tooltipCoords, tooltipCoordsSet] = React.useState([0, 0])
    const debouncedCords = useDebounce<Array<number>>(tooltipCoords, 300)

    const [differents, differentsSet] = React.useState<Array<string>>([])

    const context = React.useContext(Context)

    React.useEffect(() => {
        loadingSet(true)

        getCurrency()
            .then(data => {
                valutesSet(Object.values(data.Valute))
            })
            .finally(() => {
                loadingSet(false)
            })
    }, [])

    React.useEffect(() => {
        differentsSet([])

        valutes.forEach(obj => {
            if (!obj) {
                console.log('yes')
                differentsSet(prevState => [...prevState, '0'])
            } else {
                let different = (
                    Math.round(+(100 - (obj.Previous * 100) / obj.Value).toFixed(3) * 10) / 10
                ).toString()

                if (different.length < 3) {
                    different = different + '.0'
                }

                differentsSet(prevState => [...prevState, different])
            }
        })
    }, [valutes])

    const rowClickHandler = React.useCallback((currencyName: string) => {
        context.setCurrentName(currencyName)
    }, [])

    const rowHoverHandler = React.useCallback((currencyName: string) => {
        currentCurrencyNameSet(currencyName)
    }, [])

    const rowUnHoverHandler = () => {
        currentCurrencyNameSet('')
        tooltipCoordsSet([0, 0])
    }

    const rowMoveHandler = React.useCallback((event: React.MouseEvent) => {
        tooltipCoordsSet([event.pageX, event.pageY])
    }, [])

    require('./index.sass')

    return (
        <section className="section">
            <div className="section-header">
                <h1>Курсы валют</h1>
            </div>

            <table className="currency">
                <thead className="currency-head">
                    <tr>
                        {HEAD_TITLES.map(title => (
                            <th key={title}>{title}</th>
                        ))}
                    </tr>
                </thead>

                <tbody className="currency-body">
                    {!loading ? (
                        valutes.map((currencyItem, index) => (
                            <tr
                                onMouseEnter={() => rowHoverHandler(currencyItem.Name)}
                                onMouseLeave={rowUnHoverHandler}
                                onMouseMove={rowMoveHandler}
                                onClick={() => rowClickHandler(currencyItem.Name)}
                                key={currencyItem.ID}
                            >
                                <td>{currencyItem.CharCode}</td>
                                <td>{currencyItem.Value}</td>
                                <td
                                    className={
                                        +differents[index] >= 0
                                            ? 'different--up'
                                            : 'different--down'
                                    }
                                >
                                    {differents[index]}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="loading">
                                <Loader />
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td className="tooltip_wrapper">
                            {debouncedName && (
                                <Tooltip value={debouncedName} coords={debouncedCords} />
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

export const CurrencyList = React.memo(CurrencyListComponent)