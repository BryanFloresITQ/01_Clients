const { response } = require('express');
const { MongoConnection } = require('../lib/Mongo');
var ObjectId = require("mongodb").ObjectID;

const COLLECTIONP = "permisos";

const findPermisos = (id) => new Promise(async(resolve, reject) => {
    try {
        //Inicializo MongoClient para que me retorne la Base de Datos
        const DB = await MongoConnection();
        //Obtenemos la collection
        const permisos = DB.collection(COLLECTIONP);

        const permisosList = await permisos.find({}).toArray();

        if(id != undefined){
            var filterResult = permisosList.filter((permiso) => permiso._id == id);
            resolve(filterResult);
        }

        resolve(permisosList);
    } catch (error) {
        reject(error);
    }
});

const createPermiso = (nombre) => new Promise(async(resolve,reject)=>{
    try {
        const DB  = await MongoConnection()
        const permissions = await DB.collection(COLLECTIONP)
        const result = await permissions.insertOne({nombre : nombre})
        resolve(result)
    } catch (error) {
        reject(error)
    }
})

const updatePermiso = (id,nombre) => new Promise(async(resolve,reject)=>{
    try {
        const DB  = await MongoConnection()
        const permissions = await DB.collection(COLLECTIONP)
        const result = await permissions.updateOne(
            { "_id": ObjectId(id) },
            { $set: { nombre: nombre} }
        )
        resolve(result)
    } catch (error) {
        reject(error)
    }
})

const deletePermiso = (id) => new Promise(async(resolve,reject)=>{
    try {
        const DB  = await MongoConnection()
        const permissions = await DB.collection(COLLECTIONP)
        const result = await permissions.deleteOne(
            {"_id" : ObjectId(id)}
        )
        resolve(result)
    } catch (error) {
        reject(error)
    }
})

module.exports = {
    findPermisos,
    createPermiso,
    updatePermiso,
    deletePermiso
}