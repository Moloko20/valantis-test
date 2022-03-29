import React from 'react'

import { getCurrency, getCurrencyHistory, ValuteItem } from 'Services/getCurrency'

import { CloseButton } from 'Components/UI/CloseButton'
import { Loader } from 'Components/UI/Loader'

type CurrencyHistoryPropsType = {
    currentName: string
}

const HEAD_TITLES: string[] = ['Дата', 'Значение, ₽', 'Разница, %']

function CurrencyHistoryComponent({ currentName }: CurrencyHistoryPropsType) {
    const [currentCurrencyName, currentCurrencyNameSet] = React.useState('')
    const [loading, loadingSet] = React.useState<boolean>(false)

    const [currencies, currenciesSet] = React.useState<Array<ValuteItem>>([])

    const [days, daysSet] = React.useState<Array<string>>([])
    const currencyPrevURL = React.useRef<string>(null)

    const [differents, differentsSet] = React.useState<Array<string>>([])

    const btnClickNandler = () => {
        currentCurrencyNameSet('')
    }

    React.useEffect(() => {
        loadingSet(true)

        getCurrency()
            .then(data => {
                daysSet([data.Date])
                currencyPrevURL.current = data.PreviousURL
            })
            .finally(() => {
                loadingSet(false)
            })
    }, [])

    React.useEffect(() => {
        if (currentName !== '') {
            loadingSet(true)

            currentCurrencyNameSet(currentName)

            if (currencies.length > 0) {
                currenciesSet([])
            }

            getCurrencyHistory(currencyPrevURL.current)
                .then(data => {
                    data.forEach(currencyData => {
                        daysSet(prevState => [...prevState, currencyData.Date])

                        const currency = Object.values(currencyData.Valute).find(
                            obj => obj.Name === currentName,
                        )

                        currenciesSet(prevState => [...prevState, currency])
                    })
                })
                .finally(() => loadingSet(false))
        }
    }, [currentName])

    React.useEffect(() => {
        if (currencies.length === 10) {
            differentsSet([])

            currencies.forEach(obj => {
                if (!obj) {
                    differentsSet(prevState => [...prevState, '0'])
                } else {
                    let different = (
                        Math.round(+(100 - (obj.Previous * 100) / obj.Value).toFixed(3) * 10) / 10
                    ).toString()

                    differentsSet(prevState => [...prevState, different])
                }
            })
        }
    }, [currencies])

    return (
        <section className="section section-history">
            {currentCurrencyName ? (
                <div className="section-history__wrapper">
                    <div className="section-header">
                        <h1>{currentName}</h1>
                        <CloseButton clickHandler={btnClickNandler} />
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
                                currencies.map((currencyItem, index) => {
                                    if (!currencyItem) {
                                        return (
                                            <tr key={`${currencyItem}${index}`}>
                                                <td colSpan={3}>Данные не найдены</td>
                                            </tr>
                                        )
                                    }
                                    return (
                                        <tr key={currencyItem.Value}>
                                            <td>
                                                {days[index]
                                                    .split('T')[0]
                                                    .split('-')
                                                    .reverse()
                                                    .join('.')}
                                            </td>
                                            <td>{currencyItem.Value.toFixed(2)}</td>
                                            <td
                                                className={
                                                    +differents[index] >= 0
                                                        ? 'different--up'
                                                        : 'different--down'
                                                }
                                            >
                                                {differents[index].length < 3
                                                    ? Math.abs(+differents[index]) + '.0'
                                                    : Math.abs(+differents[index])}
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={3} className="loading">
                                        <Loader />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="section-history__info">
                    Чтобы посмотреть историю курса валюты за&nbsp;последние 10&nbsp;дней, выберите
                    его в&nbsp;соседнем окне.
                </div>
            )}

            <div className="section-history__wrapper"></div>
        </section>
    )
}

export const CurrencyHistory = React.memo(CurrencyHistoryComponent)