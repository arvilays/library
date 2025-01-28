const bookContainer = document.querySelector(".book-container");
const headerAddBook = document.querySelector(".header-add-book");
const addBookWindow = document.querySelector(".add-book-window");
const addBookButton = document.querySelector(".add-book-button");
const mainContainer = document.querySelector(".main");

const unreadColor = "invert(64%) sepia(0%) saturate(530%) hue-rotate(179deg) brightness(101%) contrast(89%)";
const readColor = "invert(66%) sepia(9%) saturate(6444%) hue-rotate(72deg) brightness(87%) contrast(62%)";

// let myLibrary = [];

let myLibrary = [
    { title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        cover_url: "https://m.media-amazon.com/images/I/61dRoDRubtL._SL1500_.jpg",
        pages: 180,
        read: true,
        id: 0,
    },

    { title: "1984",
        author: "George Orwell",
        cover_url: "https://m.media-amazon.com/images/I/91VsLImyJgL._SL1500_.jpg",
        pages: 368,
        read: false,
        id: 1,
    },

    { title: "Lord of the Flies",
        author: "William Golding",
        cover_url: "https://m.media-amazon.com/images/I/716MU3GOvJL._SL1200_.jpg",
        pages: 182,
        read: false,
        id: 2,
    },

    { title: "Fahrenheit 451",
        author: "Ray Bradbury",
        cover_url: "https://m.media-amazon.com/images/I/61l8LHt4MeL._SL1500_.jpg",
        pages: 194,
        read: true,
        id: 3,
    },
];

const main = () => {    
    // myLibrary = localStorage["myLibrary"];
    updateBooks();
};

/*** EVENT LISTENERS ***/
headerAddBook.addEventListener("click", () => {
    console.log(addBookWindow.style.visibility);
    if (addBookWindow.style.visibility == "visible") { 
        addBookWindow.style.visibility = "hidden";
        addBookWindow.style.opacity = "0%";
        mainContainer.style.filter = "revert";
    } else {
        addBookWindow.style.visibility = "visible";
        addBookWindow.style.opacity = "100%";
        mainContainer.style.filter = "grayscale(100) blur(3px)";
    }
})

mainContainer.addEventListener("click", () => {
    addBookWindow.style.visibility = "hidden";
    addBookWindow.style.opacity = "0%";
    mainContainer.style.filter = "revert";
});

addBookButton.addEventListener("click", () => {
    
});

/*** FUNCTIONS ***/
const addBook = () => {
    alert("wow!");
}

const updateBooks = () => {
    for(book in myLibrary) {
        bookContainer.appendChild(createBook(myLibrary[book]));
    }
    // localStorage["myLibrary"] = myLibrary;
};

const createBook = book => {
    let bookNew = document.createElement("div");
    bookNew.className = "book";
    bookNew.id = book.id;
    
    // Book Cover
    let bookCover = document.createElement("img");
    bookCover.className = "book-cover";
    bookCover.src = book.cover_url;
    bookCover.alt = book.name + " cover";

    // Book Information
    let bookInformation = document.createElement("div");
    bookInformation.className = "book-information";

    let bookTitle = document.createElement("div");
    bookTitle.className = "book-title";
    bookTitle.textContent = book.title;

    let bookAuthor = document.createElement("div");
    bookAuthor.className = "book-author";
    bookAuthor.textContent = book.author;

    let bookPages = document.createElement("div");
    bookPages.className = "book-pages";
    bookPages.textContent = book.pages + " Pages";

    let bookRead = document.createElement("div");
    bookRead.className = "book-read";
    let bookReadImage = document.createElement("img");
    bookReadImage.src = "./images/book-check.svg";
    bookReadImage.alt = "book read";
    if (book.read) bookReadImage.style.filter = readColor;
    else bookReadImage.style.filter = unreadColor;
    bookRead.appendChild(bookReadImage);

    let bookDelete = document.createElement("div");
    bookDelete.className = "book-delete";
    let bookDeleteImage = document.createElement("img");
    bookDeleteImage.src = "./images/close-circle.svg";
    bookDeleteImage.alt = "delete book";
    bookDelete.appendChild(bookDeleteImage);

    bookInformation.appendChild(bookTitle);
    bookInformation.appendChild(bookAuthor);
    bookInformation.appendChild(bookPages);
    bookInformation.appendChild(bookRead);
    bookInformation.appendChild(bookDelete);

    // Book Read Indicator
    let bookReadIndicator = document.createElement("img");
    bookReadIndicator.className = "book-read-indicator";
    bookReadIndicator.src = "./images/book-check.svg";
    bookReadIndicator.alt = "book read indicator";
    if (book.read) bookReadIndicator.style.opacity = "90%";
    else bookReadIndicator.style.opacity = "0%";
    
    bookNew.appendChild(bookCover);
    bookNew.appendChild(bookInformation);
    bookNew.appendChild(bookReadIndicator);

    bookInformation.addEventListener("mouseover", () => {
        bookInformation.style.opacity = "100%";
    });

    bookInformation.addEventListener("mouseleave", () => {
        bookInformation.style.opacity = "0%";
    });

    bookReadImage.addEventListener("click", () => {
        let currentBook = myLibrary.filter(item => item.id == book.id)[0];
        currentBook.read = !currentBook.read;

        if (currentBook.read) {
            bookReadImage.style.filter = readColor;
            bookReadIndicator.style.opacity = "90%";
        } else {
            bookReadImage.style.filter = unreadColor;
            bookReadIndicator.style.opacity = "0%";
        }
    });

    bookDeleteImage.addEventListener("click", () => {
        myLibrary = myLibrary.filter(item => item.id != book.id);
        bookNew.remove();
    });

    return bookNew;
}

main();
/*
EXAMPLE:
const myLibrary = [];

function Book() {

}

function addBookToLibrary() {

}
*/

/*
TODO:
    - Add New Book option on page, HTML form and data from user
    - Add Remove Book option on each book, remove book from library

    - Book Information
        - Title
        - Author
        - Pages
        - Read Status

    - Data Storage is Optional

<div class="book">
    <img class="book-cover" src="https://m.media-amazon.com/images/I/61dRoDRubtL._SL1500_.jpg" alt="book cover">
    <div class="book-information">
        <div class="book-title">The Great Gatsby</div>
        <div class="book-author">F. Scott Fitzgerald</div>
        <div class="book-pages">180 Pages</div>
        <div class="book-read"><img src="./images/book-check.svg" alt="book read"></div>
        <div class="book-delete"><img src="./images/close-circle.svg" alt="delete book"></div>
    </div>
    <img class="book-read-indicator" src="./images/book-check.svg" alt="book read indicator">
</div>
*/