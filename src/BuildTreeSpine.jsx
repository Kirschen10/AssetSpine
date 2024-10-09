
/*
 * The BuildTreeSpine component is designed to construct a hierarchical tree structure for bridge elements
 * based on input parameters such as initial data, previous page data, and directory values. 
 * It generates a structured representation of folders for different bridge components which are later 
 * used for CSV generation or further processing in the application.
 *
 * The component consists of:
 * 1. **formatFoldersArray**: Constructs an array of folders and subfolders based on the provided bridge data and folder configuration (e.g., spans, bearings, abutments). It processes bridge-specific attributes and conditions to determine the exact structure needed.
 * 2. **formatArrayToString**: Converts the array from `formatFoldersArray` into a formatted string suitable for CSV storage, adding indices and maintaining a structured format.
 * 3. **convertArrayToDic**: Converts an array of folder paths into a nested object/dictionary format. This is useful for building tree-like structures for displaying folders in a hierarchical manner.
 * 4. **addRowsToArray**: Splits a formatted string into an array of rows while filtering out any empty lines. This helps convert the CSV-like structure back into an array for processing.
 *
 * The component has two modes:
 * - **Edit mode (edit = true)**: It returns the folder structure as a tree based on existing values directly.
 * - **Creation mode (edit = false)**: It builds the folder structure from scratch using the input data and formats it accordingly.
 *
 * Key Features:
 * - Dynamic handling of bridge attributes such as span count, abutment count, and bearings.
 * - Conditional folder creation for directional elements like sides and guard rails based on the bridge orientation (N/S or E/W).
 * - Support for adding subfolders dynamically based on configuration settings.
 * - String formatting for easy conversion to and from CSV format.
 */


const BuildTreeSpine = ({ values, perviousPageData, Directories_values, edit}) => {

  const formatFoldersArray = () => {
    const folders = Directories_values;
    const Initial = values;
    const Advanced = perviousPageData;
    const subFolders = folders["Sub_Folders"]; // If want subfolders it will be 1, otherwise 0
    

    console.log(Advanced);
    if (folders) {
      let resultFoldersArray = Object.keys(folders).filter(key => (folders[key] === true || folders[key] === 1)  && key !== 'id' && key != 'Sub_Folders');
      if (resultFoldersArray.includes('Sides')) {
        if(Initial.Direction === "N/S"){
          resultFoldersArray.push('Sides/North', 'Sides/South');
          resultFoldersArray = resultFoldersArray.filter(item => item !== 'Sides');
      } else {
        resultFoldersArray.push('Sides/West', 'Sides/East');
        resultFoldersArray = resultFoldersArray.filter(item => item !== 'Sides');
      }
    }
    
      ///////// Pier Caps /////////////
      const PierCaps = Advanced.filter((bridge) => bridge.element_type3 === "Number Of Pier Caps");
    
      for (let i = 0; i < PierCaps.length; i++) {
        if ( parseInt(PierCaps[i]["element_type3_quantity"],10) != 0){
          resultFoldersArray.push(`PierCaps/Pier_Cap_${i + 1}_${parseInt(PierCaps[i]["element_type3_quantity"],10)}`);
        }
      }


      /////////// Columns ////////////
      const columns = Advanced.filter((bridge) => bridge.element_type1 === "column row");
      console.log(columns);
      for (let i = 0; i < columns.length; i++) {
        if ( parseInt(columns[i]["element_type2_quantity"],10) != 0){
          for ( let j =0; j< parseInt(columns[i]["element_type2_quantity"],10); j++){
            resultFoldersArray.push(`columns/column${i + 1}_${j+1}`);
          }
        }
      }

      /////////// Abutments ////////////
      
      const abutments = Initial.Abutment_Count;

      for (let i = 0; i < abutments; i++) {
        resultFoldersArray.push(`Abutments/abutment${i + 1}`);
      }

      //////////// Bearings /////////////
      /////////// Bearings/abutment /////////

      const bearingsAbutments = Advanced.filter((bridge) => bridge.element_type1 === "abutment");
      
      if(subFolders === true){
        for (let i = 0; i < bearingsAbutments.length; i++) {
          if ( parseInt(bearingsAbutments[i]["element_type3_quantity"],10) != 0){
            for ( let j =0; j< parseInt(bearingsAbutments[i]["element_type3_quantity"],10); j++){
              resultFoldersArray.push(`Bearings/b_abutment${i + 1}-${j+1}`);
            }
          }
        }
      }
      else{
        for (let i = 0; i < bearingsAbutments.length; i++) {
          if ( parseInt(bearingsAbutments[i]["element_type3_quantity"],10) != 0){
            resultFoldersArray.push(`Bearings/abutment${i + 1}-${parseInt(bearingsAbutments[i]["element_type3_quantity"],10)}`);
          }
        }
      }

      /////////// Bearings/Pier Caps  ////////
      const bearingsColumn = Advanced.filter((bridge) => bridge.element_type3 === "bearings");
      
      if(subFolders === true){
        for (let i = 0; i < bearingsColumn.length; i++) {
          if ( parseInt(bearingsColumn[i]["element_type4_quantity"],10) != 0){
            for ( let j =0; j < parseInt(bearingsColumn[i]["element_type4_quantity"],10); j++){
              resultFoldersArray.push(`Bearings/b_column_${i + 1}-${j+1}`);
            }
          }
        }
      }
      else{
        for (let i = 0; i < bearingsColumn.length; i++) {
          if ( parseInt(bearingsColumn[i]["element_type3_quantity"],10) != 0){
            resultFoldersArray.push(`Bearings/column_${i + 1}-${parseInt(bearingsColumn[i]["element_type3_quantity"],10)}`);
          }
        }
      }

      /////////// Span Count ////////////
      const spanCount = Initial.Span_Count;

      for (let i = 0; i < spanCount; i++) {
        resultFoldersArray.push(`Below-Deck/span_${i + 1}`);
      }
      resultFoldersArray.push("Pavement");

      ///////////////// guard rails ///////////////////

      if(resultFoldersArray.includes("GuardRails")){
        resultFoldersArray = resultFoldersArray.filter(item => item !== "GuardRails");
        if (Initial.Direction === "N/S") {
          resultFoldersArray.push("Guard_rails/north");
          resultFoldersArray.push("Guard_rails/south");

        } else {
          resultFoldersArray.push("Guard_rails/east");
          resultFoldersArray.push("Guard_rails/west");
        }
            }

    /////////// Themal ////////////

      if( folders['Thermal'] === 1){
        resultFoldersArray = resultFoldersArray.filter(item => item !== "Thermal");
        if(Initial.Direction === "N/S"){
          resultFoldersArray.push("Themal/North");
          resultFoldersArray.push("Themal/South");

          }
        else {
          resultFoldersArray.push("Themal/East");
          resultFoldersArray.push("Themal/West");
        }
        resultFoldersArray.push("Themal/pavement");
        for (let i = 0; i < spanCount; i++) {
          resultFoldersArray.push(`Themal/span_${i + 1}`);
        }
        resultFoldersArray.push("Themal/other");
    }
    console.log(resultFoldersArray);
      return formatArrayToString(resultFoldersArray);
    } else {
      console.log("No matching folder found");
      return [];
    }
  };

  // A function that builds for me the form of the string I am requesting, which I will insert into a CSV file
  const formatArrayToString = (arr) => {
    let result = '';
    let currentIndex = 0;
    let nextItemStart = '';
  
    arr.forEach((item, index) => {
      // Calculate nextItemStart for the next iteration
      if (index < arr.length - 1) {
        const nextItem = arr[index + 1];

        const indexOfSlash = nextItem.indexOf('/');
        if (indexOfSlash === -1) {
          nextItemStart = nextItem;
        } else {
          nextItemStart = nextItem.slice(0, indexOfSlash + 1);
        }
      }

      const formattedIndex = currentIndex.toString().padStart(3, '0');
      result += `${formattedIndex}-${item}/`;
      result += '\n';
      
      // Increment index only if the current item contains '/'
      if (!item.includes('/')) {
        currentIndex++;
      }
      else if(!(item.startsWith(nextItemStart) && nextItemStart != '')){
          currentIndex++;
        }    
    });
  
    return result;
  };

  const convertArrayToDic = (explorerArray) => {
    const result = { name: null, parent: null, items: [] };
  
    explorerArray.forEach((itemName) => {
      const parts = itemName.split('/');
      let currentObject = result;
  
      parts.forEach((part, index) => {
        // Find existing item with the same name
        const existingItem = currentObject.items.find((item) => item.name === part);
  
        if (existingItem) {
          currentObject = existingItem;
        } else {
          // Create a new item with a name property and a parent property containing the full path
          const fullPath = currentObject.parent ? currentObject.parent + '/' + currentObject.name : currentObject.name;
          const newItem = { name: part, parent: fullPath, items: [] };
          currentObject.items.push(newItem);
          currentObject = newItem;
        }
  
        // If it's the last part, add an empty items property as an array
        if (index === parts.length - 1) {
          currentObject.items = [];
        }
      });
    });
    return result.items; // Return only the items array
  };
  
  function addRowsToArray(inputString) {
    // Split the input string into rows based on the newline character
    const rows = inputString.split('\n');
  
    // Filter out any empty rows
    const nonEmptyRows = rows.filter(row => row.trim() !== '');
  
    // Return the array of non-empty rows
    return nonEmptyRows;
  }
  if( !edit ){
    const folderTree = formatFoldersArray();
    const folderStructure = convertArrayToDic(addRowsToArray(folderTree));
    return folderStructure;
  }else{
    const folderStructure = convertArrayToDic(values);
    return folderStructure;
  }
}


export { BuildTreeSpine };
export default BuildTreeSpine;
