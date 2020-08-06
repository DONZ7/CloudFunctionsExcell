const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const express=require('express');
const elim = express();
const bd=admin.firestore()

const cors = require("cors")({ origin: true });

// funcion visualizar

exports.getProductos =functions.https.onRequest((req, res) =>

cors(req, res, async () => {
  try {
  let productos= {data:[]};
  produtos.snapshot= await bd.collection('Productos')
 // orderBy('fechaCreado','desc')
  .get()
  produtos.snapshot.forEach((doc)=> {
      productos.data.push({    
        id: doc.id, 
        ...doc.data()
      }
      );
    });
  res.status(200).json({
   data: productos.data,
  success:true,
  messange:"datos exitoso"} )  
  } catch (error) {
    res.status(500).json({
      data: [],
     success:false,
     messange:"errr de servicio"} ) 
    
  }
})
);




exports.postProductos = functions.https.onRequest((req, res) =>
cors(req, res, async ( ) => {
  try {
const {informacion}=req.body
await bd.collection('Productos')
//.orderBy('nombre','desc')
.add(informacion)
res.status(200).json({
messange:"datos exitoso"} ) 
}
catch(error) {
   res.status(500).json({
     data: [],
    success:false,
    messange:"errr de servicio"} ) 
  }
})
);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
 exports.add = functions.https.onRequest((req,res)=> {
     res.send('hola mundo') ;
 });



 exports.postLugares = functions.https.onRequest((req, res) =>
cors(req, res, async ( ) => {
  try {
const {informacion}=req.body
await bd.collection('lugares')
//.orderBy('nombre','desc')
.add(informacion)
res.status(200).json({
messange:"datos exitoso"} ) 
}
catch(error) {
   res.status(500).json({
     data: [],
    success:false,
    messange:"errr de servicio"} ) 
  }
})
);