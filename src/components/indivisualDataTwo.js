import React from "react";

export const IndividualDataTwo = ({ individualExcelData, tableHeader }) => {
  return (
    <>
      {tableHeader.map((headerValue) => (
        <th value={headerValue} key={headerValue} scope="col">
          {individualExcelData[headerValue]}
        </th>
      ))}
    </>
  );
};
