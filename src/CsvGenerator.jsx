import React, { useState, useEffect } from 'react';
import './CSS/CsvGenerator.css';

/*
 * The CsvGenerator component is designed to generate and download a CSV file containing folder paths associated with a specific bridge asset.
 * It provides either a button or an image (acting as a button) for users to trigger the download process based on the value of the `ImgOrButton` prop.
 *
 * Props:
 * 1. **CSVBridge** (object): Represents the bridge data passed into the component, including details such as its bid (Bridge ID) and name.
 * 2. **ImgOrButton** (string): Determines whether the component should render a button (`"Button"`) or an image (`"Image"`) for triggering the CSV download.
 *
 * Major Features:
 * 1. **Data Fetching**:
 *    - The component fetches folder data from an API endpoint (`http://localhost:8081/tbl_final_tree_spine`) on component mount.
 *    - The fetched data is filtered based on the bridge ID (`CSVBridge.bid`) to include only relevant folders for the current bridge.
 *
 * 2. **CSV Download**:
 *    - The `handleButtonClick` function formats the data into a CSV string and creates a downloadable file.
 *    - It uses a `Blob` to store the CSV data and programmatically creates and clicks a download link to save the file.
 *
 * 3. **Dynamic Rendering**:
 *    - The component renders either a button or an image based on the `ImgOrButton` prop:
 *        - If `"Button"`, it shows a "Download CSV" button.
 *        - If `"Image"`, it displays an image (paper clip) which acts as a button for downloading the CSV.
 *    - The button and image also include hover effects to enhance user interaction.
 *
 * 4. **Hover Effect**:
 *    - When the image is hovered over, an additional tooltip appears to indicate that the user can download the CSV file.
 *
 * 5. **Utility Functions**:
 *    - `formatFoldersArray`: Filters and formats the folder paths related to the bridge into a CSV string.
 *    - `formatArrayToString`: Converts the array of folder paths into a string, adding newline characters for CSV formatting.
 *
 * This component provides a simple and user-friendly interface for downloading folder structure data associated with a bridge in CSV format.
 */


const CsvGenerator = ({ CSVBridge, ImgOrButton }) => {
  const [dataTblFinallTreeSpineFolders, setDataTblFoldersFinallTreeSpineFolders] = useState([]); 

  const [isHovered, setIsHovered] = useState(false);

  let image = "";  
  let button = "";
  if( ImgOrButton === 'Image' ){
     image = true;
  }
  else{
     image = false;
  }


  useEffect(() => {
      fetch('http://localhost:8081/tbl_final_tree_spine')
      .then(res => res.json())
      .then(dataTblFinallTreeSpineFolders => {
        setDataTblFoldersFinallTreeSpineFolders(dataTblFinallTreeSpineFolders);
      })
      .catch(err => console.log(err));
  }, []);

  const handleButtonClick = (name) => {
    // Data to be written to the CSV file
    // ("\n") = same column , (",") = different column
    const csvData = formatFoldersArray();

    // Create a Blob object with the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);

    link.download = name + '.csv';

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the DOM
    document.body.removeChild(link);
  };

  
    // A function that builds for me the form of the string I am requesting, which I will insert into a CSV file
    const formatArrayToString = (arr) => {
      let result = '';

      for(let i =0; i< arr.length; i++){
        // Join the array items with a comma and add a newline character after each item
        result += arr[i];
        result += '\n';
     }  
      return result;
    };

  const formatFoldersArray = () => {
    const folders = dataTblFinallTreeSpineFolders.filter((bridge) => bridge.bridge_id === CSVBridge.bid);
    let resultFoldersArray = [];
   
    for(let i =0; i< folders.length; i++){
      resultFoldersArray.push(folders[i].path_folder);
    }

    return formatArrayToString(resultFoldersArray);
  };

  return (
    <div className='CsvGenerator'>
      {!image && 
      <button class="buttonDownload" onClick={() => handleButtonClick(CSVBridge.name)}>
      <span>Download CSV</span>
      </button>}
      {image && 
       <button
       onClick={() => handleButtonClick(CSVBridge.name)}
       style={{ backgroundColor: "#E1E1E1", border: "none" }}
       onMouseEnter={() => setIsHovered(true)}
       onMouseLeave={() => setIsHovered(false)}
     >
      <img src="/images/paper-clip.png" width={"20px"} height={"20px"} />
      </button>}

      {isHovered &&  (
        // Additional content to show on hover
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", color: "white", borderRadius: "7px", padding: "10px", position: "absolute"}}>
          Download CSV file
        </div>
      )}
    </div>
  );
};

export default CsvGenerator;
