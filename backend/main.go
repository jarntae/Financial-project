package main
import (
	"github.com/jarntae/Financial-project/config"
	"github.com/jarntae/Financial-project/routes"
	"github.com/jarntae/Financial-project/services"
	"github.com/joho/godotenv"
	"log"
	"github.com/gin-gonic/gin"

)
const PORT = "8080"
func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Println("No .env file found or failed to load")
	}
	// open connection database
	config.ConnectionDB()

	// Generate databases
	config.SetupDatabase()
	db := config.DB()

	jwtWrapper := &services.JwtWrapper{
		SecretKey:       "super-secret-key",
		Issuer:          "FinancialApp",
		ExpirationHours: 1,
	}

	r := gin.Default()
	// Setup routes
	routes.SetupAuthRoutes(r, db, jwtWrapper)
	routes.SetupAPIRoutes(r, db, jwtWrapper)

	
	r.Run("0.0.0.0:" + PORT)
}
