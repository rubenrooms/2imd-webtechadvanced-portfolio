class Note {
    constructor(title) {
      this.title = title;
      this.element = this.createElement(title);
    }
  
    createElement(title) {
      let newNote = document.createElement("li");
      newNote.addEventListener('click', this.remove.bind(newNote));
      newNote.innerHTML = title;
      return newNote;
    }
  
    add(note) {
        let TodoList = document.querySelector("#taskList");
        TodoList.appendChild(note);
      // HINT🤩
      // this function should append the note to the screen somehow
    }
  
    saveToStorage(note) {
        let localStore = window.localStorage;
        let notes = [];
        if(localStore.notes === undefined){
            notes.push(note);
            localStore.setItem("notes", JSON.stringify(notes));
        }else{
            notes = JSON.parse(localStore.getItem("notes"));
            notes.push(note);
            localStore.setItem("notes", JSON.stringify(notes));
        }
      // HINT🤩
      // localStorage only supports strings, not arrays
      // if you want to store arrays, look at JSON.parse and JSON.stringify
    }
  
    remove() {
        let TodoList = document.querySelector("#taskList");
        TodoList.removeChild(this);
        
        let localStore = window.localStorage;
        let noteStore = JSON.parse(localStore.getItem("notes"));

        //let title = this.querySelector("p").innerHTML;
        let arrayIndex = noteStore.indexOf(this.innerHTML);
        noteStore.splice(arrayIndex, 1);
        localStore.setItem("notes", JSON.stringify(noteStore));
      // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
      // in this function, 'this' will refer to the current note element
      // .removeChild(this)
      // remove the item from screen and from localstorage
    }
  }
  
  class App {
    constructor() {
      console.log("👊🏼 The Constructor!");
      this.txtTodo = document.querySelector("#taskInput");
      this.txtTodo.addEventListener("keypress", this.createNote.bind(this));
      this.loadNotesFromStorage();
  
      // HINT🤩
      // pressing the enter key in the text field triggers the createNote function
      // this.txtTodo = ???
      // this.txtTodo.addEventListener("keypress", this.createNote.bind(this));
      // read up on .bind() -> we need to pass the current meaning of this to the eventListener
      // when the app loads, we can show previously saved noted from localstorage
      // this.loadNotesFromStorage();
    }
  
    loadNotesFromStorage() {
        let localStore = window.localStorage;
        let noteStore = JSON.parse(localStore.getItem("notes"));
        if (noteStore != null){
            noteStore.forEach( (note)=> {
                let storeNote = new Note(note);
                storeNote.add(storeNote.element);
            });
        }
      // HINT🤩
      // load all notes from storage here and add them to the screen
    }
  
    createNote(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        let input = this.txtTodo.value;
        console.log(input);
        let note = new Note(input);
        note.add(note.element);
        this.reset();
        note.saveToStorage(note.title);
      }
      // this function should create a new note by using the Note() class
      // HINT🤩
      // note.saveToStorage();
      // clear the text field with .reset in this class
    }
  
    reset() {
      // this function should reset the form / clear the text field
      this.txtTodo.value = "";
    }
  }
  
  let app = new App();
  