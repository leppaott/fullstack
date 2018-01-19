import React from 'react'
import Osa from './Osa'

const Sisalto = (props) => {
    return props.parts.reduce((acc, cur) => {
        return [...acc,
            <Osa key={cur.nimi} part={cur.nimi} taskcount={cur.tehtavia} />
        ]
    }, [])
}

export default Sisalto