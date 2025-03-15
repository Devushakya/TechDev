const express = require("express");
const app = express();

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//cors frontend se connect karne me help karta hia
const { cloudConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// /
const path = require("path");

const dirname = path.resolve() 
const test = path.join(dirname,"TechED","build");
console.log(test);

// /



dotenv.config();
const PORT = process.env.PORT || 4000;

database.dbConnect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));

app.use(express.static(path.join(dirname,"TechED/build")))

cloudConnect();

//routes
const courseRoute = require("./routes/courseroute");
const paymentRoute = require("./routes/paymentroute");
const profileRoute = require("./routes/profileroute");
const userRoute = require("./routes/userroute");

app.use("/api/v1", courseRoute);
app.use("/api/v1", paymentRoute);
app.use("/api/v1", profileRoute);
app.use("/api/v1", userRoute);

//default
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

app.get("*",(req,res)=>{
  res.sendFile(path.join(dirname,"TechED","build","index.html"))
})

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`); 
});
 