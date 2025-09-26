package main
import (
	"github.com/jarntae/Financial-project/config"
	"github.com/joho/godotenv"
	"log"
	"github.com/gin-gonic/gin"

)
const PORT = "8000"
func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Println("No .env file found or failed to load")
	}
	// open connection database
	config.ConnectionDB()

	// Generate databases
	config.SetupDatabase()

	r := gin.Default()

	
	r.Run("0.0.0.0:" + PORT)
}
