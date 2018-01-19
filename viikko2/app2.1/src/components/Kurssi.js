import React from 'react'
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'
import Yhteensa from './Yhteensa'

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko title={kurssi.nimi} />
            <Sisalto parts={kurssi.osat} />
            <Yhteensa parts={kurssi.osat} />
        </div>
    )
}

export default Kurssi