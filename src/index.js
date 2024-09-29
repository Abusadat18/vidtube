import { config } from "dotenv";
import { app } from "./app.js";

config()

const PORT = process.env.PORT || 8001
app.listen(PORT, () => {
    console.log("Server running at PORT " + PORT);
    
})
