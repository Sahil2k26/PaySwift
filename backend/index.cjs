const express=require("express")
const app=express();
const bodyParser=require("body-parser");
const UserRoutes=require("./routes/user.cjs")
const AccountRoutes=require("./routes/account.cjs")

const cors=require("cors")


app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1/user",UserRoutes);
app.use("/api/v1/account",AccountRoutes);

app.listen(3000);


