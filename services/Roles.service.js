const { response } = require('express');
const { MongoConnection } = require('../lib/Mongo');
var ObjectId = require("mongodb").ObjectID;

const COLLECTION2 = "roles";

const findRoles = (id) => new Promise(async(resolve, reject) => {
    try {
        //Inicializo MongoClient para que me retorne la Base de Datos
        const DB = await MongoConnection();
        //Obtenemos la collection
        const roles = DB.collection(COLLECTION2);

        const rolesList = await roles.find({}).toArray();

        if(id != undefined){
            var filterResult = rolesList.filter((rol) => rol._id == id);
            resolve(filterResult);
        }

        resolve(rolesList);
    } catch (error) {
        reject(error);
    }
});

const createRol = (nombre, permisos) => new Promise(async(resolve, reject) => {
    try {
        
        const DB = await MongoConnection();
        const rol = DB.collection(COLLECTION2);

        if(permisos != undefined){
            var arreglo = permisos.split(',');
            const result = await rol.insertOne({
                nombre: nombre,
                permisos: arreglo
            });
            resolve(result);
        }else{
            const result = await rol.insertOne({
                nombre: nombre,
                permisos: []
            });
    
            resolve(result);
        }

    } catch (error) {
        reject(error);
    }
});

const updateRol = (id, nombre, permisos) => new Promise(async(resolve, reject) => {
    try {
        const DB = await MongoConnection();
        const rol = DB.collection(COLLECTION2);

        if(permisos != undefined){
            var arreglo = permisos.split(',');

            const result = await rol.updateOne(
                {"_id": ObjectId(id)},
                {
                    $set: {nombre: nombre, permisos: arreglo}
                }
            )
            resolve(result);
        }
        else{
            const result = await rol.updateOne(
                {"_id": ObjectId(id)},
                {
                    $set: {nombre: nombre}
                }
            )
            resolve(result);
        }

         
        
    } catch (error) {
        reject(error)
    }
});

const deleteRol = (id) => new Promise(async(resolve, reject) => {
    try {
        const DB = await MongoConnection();
        const rol = DB.collection(COLLECTION2);
        const result = await rol.deleteOne(
            {"_id": ObjectId(id)},
        )
        resolve(result);
    } catch (error) {
        reject(error)
    }
});

module.exports = {
    findRoles,
    createRol,
    updateRol,
    deleteRol,
}