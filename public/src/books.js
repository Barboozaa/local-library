function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = []
  const returned = []
  books.forEach((book) => { book.borrows[0].returned ? returned.push(book) : borrowed.push(book) })
  return [borrowed, returned]
}

function getBorrowersForBook(book, accounts) {
  const {borrows} = book
  let borrowers = accounts.filter((account) => borrows.map((lend) => lend.id).includes(account.id))
  borrowers.forEach((borrower) => {
    borrower[`returned`] = borrows.find((member) => member.id === borrower.id).returned
  })
  return borrowers.length > 10 ? borrowers.slice(0, 10) : borrowers
} 

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
