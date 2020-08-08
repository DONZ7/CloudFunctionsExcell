const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./config.json");
const cors = require("cors")({ origin: true });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://excell-33b13.firebaseio.com",
});

const db = admin.firestore();

const discompose = (name) => {
  let response=[]
  let str=name.toLowerCase().normalize('NFD')
  .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2")
  .normalize();
  let arrayName = str.split(" ");
  let newStr=str
  for(let i in arrayName){
      newStr=newStr.replace(" ","")
  }
  arrayName.push(newStr)
  arrayName.shift()
  for(let i in arrayName){
      let h=1;
      for(let j in arrayName[i]){
          response.push(arrayName[i].substr(0,h))
          h=h+1;
      }
  }
  return response;
};

exports.setProductos = functions.https.onRequest((req, res) =>
  cors(req, res, async () => {
    try {
      const { products, country } = req.body;
      for(let i in products){
        let caseSearch = discompose(products[i].name);
        await db.collection("countries").doc(country).collection("products").add({
          ...products[i],
          caseSearch: caseSearch,
        });
      }
      res.status(200).json({
        success: true,
        message: "Datos introducidos exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error server",
      });
    }
  })
);
