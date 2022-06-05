import React from 'react'
import { IndividualData } from './indivisualData'

export const Data = ({allData}) => {
    
//     const obj = undefined;
// if(excelData === undefined || []){
//   const keys = Object.keys(excelData[3]);
// // var keystwo = Object.values(excelData);
// // var keysthree = Object.entries(excelData);
// console.log(excelData[3]);
// console.log(keys[1]);
// // console.log(keystwo);
// // console.log(keysthree);
// }else{
//   console.log("put data");
// }



    return allData.map((individualExcelData)=>(
        <tr key={individualExcelData.id}>
            <IndividualData individualExcelData={individualExcelData}/>
        </tr>        
    ))
}