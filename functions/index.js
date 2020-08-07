const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./excell-33b13-firebase-adminsdk-9atg4-0eb46d0544.json");
const cors = require("cors")({ origin: true });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://excell-33b13.firebaseio.com",
});

const db = admin.firestore();

exports.setProductos = functions.https.onRequest((req, res) =>
  cors(req, res, async () => {
    try {
      const { token, data } = req.body;
      const { uid } = await admin.auth().verifyIdToken(token);
      if(!uid){
        res.status(400).json({
          success: false,
          messange: "Error auth",
        });
      }
      for(let i in data){
        await db.collection("Productos").add(data[i]);
      }
      res.status(200).json({
        success: true,
        messange: "datos introducidos exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        messange: "Error server",
      });
    }
  })
);
