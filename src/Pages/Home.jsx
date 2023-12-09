import React from 'react'

import { useState,useEffect, useRef } from 'react'
import '../App.css'

import Header from '../Partials/Header'
import Fotter from '../Partials/Fotter'

const BooksAPI = `https://novelty-nook.company.digisolapps.com/api/books`
const CategoriesAPI = `https://novelty-nook.company.digisolapps.com/api/books/categories`



import {  useSelector } from 'react-redux';
import { addToFavorates,removeFromFavorates } from '../State/States';
import Book_Card from '../Components/Book_Card'

export default function Home() {
    // to keep track of category filtering
    const [Category, setCategory] = useState(0)

    // Store and render Category components/elements
    const [Categories,setCategories] =  useState([])
    // To keep track of Category loading state
    const [IsCategoriesLoading,setIsCategoriesLoading] =  useState(false)
    // To Refrence and abbort any pending loading requests when needed.
    const CategoriesAbortControllerRef = useRef(null)
    
    // Store and render Book components/elements
    const [Books,setBooks] = useState([])
    // To keep track of Book loading state
    const [IsBooksLoading,setIsBooksLoading] = useState(false)
    // To Refrence and abbort any pending loading requests when needed.
    const BooksAbortControllerRef = useRef(null)
    
    // to keep track of any errors that may occur.
    const [Error, setError] = useState(null)
    
    
    
    const favorates = useSelector ((state)=>{
      return state.global.favorates
    })


    // feaching data for Books.
    const fetchBooks = async ()=>{
    
        // Abborting previous requests if any
      BooksAbortControllerRef.current?.abort();
      BooksAbortControllerRef.current= new AbortController();
    
      // Seeting Loading to true (intended for use feedback)
      setIsBooksLoading(true)
    
        
      try{

        // check if the user have specified a category
        // if not category is specified request all books
        const response = await  fetch(`${BooksAPI}${Category ? `?category=${Category}`: ""}`, {signal : BooksAbortControllerRef.current?.signal})

        // getting resposones in json
        let json = await response.json()

        // convert the return in object in to an array to map the returned values. 
        if(Category)
        {
            let newarr= []
            for(const [key,value] of Object.entries(json))
            {
                newarr.push(value)
                // console.log(value)
            }
            json=newarr
        }
        
        // set the new Json value to Books sate for rendring
        if(JSON.stringify(Books) !== JSON.stringify(json) ){
          setBooks( ()=>{
            return (json)
          })
        }
        
      }
      catch(error)
      {
        // if there is an abbort error, do not update error 
        if (error.name === "AbortError")
        {
          console.log("Aborted")
          return;
        }
        else{

            setError(error);
        }
      }
      finally{
        // change loading state to false ( inteded for user feedback and to allow components to be rendered)
        setIsBooksLoading(false)
      }
      
    }
    
    
    const fetchCategories = async ()=>{

    // Abborting previous requests if any
      CategoriesAbortControllerRef.current?.abort();
      CategoriesAbortControllerRef.current= new AbortController();
    
        // Seeting Loading to true (intended for use feedback)
      setIsCategoriesLoading(true)
      try{
        const response = await  fetch(CategoriesAPI,{signal: CategoriesAbortControllerRef.current?.signal})
        const json = await response.json()
        
            // set the new Json value to Categories sate for rendring
        if(JSON.stringify(Categories) !== JSON.stringify(json) ){
          setCategories( ()=>{
            return (json)
          })
        }
        
      }
      catch(error)
      {
         // if there is an abbort error, do not update error 
        
        if (error.name === "AbortError")
        {
          console.log("Aborted")
          return;
        }
        else{

            setError(error);
        }
      }
      finally{
        // change loading state to false ( inteded for user feedback and to allow components to be rendered)
        setIsCategoriesLoading(false)
      }
    }
    

    useEffect(()=>{
    // Load books and categories based on the current Category
    
      fetchBooks()
      fetchCategories()
      
    },[Category])


    //  render books using bookCard Component
    const BookCards = Books.map(book=>{
      return (
        <Book_Card key={book.id} id={book.id} title={book.title} description={book.description} cover_picture={book.cover_picture} author_name={book.author.name} category_name={book.category.name} price={book.price} addToFavorates={addToFavorates} removeFromFavorates={removeFromFavorates} isFavorate={favorates[book.id]} />
      )
    })
    
    
    const CategoryPill = Categories.map(cat =>{
      return (
        <div className={`CategoryPill ${cat.id == Category ? "highlight" : ""}`}
            onClick={()=>{
                setCategory(parseInt(cat.id));
            }}
        >
          {cat.name}
        </div>
      )
    })
    
    return (
      <>

        <Header></Header>
    
        <main>
            
        {
        /* if there are any errors, then only render the error.  */
        Error ? 
        <div>
            <h1>Error... something went wrong</h1>
            <p>{Error.message}</p>

        </div>
        : 
            <>
            
                {
                    /* dispaly loading state for user if the data is still loading */
                    IsCategoriesLoading ? "loading . . . " : 
                    <>
                        <section className='Category-Container'>
                            <h3>Categories</h3>
                            <div className={`CategoryPill ${0 == Category ? "highlight" : ""}`}
                            onClick={()=>{
                                setCategory(parseInt(0));
                            }}
                            >
                            All
                            </div>
                        {CategoryPill ? CategoryPill : "Nothing" }
                        </section>
                
                
                    </>
                }
                {
                    /* dispaly loading state for user if the data is still loading */
                    IsBooksLoading ? "loading . . . " : 
                    <>
                    <section className='Books-Container'>
                        
                        {BookCards? BookCards : "noithing"}
                    </section>
            
                    </>
                }
            </>
        }
          
          
        </main>
    
        <Fotter></Fotter>
      </>
    )
}
