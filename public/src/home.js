function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  return books.filter((book) => !book.borrows[0].returned).length
}

// Helper function to turn collected data into ordered Top 5 list
function sortAndShortenByCount(result) {
  result.sort((objectA, objectB) => objectA.count < objectB.count ? 1 : -1)
  return result.length > 5 ? result.slice(0,5) : result
}

function getMostCommonGenres(books) {
  let result = []
  
  books.forEach((book) => {
    const {genre} = book
    // collects genres into the data, or increases count if already added
    if (result.some((value) => value.name === genre)) {
      result.forEach((value) => { if (value.name === genre) value.count++})
    } else {
      result.push({name: genre, count: 1})
    }
  })

  return sortAndShortenByCount(result)
}

function getMostPopularBooks(books) {
  let result = []

  books.forEach((book) => {
    const {title, borrows} = book
    result.push({name: title, count: borrows.length})
  })

  return sortAndShortenByCount(result)
}

function getMostPopularAuthors(books, authors) {
  let result = []

  books.forEach((book) => {
    const {authorId, borrows} = book
    const {name} = authors.find((author) => author.id === authorId)
    const authorName = `${name.first} ${name.last}`
    // adds authors to the dataset, or increases their borrow count if already added
    if (result.some((value) => value.name === authorName)) {
      result.forEach((author) => { if (author.name === authorName) author.count += borrows.length })
    } else {
      result.push({name: authorName, count: borrows.length})
    }
  })

  return sortAndShortenByCount(result)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
