// 1. How to create password mysql before connected js file to database.
//      code here :- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Pradeep@1234';

// 2. How to install packege .
//      code here :-  npm init -y   ( install packege.json )
//                    npm i mysql   (install packege-lock.json and mysql)
//                    (npm i -D nodemon or npm i nodemon --save-dev) // nodemon save autometecly devDependencies key in (pachege.json) file.

// 3. Go to the pachege.json file and type ( "start":"nodemon" )in scripts key
//      "scripts": {
//          "test": "echo \"Error: no test specified\" && exit 1",
//          "start":"nodemon"   // run js file with npm start
//        }

// 4. how to run js file.
//      a)  npm start
//      b)  node (js file name)
// // -------------------------------------------------

const mysql = require('mysql');
const input = require('readline-sync');

const dbConn = mysql.createConnection({     // create connection js file with database on terminal  
    host: "localhost",
    user: "root",               // path 
    database: "pradeep4",       // database name
    password: 'Pradeep@1234'    // mysql password 
})

function conn() {       //  check connected or not 
    dbConn.connect(err => {
        err ? console.log('Connection Failed!!', err) : console.log('Connected..');
    })
}

const start = () => {
    console.log('1. Signup \n2. Login \n3. update\n4. delete\n5. Show all data\n6 Exit');
    const opt = input.questionInt('Enter your option.: ')
    if (opt === 1) {
        conn()      //  check connected or not 
        const opt00 = input.questionInt('Enter the ID: ')
        const Signup = dbConn.query(`select * from user where id=${opt00}`, (err, data) => {
            if (err) throw err;
            if (data.length > 0) {
                console.log(`user already exist.`);
                start()
            }
            else {
                conn()      //  check connected or not 
                const opt11 = input.question('Enter your Name: ')
                const opt22 = input.question('Enter your city :')
                const opt33 = input.question('Enter your state :')
                const opt44 = input.question('Enter your pic_code :')
                dbConn.query(`insert into user(id,name,city,state,pin_code)values("${opt00}","${opt11}","${opt22}","${opt33}","${opt44}")`, (err, data) => {
                    if (err) throw err;
                    console.log(data);
                    console.log('signUp data successfully.');
                    start()
                })
            }
        })
    }

    else if (opt === 2) {
        const opt00 = input.questionInt('Enter the ID: ')
        dbConn.query(`select * from user where id=${opt00}`, (err, data) => {
            if (err) throw err;
            if (data.length > 0) {
                console.log(`login successfully. ${data}`);
                start()
            }
            else {
                console.log('Not exist id. please type correct id.');
                start()
            }
        })
    }
    else if (opt === 3) {
        const udata = input.question('which column do you want to update enter name: ')
        const ndata = input.question('Enter your new name data: ')
        const odata = input.question('Enter your old data: ')
        dbConn.query(`update user set ${udata}="${ndata}" where ${udata}="${odata}"`, (err, data) => {
            if (err){
                console.log(err);
            }
            else{
                console.log(data);
                console.log('updated data successfully.');
                start()
            }
        })
    }
    else if (opt === 4) {
        const delete_id = input.questionInt('Enter the ID: ')
        dbConn.query(`delete from user where id='${delete_id}'`, (err, data) => {
            if (err) throw err;
            console.log(data);
            console.log('deleted data successfully.');
        })
        start()
    }
    else if (opt === 5) {
        conn()      //  check connected or not 
        dbConn.query('select * from user', (err, result) => {
            if (err){
                console.log(err);
            }
            else{
                console.log(result);
            }
            start()
        })
    }
    else if(opt===6){
        console.log('you have reached out of the page');
        return
    }
}
start()

// ************************************************************************** //

// const mysql = require('mysql');
// const input = require('readline-sync');

// const dbConn = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "pradeep4",   // databsase name 
//     password: 'Pradeep@1234'    // mysql password 
// })

// const start = () => {
//     console.log('1. Signup \n2. Login \n3. update\n4. delete\n5. Show all data\n6 Exit');
//     const opt = input.questionInt('Enter your option.: ')
//     if (opt === 1) {
//         const opt00 = input.questionInt('Enter the ID: ')
//         dbConn.query(`select * from user where id=${opt00}`, (err, data) => {
//             if (err) throw err;
//             if (data.length > 0) {
//                 console.log(`user already exist.`);
//                 start()
//             }
//             else {
//                 const opt11 = input.question('Enter your Name: ')
//                 const opt22 = input.question('Enter your city :')
//                 const opt33 = input.question('Enter your state :')
//                 const opt44 = input.question('Enter your pic_code :')
//                 dbConn.query(`insert into user(id,name,city,state,pin_code)values("${opt00}","${opt11}","${opt22}","${opt33}","${opt44}")`, (err, data) => {
//                     if (err) throw err;
//                     console.log(data);
//                     console.log('signUp successfully.');
//                     start()
//                 })
//             }
//         })
//     }

//     else if (opt === 2) {
//         const opt00 = input.questionInt('Enter the ID: ')
//         dbConn.query(`select * from user where id=${opt00}`, (err, data) => {
//             if (err) throw err;
//             if (data.length > 0) {
//                 console.log(`login successfully.`);
//                 start()
//             }
//             else {
//                 console.log('Not exist id. please type correct id.');
//                 start()
//             }
//         })
//     }
//     else if (opt === 3) {
//         dbConn.query('select * from user', (err, result) => {
//            if (err) throw err;
//             console.log(result);
//             const udata = input.question('which you column update.please enter name: ')
//             const ndata = input.question('Enter your new insert data: ')
//             const which_id = input.question('Enter your id: ')
//             dbConn.query(`update user set ${udata}="${ndata}" where id="${which_id}"`, (err, data) => {
//                 if (err){
//                     console.log(err);
//                 }
//                 else{
//                     console.log(data);
//                     console.log('update data successfully.');
//                     start()
//                 }
//             })
//         })
//     }
//     else if (opt === 4) {
//         dbConn.query('select * from user', (err, result) => {
//             if (err){
//                 console.log(err);
//             }
//             else{
//                 console.log(result);
//                 const delete_id = input.questionInt('Enter the ID. whcth you want to delete: ')
//                 dbConn.query(`delete from user where id='${delete_id}'`, (err, data) => {
//                     if (err) throw err;
//                     console.log(data);
//                     console.log('Delete data successfully.');
//                     start()
//                 })
//             }
//         })
//     }
//     else if (opt === 5) {
//         dbConn.query('select * from user', (err, result) => {
//             if (err){
//                 console.log(err);
//             }
//             else{
//                 console.log(result);
//             }
//             start()
//         })
//     }
//     else if(opt===6){
//         console.log('you have out of the page');
 
//     }
// }
// start()
