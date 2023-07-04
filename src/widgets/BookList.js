import React, { useEffect, useState } from 'react'
 
export default function BookListWidget() {
  const [BookListData, setBookListData] = useState()
 
  useEffect(() => {
    let bookList = JSON.parse(localStorage.getItem('bookList')) || []
    if (!bookList || bookList === "undefined") {
      bookList = []
    }
    setBookListData(bookList)
  }, [])
 
  useEffect(() => {
    if (!BookListData) {
      return
    }
    localStorage.setItem('bookList', JSON.stringify(BookListData))
  }, [BookListData])
 
  return (
    <div style={{ minWidth: 300 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "row" }}>
        <p>Book List</p>
        <button
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={() => {
            setBookListData([...BookListData, {
              title: '',
              datestamp: '',
              checked: false,
            }])
          }}
        >+ New</button>
      </div>
      {BookListData?.length > 0 && BookListData.map((book, index) => {
        return (
          <div className='book-container' key={index}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "row" }}>
              <input className='text-input' value={book.title}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    let bookList = [...BookListData]
                    bookList[index].title = e.target.value
                    bookList[index].datestamp = new Date()
                    setBookListData([...bookList, {
                      title: '',
                      datestamp: '',
                      checked: false,
                    }])
                  }
                }}
                onChange={(e) => {
                  let bookList = [...BookListData]
                  bookList[index].title = e.target.value
                  bookList[index].datestamp = new Date()
                  bookList[index].checked=false
                  setBookListData(bookList)
                }} 
                style={{
                  textDecoration:book.checked ? "line-through":"none",
                }}
                
                />
              <input type="checkbox"
                style={{
                  background: "none",
                  border: "none",
                  color: "none",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
                onChange={(e)=>{
                  
                    let bookList = [...BookListData];
                    bookList[index].checked = !bookList[index].checked;
                    setBookListData(bookList)
                    
                }}
          
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}