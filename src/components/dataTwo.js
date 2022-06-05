import React from "react";
import { IndividualDataTwo } from "./indivisualDataTwo";

export const DataTwo = ({ allData, tableHeader }) => {
  return allData.map((individualExcelData) => (
    <tr key={individualExcelData.id}>
      <IndividualDataTwo
        individualExcelData={individualExcelData}
        tableHeader={tableHeader}
      />
    </tr>
  ));
};
