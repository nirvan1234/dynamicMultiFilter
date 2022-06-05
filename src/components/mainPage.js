import React, { useState, useEffect, useCallback } from "react";
import "./mainPage.css";
import * as XLSX from "xlsx";
import { Data } from "./data";
import { DataTwo } from "./dataTwo";
import { ExportCSV } from "./ExportCSV";

function MainPage() {
  // on change states
  const [excelFile, setExcelFile] = useState([]);
  const [excelFileError, setExcelFileError] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);

  // const genders = ["male", "female"];
  // const places = ["bhopal", "pune", "surat", "delhi"];
  // const stat = ["active", "inactive"];

  const [multipleFilter, setMultipleFilter] = useState({
    filterGender: "",
    filterStatus: "",
    filterPlace: "",
  });

  const [excelData, setExcelData] = useState([]);
  const [allData, setData] = useState(excelData);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(5);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const pages = [];
  for (let i = 1; i <= Math.ceil(tableData.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFistItem = indexOfLastItem - itemsPerPage;
  const currentItem = tableData.slice(indexOfFistItem, indexOfLastItem);

  const handleNewClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleNewClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const fileType = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError([]);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile([]);
      }
    } else {
      console.log("error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      if (data?.length > 0) {
        setExcelData(data);
        setData(data);
        setTableData(data);
        setTableHeader(Object.keys(data[0]));
      } else {
        setExcelData([]);
        setData([]);
        setTableData([]);
      }
    } else {
      setExcelData([]);
      setData([]);
      setTableData([]);
    }
  };

  let firstColumnName = allData.map((o) => ({
    [tableHeader[0]]: o[tableHeader[0]]
  }));
  let SecondColumnName = allData.map((o) => ({
    [tableHeader[1]]: o[tableHeader[1]]
  }));
  let ThirdColumnName = allData.map((o) => ({
    [tableHeader[2]]: o[tableHeader[2]]
  }));

  const onHandleInputchange = (event, FilterName) => {
    setMultipleFilter({
      ...multipleFilter,
      [FilterName]: event.target.value,
    });

    setMultipleFilter((state) => {
      let DummyData = allData;
      if (state.filterGender) {
        DummyData = DummyData.filter((item) => {
          return item[a] === state.filterGender;
        });
      }
      if (state.filterPlace) {
        DummyData = DummyData.filter((item) => {
          return item[b] === state.filterPlace;
        });
      }
      if (state.filterStatus) {
        DummyData = DummyData.filter((item) => {
          return item[c] === state.filterStatus;
        });
      }
      setTableData(DummyData);
      return state;
    });
  };


  

  let [a,b,c] = tableHeader;


  const generateFirstColDataForDropdown = () => {
    return [...new Set(firstColumnName.map((item) => item[a]))];
  };
  const generateSecondColDataForDropdown = () => {
    return [...new Set(SecondColumnName.map((item) => item[b]))];
  };
  const generateThirdColDataForDropdown = () => {
    return [...new Set(ThirdColumnName.map((item) => item[c]))];
  };


//   let uniqueChar = firstColumnName.filter( (c,index) =>{
//     return firstColumnName.indexOf(c) !== index;
//  })
 
//  console.log("heybhagwan" ,uniqueChar);

  // const genders = [generateGenderDataForDropdown()]

  const  genders = generateFirstColDataForDropdown();
  const places = generateSecondColDataForDropdown();
  const stat = generateThirdColDataForDropdown();


  console.log("hey1",genders);
  console.log("hey2",places);
  console.log("hey3",stat);
  console.log("hey",tableHeader);

 

  console.log("a",a);
  console.log("b",b);
  console.log("c",c);


  // This has to be made Dynamic TOO
  let resultName = tableData.map((o) => ({
    [tableHeader[0]]: o[tableHeader[0]],
    [tableHeader[1]]: o[tableHeader[1]],
    [tableHeader[2]]: o[tableHeader[2]],
  }));

  const fileName = "Filtered_Excel";
  // console.log("result", resultName);

  return (
    <div className="container">
      <div
        className="form"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2.5rem",
        }}
      >
        <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
          <label>
            <h5>Upload FILE</h5>
          </label>
          <br></br>
          <div style={{ display: "flex" }}>
            <input
              type="file"
              className="form-control"
              onChange={handleFile}
              required
            ></input>
            <button
              type="submit"
              style={{ marginLeft: "1rem" }}
              className="btn btn-success ml-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <div>
            {excelFileError && (
              <div className="text-danger">{excelFileError}</div>
            )}
          </div>
        </form>
      </div>

      {excelData.length > 0 ? (
        <>
          <div className="viewer">
            <div className="viewerButton">
              <ExportCSV csvData={resultName} fileName={fileName} />
              <button
                style={{ marginLeft: "45%" }}
                type="button"
                className="btn btn-primary"
              >
                <select
                  className="form-control"
                  id="gender"
                  onChange={(e) => {
                    onHandleInputchange(e, "filterGender");
                  }}
                >
                  <option value="">gender</option>
                  {genders.map((gender) => (
                    <option value={gender} key={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </button>
              <button
                style={{ marginLeft: "10%" }}
                type="button"
                className="btn btn-primary"
              >
                <select
                  className="form-control"
                  id="place"
                  onChange={(e) => {
                    onHandleInputchange(e, "filterPlace");
                  }}
                >
                  <option value="">place</option>
                  {places.map((place) => (
                    <option value={place} key={place}>
                      {place}
                    </option>
                  ))}
                </select>
              </button>
              <button
                style={{ marginLeft: "10%" }}
                type="button"
                className="btn btn-primary"
              >
                <select
                  className="form-control"
                  id="status"
                  onChange={(e) => {
                    onHandleInputchange(e, "filterStatus");
                  }}
                >
                  <option value="">Select</option>
                  {stat.map((status) => (
                    <option value={status} key={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </button>
            </div>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr className="employee-header">
                    {tableHeader.map((headerValue) => (
                      <th
                        style={{ textTransform: "capitalize" }}
                        value={headerValue}
                        key={headerValue}
                        scope="col"
                      >
                        {headerValue}
                      </th>
                    ))}
                  </tr>
                </thead>
                {excelData.length > 0 ? (
                  <>
                    <tbody>
                      <DataTwo allData={currentItem} tableHeader={tableHeader} />
                    </tbody>
                  </>
                ) : (
                  <tbody>
                    <tr>
                      <td></td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
          {currentItem.length >0 ? (
          <ul className="pageNumbers">
            <li>
              <button
                onClick={handlePrevbtn}
                disabled={currentPage === pages[0] ? true : false}
              >
                Previous
              </button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}

            <li>
              <button
                onClick={handleNextbtn}
                disabled={
                  currentPage === pages[pages.length - 1] ? true : false
                }
              >
                Next
              </button>
            </li>
          </ul>
          ):(
            <div><h3>There is Result for Particular Filter !</h3></div>
          )}
        </>
      ) : (
        <div className="text-center">
          <h1>Please Upload your FILE!</h1>
        </div>
      )}
    </div>
  );
}

export default MainPage;
