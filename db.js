var sqlite3 = require('sqlite3').verbose()

// open database in memory
let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

let init = function() {
    // Create a table with a single notes row we'll keep updating
    db.serialize(function() {
        db.run(`
        CREATE TABLE IF NOT EXISTS notes (
            lock TEXT NOT NULL DEFAULT('X'),
            note TEXT NOT NULL DEFAULT(''),
            constraint PK_T1 PRIMARY Key (lock),
            constraint CK_T1_locked CHECK (lock='X')
        )`);
        db.run('INSERT INTO notes DEFAULT VALUES');
    });
}

let getNote = function() {
    return new Promise(function(resolve, reject) {
        db.all('SELECT note FROM notes', function(err, rows) {
            if(err) {
                console.error(err.message);
                reject(err);
            }
            else {
                let notes = '';
                for(let row of rows) {
                    notes += row.note + '\n';
                }
                console.log(notes);
                resolve(notes);
            }
        });
    });
}

let updateNote = function(noteText) {
    return new Promise(function(resolve, reject) {
        db.run('UPDATE notes SET note = (?)', noteText, function(err) {
            if(err) {
                console.error(err.message);
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

module.exports = {
    db: db,
    init: init,
    getNote: getNote,
    updateNote: updateNote
};