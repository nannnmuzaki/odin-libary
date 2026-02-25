const addBookBtn = document.querySelector("#addBookBtn");
const toggleReadBtn = document.querySelector("#toggleReadBtn");
const removeBookBtn = document.querySelector("#removeBookBtn");
const books = document.querySelector(".books");
const dialog = document.querySelector("#addBookDialog");
const addBookForm = document.querySelector("#addBookForm");
const formError = document.querySelector(".form-error");
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookPages = document.querySelector("#bookPages");

class Book {
    static #library = [];
    static #bookCount = 0;

    #id = crypto.randomUUID();
    #title;
    #author;
    #pages;
    #readStatus = false;

    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;

        Book.#library.push(this);
        Book.#bookCount++;
    }

    static get library() {
        return Book.#library;
    }

    static get bookCount() {
        return Book.#bookCount;
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    set title(newTitle) {
        if (typeof newTitle !== "string" || newTitle.trim().length <= 0) {
            throw new Error("Title must be a valid, non-empty string.");
        }

        this.#title = newTitle;
    }

    get author() {
        return this.#author;
    }

    set author(newAuthor) {
        if (typeof newAuthor !== "string" || newAuthor.trim().length <= 0) {
            throw new Error("Author name must be a valid, non-empty string!");
        }

        this.#author = newAuthor;
    }

    get pages() {
        return this.#pages;
    }

    set pages(newPages) {
        if (
            typeof newPages !== "number" ||
            Number.isNaN(newPages) ||
            newPages <= 0
        ) {
            throw new Error(
                "Pages count must be a valid, greater than zero number!",
            );
        }

        this.#pages = newPages;
    }

    get readStatus() {
        return this.#readStatus;
    }

    toggleReadStatus() {
        this.#readStatus = !this.#readStatus;
    }

    deleteBook() {
        const index = Book.#library.findIndex((book) => book.id === this.#id);
        if (index !== -1) {
            Book.#library.splice(index, 1);
        }

        Book.#bookCount--;
    }
}

addBookBtn.addEventListener("click", () => {
    formError.style.display = "none";
    dialog.showModal();
});

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    try {
        const book = new Book(
            bookTitle.value,
            bookAuthor.value,
            parseInt(bookPages.value),
        );
        createBookCard(book);
        addBookForm.reset();
        dialog.close();
    } catch (error) {
        formError.textContent = error.message;
        formError.style.display = "block";
    }
});

function createBookCard(book) {
    const newBookCard = document.createElement("div");
    newBookCard.className = "book-card";
    books.appendChild(newBookCard);

    const newTitle = document.createElement("h2");
    newTitle.className = "book-title";
    newTitle.textContent = `${book.title}`;
    newBookCard.appendChild(newTitle);

    const newAuthor = document.createElement("p");
    newAuthor.className = "book-author";
    newAuthor.textContent = `${book.author}`;
    newBookCard.appendChild(newAuthor);

    const newPages = document.createElement("p");
    newPages.className = "book-pages";
    newPages.textContent = `${book.pages} pages`;
    newBookCard.appendChild(newPages);

    const newBookActions = document.createElement("div");
    newBookActions.className = "book-actions";
    newBookCard.appendChild(newBookActions);

    const newToggleReadBtn = document.createElement("button");
    newToggleReadBtn.id = "toggleReadBtn";
    newToggleReadBtn.setAttribute(
        "status",
        book.readStatus ? "read" : "not-read",
    );
    newToggleReadBtn.addEventListener("click", () => {
        book.toggleReadStatus();
        newToggleReadBtn.textContent = book.readStatus ? "Read" : "Not Read";
        newToggleReadBtn.setAttribute(
            "status",
            book.readStatus ? "read" : "not-read",
        );
    });
    newBookActions.appendChild(newToggleReadBtn);

    const newToggleReadIcon = document.createElement("div");
    newToggleReadIcon.className = "read-icon";
    newToggleReadBtn.appendChild(newToggleReadIcon);

    const newReadIconSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
    );
    newReadIconSvg.setAttribute("viewBox", "0 0 24 24");
    newToggleReadIcon.appendChild(newReadIconSvg);

    const newReadIconSvgTitle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "title",
    );
    newReadIconSvgTitle.textContent = book.readStatus
        ? "Book: Read"
        : "Book: Not Read";
    newReadIconSvg.appendChild(newReadIconSvgTitle);

    const newReadIconSvgPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
    );
    newReadIconSvgPath.setAttribute(
        "d",
        book.readStatus
            ? "M16.75 22.16L14 19.16L15.16 18L16.75 19.59L20.34 16L21.5 17.41L16.75 22.16M18 2C19.1 2 20 2.9 20 4V13.34C19.37 13.12 18.7 13 18 13V4H13V12L10.5 9.75L8 12V4H6V20H12.08C12.2 20.72 12.45 21.39 12.8 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H18Z"
            : "M18,2A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H18M18,4H13V12L10.5,9.75L8,12V4H6V20H18V4Z",
    );
    newReadIconSvg.appendChild(newReadIconSvgPath);

    const newToggleReadText = document.createElement("span");
    newToggleReadText.textContent = book.readStatus ? "Read" : "Not Read";
    newToggleReadBtn.appendChild(newToggleReadText);

    const newRemoveBookBtn = document.createElement("button");
    newRemoveBookBtn.id = "removeBookBtn";
    newRemoveBookBtn.addEventListener("click", () => {
        book.deleteBook();
        books.removeChild(newBookCard);
    });
    newBookActions.appendChild(newRemoveBookBtn);

    const newRemoveBookIcon = document.createElement("div");
    newRemoveBookIcon.className = "remove-icon";
    newRemoveBookBtn.appendChild(newRemoveBookIcon);

    const newRemoveIconSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
    );
    newRemoveIconSvg.setAttribute("viewBox", "0 0 24 24");
    newRemoveBookIcon.appendChild(newRemoveIconSvg);

    const newRemoveIconSvgTitle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "title",
    );
    newRemoveIconSvgTitle.textContent = book.readStatus
        ? "Book: Read"
        : "Book: Not Read";
    newRemoveIconSvg.appendChild(newRemoveIconSvgTitle);

    const newRemoveIconSvgPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
    );
    newRemoveIconSvgPath.setAttribute(
        "d",
        book.readStatus
            ? "M16.75 22.16L14 19.16L15.16 18L16.75 19.59L20.34 16L21.5 17.41L16.75 22.16M18 2C19.1 2 20 2.9 20 4V13.34C19.37 13.12 18.7 13 18 13V4H13V12L10.5 9.75L8 12V4H6V20H12.08C12.2 20.72 12.45 21.39 12.8 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H18Z"
            : "M18,2A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H18M18,4H13V12L10.5,9.75L8,12V4H6V20H18V4Z",
    );
    newRemoveIconSvg.appendChild(newRemoveIconSvgPath);

    const newRemoveBookText = document.createElement("span");
    newRemoveBookText.textContent = "Remove";
    newRemoveBookBtn.appendChild(newRemoveBookText);
}

addEventListener("DOMContentLoaded", () => {
    for (const book of Book.library) {
        createBookCard(book);
    }
});
