import React from 'react'

export const IndividualData = ({individualExcelData}) => {
    return (
        <>
            <th>{individualExcelData.id}</th>
            <th>{individualExcelData.name}</th>
            <th>{individualExcelData.surname}</th>
            <th>{individualExcelData.gender}</th>
            <th>{individualExcelData.place}</th>
            <th>{individualExcelData.age}</th>
            <th>{individualExcelData.status}</th>
        </>
    )
}