import { addUser, getUsers, updateUser, deleteUser } from "../supabaseCRUD";      

const user= {name:"manoj",age:22}
addUser(user).then(data=>console.log("User added:",data));

getUsers().then(data=>console.log("All users:",data));
              