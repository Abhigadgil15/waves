const AccessControl = require('accesscontrol');

const AllRights = {
    'create:any':['*'],
    'read:any':['*'],
    'update:any':['*'],
    'delete:any':['*'],
}

let grantsObject = {
    admin:{
        profile:AllRights,
        brand:AllRights,
        product:AllRights,
        site:AllRights

    },
    user:{
        profile:{
            'read:own':['*','!password','!_id'],//add the information that you dont want to show user
            'update:own':['*']
        },
        brand:{
            'read:any':['*']
        },
        product:{
            'read:any':['*']
        }
    }
}

const roles = new AccessControl(grantsObject);

// console.log("Roles object:", roles);

module.exports = {roles};

// Define a user's role
// const userRole = 'user';

// // Define an action and resource
// const action = 'read';

// const resource = 'dog';

// // // Check if the user with the specified role can perform the specified action on the specified resource
// const permission = roles.can(userRole)[action](resource);

// // // Output the result
// console.log(permission.granted); // Should output true or false