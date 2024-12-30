import { useCallback, useEffect, useState } from 'react';
import "../provider/FilterProvider"
import { useFilterContext } from '../provider/FilterProvider';
import {useSelectedContext} from "../provider/SelectedProvider"
import Favorites from './favorites';

export default function Books({ddd})
{
    const  url = 'https://www.googleapis.com/books/v1/volumes' 
    const {country,category,fromDate,toDate} = useFilterContext()
    const {favorites,setSelectedClick,addToFavoriteList,setShowHist,counterGenres} = useSelectedContext()
    const [selected,setSelected] = useState("")
    const [items,setItems] = useState([]) 
    const [hide,setHide] = useState()
    const [showFavorites,setShowFavorites]  = useState(false)

    const responseFunc  = useCallback(async () => {
        const response = await fetch(`${url}?q=subject:${category}&langRestrict=${country}&maxResults=40&key=AIzaSyCefK7060kNFZfPRbNig4JeI2sZWy25AKI`)
        const data = await response.json()
        let filteredBooks = data.items || [];
        
        
        if (fromDate && toDate) {
            filteredBooks = filteredBooks.filter(book => {
              const publishedDate = book.volumeInfo.publishedDate;
              return (
                publishedDate >= fromDate && publishedDate <= toDate
              );
            });
        }
        setItems(filteredBooks);
        
    },[country,category,fromDate,toDate]);

    function OnclickBookHandler(bookId){
        if (selected === bookId) {
            setHide(!hide); 
          } else {
            setSelected(bookId); 
            setHide(false);
          }
        
    }
    function OnCLickSwitchHandler(){
        setShowFavorites(!showFavorites)
    }

    function OnclickInfoHandler(book){
        setSelectedClick(book)
    }

    function OnclickFavoriteHandler(book){
        addToFavoriteList(book)
    }

    function onClickHistButtonHandler(){
        setShowHist(true)
        
    }

    const isFavorite = (book) => {
        return favorites.some(favBook => favBook.id === book.id);
    };
    
    useEffect(()=>{
        responseFunc();
        counterGenres()

    },[responseFunc,favorites])

    function setClass(book){
        let className = '';
        if (isFavorite(book)) {
        className = 'favorite';
        } else if (selected === book.id) {
        className = 'selected';
        }
        return className
    }

    return (
        <div className='bookcontainer'>
            <h2>Books</h2>
            <div className='button-container'>
            <button onClick={OnCLickSwitchHandler} className="button">{showFavorites?"All books":"Favorites"}</button>
            <div className="label-container">
            <label htmlFor="btn1" className="label">Add to fav before</label>
            <button id="btn1" onClick={onClickHistButtonHandler} className="button">Pie Chart</button>
            </div>
            </div>
            
            <div >
                {!showFavorites?(
                <ul className='bookList'>
                    {items && items.map((book) => (
                        <li key={book.id} id={book.id} onClick={()=>OnclickBookHandler(book.id)} className={setClass(book)}>
                            {book.volumeInfo.title}
                            {!hide && selected === book.id && (
                            <div className="buttonGroup">
                                <button onClick={()=>OnclickInfoHandler(book)} className="button">Information</button>
                                <button onClick={()=>OnclickFavoriteHandler(book)} className="button">Add to favorites</button>
                            </div>
                            )}
                        </li>
                    ))}
                </ul>):
                (<Favorites/>)
                }
            </div>
        </div>
    );
}