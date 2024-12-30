import React, { createContext, useContext,  useState } from 'react';


const SelectedContext = createContext()

export const SelectedContextProvider = ({children})=>{
    const [selectedClick,setSelectedClick] = useState(undefined)
    const [favorites, setFavorite] = useState([])
    const [showHist, setShowHist] = useState(false)
    const [histData,setHistData] = useState({})

    const addToFavoriteList = (book)=>{
        const newfavorites = [...favorites]
        const check = newfavorites.map(el=>el.id).includes(book.id)
        if (!check){
            newfavorites.push(book)
            setFavorite(newfavorites)
        }
        
        

    }

    const removeFromFavoriteList = (book)=>{
        
        const ind = favorites.findIndex((el)=>el.id===book.id)
        const newfavorites = [ ...favorites ];
        newfavorites.splice(ind,1)
        setFavorite(newfavorites)
    }

    const counterGenres = ()=>
    {
        const genres = {}
        if (favorites.length!==0){
        for (const book of favorites){
            const check = book?.volumeInfo?.categories
            if (check){
            for (const category of check){
                if (Object.keys(genres).findIndex(key=>key===category)!==-1){
                    genres[category]++;
                }
                else
                {
                    genres[category] = 1
                }
            }}
        }
        }
        setHistData(genres)

    }


    return (
        <SelectedContext.Provider value={{selectedClick,setSelectedClick,addToFavoriteList,removeFromFavoriteList,favorites,showHist,setShowHist,counterGenres,histData}}>
            {children}
        </SelectedContext.Provider>
    )
}

export function useSelectedContext(){
    return useContext(SelectedContext);
}