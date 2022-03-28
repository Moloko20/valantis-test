import React from 'react'

import { CurrencyOldList } from 'Components/CurrencyOldList'
import { CloseButton } from 'Components/UI/CloseButton'

type CurrencyPopupPropsType = {
    currentName: string
}

export function CurrencyPopup({ currentName }: CurrencyPopupPropsType) {
    const [currentPopupName, setCurrentPopupName] = React.useState('')

    const btnClickNandler = () => {
        setCurrentPopupName('')
    }

    console.log(currentPopupName)

    React.useEffect(() => {
        if (currentName !== '') {
            setCurrentPopupName(currentName)
        }
    }, [currentName])

    require('./index.sass')

    return (
        <section className="section section-popup">
            {currentPopupName ? (
                <>
                    <div className="section-header">
                        <h1>{currentPopupName}</h1>
                        <CloseButton clickHandler={btnClickNandler} />
                    </div>

                    <CurrencyOldList currentName={currentPopupName} />
                </>
            ) : (
                <div className="section-popup__info">
                    Чтобы посмотреть историю курса валюты за&nbsp;последние 10&nbsp;дней, выберите
                    его в&nbsp;соседнем окне.
                </div>
            )}
        </section>
    )
}
