import { SelectedContextProvider, useSelectedContext } from "../provider/SelectedProvider";
import React, { useState,useEffect } from 'react';

export default function Favorites(){
    const {removeFromFavoriteList,favorites,setSelectedClick} = useSelectedContext()
    const [selected,setSelected] = useState("")
    const [hide,setHide] = useState()

    function OnclickBookHandler(bookId){
        if (selected === bookId) {
            setHide(!hide); 
          } else {
            setSelected(bookId); 
            setHide(false);
          }
        
    }

    function OnclickInfoHandler(book){
        setSelectedClick(book)
    }

    function OnClickRemoveHandler(book){
        removeFromFavoriteList(book)
    }
    return (
        <div className='bookcontainer'>
            <h2>Favorites</h2>
            <div>
                <ul className='bookList'>
                    {favorites && favorites.map((book) => (
                        <li key={book.id} id={book.id} onClick={()=>OnclickBookHandler(book.id)} className={selected === book.id ? 'selected' : ''}>
                            {book.volumeInfo.title}
                            {!hide && selected === book.id && (
                            <div className="buttonGroup">
                                <button onClick={()=>OnclickInfoHandler(book)} className="button">Information</button>
                                <button onClick={()=>OnClickRemoveHandler(book)} className="button">Remove</button>
                            </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}