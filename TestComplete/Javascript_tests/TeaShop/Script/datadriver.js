function getData(file, sheet=""){
  
  if(Project.Variables.Input != null){
    Log.Message("using command line argument");
    Log.Message(Project.Variables.Input);
    
    if (Project.Variables.Sheet!=null){
      Log.Message(Project.Variables.Sheet);
      var driver = DataDriver_init(Project.Variables.Input,Project.Variables.Sheet);
    }
    else{
      var driver = DataDriver_init(Project.Variables.Input);
    }
        
  }
  else {  
    Log.Message("running in test complete");
    var driver = DataDriver_init(file,sheet);
  }
  
  return(driver);
}

function DataDriver_init(file, sheet="Sheet1"){
  
    let filetype = checkFile(file);
    if(filetype == "csv"){  
      var driver = DDT.CSVDriver(file);
    }
    else if (filetype == "excel"){
      var driver = DDT.ExcelDriver(file, sheet);
    }
    else{
      Log.Error("file is not CSV or Excel");
    }
      
  return(driver)
}

function checkFile(file) {
  //from: https://gist.github.com/niczak/5470218
  var extension = file.substr((file.lastIndexOf('.') +1));
  if (/(csv)$/ig.test(extension)) {
     return "csv";
  }
  else if (/(xlsx|xls)$/ig.test(extension)){
     return "excel";
  }
  else{
    return "nan";
  }
}

module.exports.getData = getData;