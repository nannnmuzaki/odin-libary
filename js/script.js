function Book(title, author, pages) {
    if (!new.target) {
        throw new Error("Book constructor must be called with 'new'");
    }

    id: crypto.randomUUID();
    title: this.title;
    author: this.author;
    pages: this.pages;
    readStatus: false;
}

Book.prototype.toggleReadStatus = function () {
    this.readStatus = !this.readStatus;
};

const library = [];

function addBookToLibrary(book) {
    if (!(book instanceof Book)) {
        throw new Error("Only instances of Book can be added to the library");
    }

    library.push(book);
}

function removeBookFromLibrary(bookId) {
    const index = library.findIndex(book => book.id === bookId);
    if (index !== -1) {
        library.splice(index, 1);
    }
}