const express = require('express');
const bodyParser = require('body-parser');
const {nanoid} = require('nanoid')

const app = express();
const PORT = 9000;

app.use(bodyParser.json())

let receiveData = []


app.post('/books', (req, res) => {
  // Variable untuk meninitialisasi
  let finished = false
  const date = new Date().toISOString()
  const id = nanoid()

  // Variable body request
  const {

    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading


  } = req.body;

  // Mengecek apakah readPage sama dengan pageCount jika tidak hasil false
  if (readPage === pageCount) {
    finished = true
    
  } else {
    finished = false
  }

  // Mengecek apakah pada key name memiliki sebuah value jika tidak akan menghasilkan status code 400
  if (name) {

    // Mengecek jika readPage lebih besar dari pageCount maka akan menghasilkan status code 400
    if (readPage > pageCount) {
      res.status(400).json({
        "status": "fail",
    "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
      });
    }

    // inilisiasi data pada sebuah buku
    const data = {
    "id": id,
    "name": name,
    "year": year,
    "author": author,
    "summary": summary,
    "publisher": publisher,
    "pageCount": pageCount,
    "readPage": readPage,
    "finished": finished,
    "reading": reading,
    "insertedAt": date,
    "updatedAt" : date
      };

    receiveData.push(data)
    
    // Jika success maka akan mengirimkan sebuah status code 201
    res.status(201).json({
      "status": "success",
    "message": "Buku berhasil ditambahkan",
    "data": {
        "bookId": id
    }
    });
    
  } else {
    res.status(400).json({
      "status": "fail",
    "message": "Gagal menambahkan buku. Mohon isi nama buku"
    });
  }

  
});

app.get("/books", (req, res) => {

  const getBooks = {
    "status": "success",
    "data": {
        "books": receiveData
    }
  }
  
  res.status(200).json(getBooks)
  
})

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const getDataId = receiveData.find((data) => {
    return data.id === id
  })
  
  if (getDataId == undefined) {
    res.status(404).json({
    "status": "fail",
    "message": "Buku tidak ditemukan"
    }
)
  } else {
    const getBooks = {
      "status": "success",
    "data": {
        "book": getDataId
          }
    }
    res.status(201).json(getBooks)
  }
})

/* app.put("books/:id", (req, res) => {
  let finished = false
  const date = new Date().toISOString()
  const id = req.params.id;
  const getDataId = receiveData.find((data) => {
    return data.id === id
  })

  if (getDataId == undefined) {
    res.status(404).json({
      "status": "fail",
    "message": "Gagal memperbarui buku. Id tidak ditemukan"
    }) 
  } else {
  const {
    
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
    
  } = getDataId;

    
  if (name) {
    if (readPage > pageCount) {
      res.status(400).json({
        "status": "fail",
    "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
      })
    }
    
    res.status(200).json(getDataId)

    
  } else {
    res.status(400).json({
      "status": "fail",
    "message": "Gagal memperbarui buku. Mohon isi nama buku"

    })
  }
}
}) */

app.delete(("/books/:id"), (req, res) => {
  const getId = req.params.id;
  const getBooksId = receiveData.find((data) => {
    return data.id === getId
  })

  if (getBooksId == undefined) {
    res.status(404).json({
      "status": "fail",
    "message": "Buku gagal dihapus. Id tidak ditemukan"
    })
  } else {
    req.status(200).json({
      "status": "success",
    "message": "Buku berhasil dihapus"
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});