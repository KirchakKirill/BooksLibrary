import { SelectedContextProvider, useSelectedContext } from "../provider/SelectedProvider"

import GenrePieChart from "./piechart";
export default function Info(){
    const {selectedClick,showHist,setShowHist,histData} = useSelectedContext() 
    
    function onClickHistCLoseButtonHandler(){
        setShowHist(false)
    }


    return (<div className="info-container">
    {!showHist?(<div><h1 className="book-title">{selectedClick?.volumeInfo?.title}</h1>
    <h3>{selectedClick?.volumeInfo?.authors===undefined?'Unknown\t\t\t\t\t\t':selectedClick?.volumeInfo?.authors[0]}</h3>
    <p className="book-description">{selectedClick?.volumeInfo?.description===undefined?'Unknown\t\t\t\t\t\t':selectedClick?.volumeInfo?.description}</p>
    </div>):
    <div>
    <GenrePieChart histData={histData}/>
    <button onClick={onClickHistCLoseButtonHandler} className="button">Close</button>
    </div>
    }
    
    
    </div>);
   
}