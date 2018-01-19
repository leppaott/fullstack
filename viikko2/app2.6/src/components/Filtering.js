import React from 'react'

const Filtering = ({ filter, onChange }) =>
    <input value={filter} onChange={onChange('filter')} />

export default Filtering