import app from "./app"
import { prisma } from "./lib/prisma";


const  PORT = process.env.PORT || 5000
const server =async () => {
  try {
    app.listen(PORT, () => {
      console.log(`This server is run on http://localhost:${PORT} `);
    })
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
    
  }
}
server()