import React, { useState, useEffect } from 'react';

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
