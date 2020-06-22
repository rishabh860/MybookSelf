class Books {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class Main {
	static displaybooks() {
		const books = Store.getbooks();
		books.forEach((books) => Main.addbooklist(books));
	}

	static addbooklist(books) {
		const list = document.querySelector("#book-list");
		const row = document.createElement("tr");

		row.innerHTML = `
                    <td>${books.title}</td>
                    <td>${books.author}</td>
                    <td>${books.isbn}</td>
                    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

		list.appendChild(row);
	}

	static showAlert(message, classname) {
		const div = document.createElement("div");
		div.className = `alert alert-${classname}`;
		div.appendChild(document.createTextNode(message));

		const container = document.querySelector(".container");
		const form = document.querySelector("#book-form");

		container.insertBefore(div, form);

		setTimeout(() => document.querySelector(".alert").remove(), 3000);
	}

	static clearlist() {
		document.querySelector("#title").value = "";
		document.querySelector("#author").value = "";
		document.querySelector("#isbn").value = "";
	}

	static removeelement(e) {
		if (e.classList.contains("delete")) {
			e.parentElement.parentElement.remove();
		}
	}
}

// store
class Store {
	static getbooks() {
		let books = localStorage.getItem("books");
		if (books === null) {
			books = [];
		} else {
			books = JSON.parse(books);
		}

		return books;
	}

	static addbooks(book) {
		let addbooks = Store.getbooks();
		addbooks.push(book);
		localStorage.setItem("addbooks", JSON.stringify(addbooks));
	}

	static removebooks(isbn) {
		const books = Store.getbooks();
		books.forEach((books, index) => {
			if (books.isbn === isbn) {
				books.splice(index, 1);
			}
		});
	}
}

// event for display books

document.addEventListener("DOMContentLoaded", Main.displaybooks);

// event for add books

document.querySelector("#book-form").addEventListener("submit", (e) => {
	e.preventDefault();

	const title = document.querySelector("#title").value;
	const author = document.querySelector("#author").value;
	const isbn = document.querySelector("#isbn").value;

	if (title.length < 2 || author.length < 2 || isbn.length < 1) {
		Main.showAlert("Please Fill it properly", "danger");
	} else {
		const book = new Books(title, author, isbn);
		Main.addbooklist(book);
		Main.showAlert("Book added suessfully..", "success");
		Main.clearlist();
		Store.addbooks(book);
	}
});

// remove event

document.querySelector("#book-list").addEventListener("click", (e) => {
	Main.removeelement(e.target);

	Store.removebooks(e.target.parentElement.previousElementSibling.textContent);
});
