// Setting function types and their uses; then exporting those functions to be used in the app.js file
const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

// Adding notes function

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    
    //debugging tips - 
    // Andrew tips -> use console.log, node debugger in .js like debugger
    // debugger won't stop unless with a special operation like node inspect in terminal
    // node --inspect-brk (file.js + user input)
    // <debug> restart -> will restart the program again
     
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

// Removing notes function

const removeNote = (title) =>  {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title) 

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }    
}

// Listing notes function

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse("Your notes"))
    
    notes.forEach((note) => {
        console.log(note.title)
    })
}

// Reading notes function
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse("Note not found!"))
    }
}

// Next debugging tips:
// Look at the error message and examine function error that it's giving
// Look at line number and then debug it


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}