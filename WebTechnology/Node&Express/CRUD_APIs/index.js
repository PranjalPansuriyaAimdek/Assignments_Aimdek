
const express = require('express');
const res = require('express/lib/response');

const fs = require('fs');

const app = express();
app.use(express.json());

let arrUser = [];

//#region read file and fill arrUser
fs.readFile('./Data/userData.json','utf8',function(err,data){
    if(err){
        console.log(err);
    }
    else{
        arrUser = JSON.parse(data);
    }
});
//#endregion read file and fill arrUser

//#region Home Page 'localhost:5010'
app.get('',(req,res)=>{
    res.send('Hey welcome to my Node Project.');
});
//#endregion Home Page 'localhost:5010'

//#region get All user
app.get('/api/users',(req,res)=>{
    res.send(arrUser);
});
//#endregion get All user

//#region Add User
app.post('/api/users',(req,res)=>{
    const user = req.body;
    let idNew = arrUser[arrUser.length-1].id + 1;
    const userWithID = {id:idNew,...user};
    arrUser.push(userWithID);
    
    fs.writeFile('./Data/userData.json',JSON.stringify(arrUser),(err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(`${req.body.name} is inserted successfully.`);
        }
    });
});
//#endregion Add User

//#region delete user by ID
app.delete('/api/users/:id',(req,res)=>{
    let id = req.params.id;
    let user = arrUser.find(user => (user.id == id));
    if(user)
    {
        arrUser.splice(arrUser.indexOf(user),1);

        fs.writeFile('./Data/userData.json',JSON.stringify(arrUser),(err)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(`User deleted`);
            }
        });


    }
    else{
        res.send(`User not found`);
    }
    
    
});
//#endregion delete user by ID

//#region get user by id
app.get('/api/users/:id',(req,res)=>{
    let id = req.params.id;
    let user  = arrUser.find(user=>(user.id==id));
    if(user){
        res.send(user);
    }
    else{
        res.send(`User not found`);
    }
    
})
//#endregion get user by id

//#region update user by ID
app.put('/api/users/:id',(req,res)=>{

    //get all values from req
    let id = req.params.id;
    let name = req.body.name;
    let password = req.body.password;
    let gender = req.body.gender;
    let birthdate = req.body.birthdate;
    let age = req.body.age;
    let country = req.body.country;
    let phone = req.body.phone;

    //find user by ID
    const user = arrUser.find(user => (user.id == id));
    if(user){
        
        //update the user in arrUser
        let index = arrUser.indexOf(user);

        //validation of values
        if(name != null){ arrUser[index].name = name; }

        if(password != null){ arrUser[index].password = password; }

        if(gender != null){ arrUser[index].gender = gender; }

        if(birthdate != null){ arrUser[index].birthdate = birthdate; }

        if(age != null){ arrUser[index].age = age; }

        if(country != null){ arrUser[index].country = country; }

        if(phone != null){ arrUser[index].phone = phone; }
        
        
        //update file
        fs.writeFile('./Data/userData.json',JSON.stringify(arrUser),(err)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(`User Updated at ID ${id}`);
            }
        });
    }
    else{
        res.send(`User not found.`);
    }
    
})

//#endregion update user by ID

app.listen(5010,()=>{
    console.log(`App is running on 5010`);
});