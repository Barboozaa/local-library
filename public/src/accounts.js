function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => 
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  )
}

function getTotalNumberOfBorrows(account, books) {
  const {id} = account
  const borrowed = books.filter((book) => book.borrows.some( (loan) => loan.id === id) )
  return borrowed.length
}

function getBooksPossessedByAccount(account, books, authors) {
  const {id} = account
  let currentlyBorrowed = books.filter((book) => book.borrows.some((loan) => loan.id === id && !loan.returned))
  currentlyBorrowed.forEach((book) => {
    book[`author`] = authors.find((author) => author.id === book.authorId)
  })
  return currentlyBorrowed
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
