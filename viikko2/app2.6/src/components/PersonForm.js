import React from 'react'

const PersonForm = ({ newName, newNumber, onChange, onSubmit }) => [
    <h3 key='uusi title'>Lisää uusi</h3>,
    <form onSubmit={onSubmit} key='form'>
        <div>
            nimi: <input value={newName} onChange={onChange('newName')} />
        </div>
        <div>
            numero: <input value={newNumber} onChange={onChange('newNumber')} />
        </div>
        <div>
            <button type="submit">lisää</button>
        </div>
    </form>
]

export default PersonForm