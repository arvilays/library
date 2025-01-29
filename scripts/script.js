const bookContainer = document.querySelector(".book-container");
const headerAddBook = document.querySelector(".header-add-book");

const addBookWindow = document.querySelector(".add-book-window");
const addBookTitle = document.querySelector(".add-book-title");
const addBookAuthor = document.querySelector(".add-book-author");
const addBookPages = document.querySelector(".add-book-pages");
const addBookCoverURL = document.querySelector(".add-book-cover-url");
const addBookRead = document.querySelector("#add-book-read");
const addBookButton = document.querySelector(".add-book-button");

const mainContainer = document.querySelector(".main");

const unreadColor = "invert(64%) sepia(0%) saturate(530%) hue-rotate(179deg) brightness(101%) contrast(89%)";
const readColor = "invert(66%) sepia(9%) saturate(6444%) hue-rotate(72deg) brightness(87%) contrast(62%)";

let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [
    {
        title: "Delicious in Dungeon, Vol. 1",
        author: "Ryoko Kui",
        cover_url: "https://m.media-amazon.com/images/I/91G0rVgg5uL._SL1500_.jpg",
        pages: 192,
        read: true,
        id: 1,
    },

    {
        title: "Witch Hat Atelier, Vol. 1",
        author: "Kamome Shirahama",
        cover_url: "https://m.media-amazon.com/images/I/A1ngtfAT8IL._SL1500_.jpg",
        pages: 211,
        read: false,
        id: 2,
    },

    {
        title: "Goodnight Punpun, Vol. 1",
        author: "Inio Asano",
        cover_url: "https://m.media-amazon.com/images/I/917IJDfk36L._SL1500_.jpg",
        pages: 448,
        read: true,
        id: 3,
    },

    {
        title: "Land of the Lustrous, Vol. 1",
        author: "Haruko Ichikawa",
        cover_url: "https://m.media-amazon.com/images/I/91EKWaQmLKL._SL1500_.jpg",
        pages: 192,
        read: false,
        id: 4,
    },

    {
        title: "Goodbye, Eri",
        author: "Tatsuki Fujimoto",
        cover_url: "https://m.media-amazon.com/images/I/71fgXFnzayL._SL1500_.jpg",
        pages: 208,
        read: false,
        id: 5,
    },

    {
        title: "One Piece, Vol. 1: Romance Dawn",
        author: "Eiichiro Oda",
        cover_url: "https://m.media-amazon.com/images/I/71y+XnBXm4L._SL1000_.jpg",
        pages: 216,
        read: true,
        id: 6,
    },

    {
        title: "Berserk, Vol. 1",
        author: "Kentaro Miura",
        cover_url: "https://m.media-amazon.com/images/I/71lnvXSiITL._SL1200_.jpg",
        pages: 224,
        read: false,
        id: 7,
    },

    {
        title: "Dragon Ball, Vol. 1",
        author: "Akira Toriyama",
        cover_url: "https://m.media-amazon.com/images/I/81qJxMgdrqL._SL1500_.jpg",
        pages: 192,
        read: false,
        id: 8,
    },
];

const main = () => {       
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
    let newBook = {};
    newBook.title = addBookTitle.value;
    addBookTitle.value = "";
    newBook.author = addBookAuthor.value;
    addBookAuthor.value = "";
    newBook.pages = addBookPages.value;
    addBookPages.value = "";
    newBook.cover_url = addBookCoverURL.value;
    addBookCoverURL.value = "";
    newBook.read = addBookRead.checked;
    addBookRead.checked = false;
    newBook.id = generateAvailableBookID();
    addBook(newBook);
    
});

/*** FUNCTIONS ***/
const generateAvailableBookID = () => {
    let uniqueID = 0;
    while (myLibrary.find(item => item.id == uniqueID)) {
        uniqueID++;
    }
    return uniqueID;
}

const addBook = book => {
    myLibrary.push(book);
    updateBooks();
}

const updateBooks = () => {
    bookContainer.textContent = "";
    for(book in myLibrary) {
        bookContainer.appendChild(createBook(myLibrary[book]));
    }
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
};

const createBook = book => {
    let bookNew = document.createElement("div");
    bookNew.className = "book";
    bookNew.id = book.id;
    
    // Book Cover
    let bookCover = document.createElement("img");
    bookCover.className = "book-cover";
    bookCover.src = book.cover_url.trim();
    bookCover.alt = book.name + " cover";

    // Book Information
    let bookInformation = document.createElement("div");
    bookInformation.className = "book-information";

    let bookTitle = document.createElement("div");
    bookTitle.className = "book-title";
    bookTitle.textContent = book.title.trim();

    let bookAuthor = document.createElement("div");
    bookAuthor.className = "book-author";
    bookAuthor.textContent = book.author.trim();

    let bookPages = document.createElement("div");
    bookPages.className = "book-pages";
    if (book.pages == 0) bookPages.textContent = "No Pages";
    else bookPages.textContent = book.pages + " Pages";

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
    bookNew.appendChild(bookReadIndicator);
    bookNew.appendChild(bookInformation);

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

        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    });

    bookDeleteImage.addEventListener("click", () => {
        myLibrary = myLibrary.filter(item => item.id != book.id);
        bookNew.remove();
        updateBooks();
    });

    return bookNew;
}

main();