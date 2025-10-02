package main
import (
	"github.com/jarntae/Financial-project/config"
	"github.com/jarntae/Financial-project/routes"
	"github.com/jarntae/Financial-project/services"
	"github.com/jarntae/Financial-project/middlewares"
	"github.com/joho/godotenv"
	"log"
	"github.com/gin-gonic/gin"
	"os"
	"strconv"

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

	secret := os.Getenv("JWT_SECRET")
	expHours, _ := strconv.ParseInt(os.Getenv("JWT_EXPIRATION_HOURS"), 10, 64)

	jwtWrapper := &services.JwtWrapper{
		SecretKey:       secret,
		Issuer:          "FinancialApp",
		ExpirationHours: expHours,
	}

	r := gin.Default()
	r.Use(middlewares.CORSMiddleware())
	// Setup routes
	routes.SetupAuthRoutes(r, db, jwtWrapper)
	routes.SetupAPIRoutes(r, db, jwtWrapper)

	
	r.Run("0.0.0.0:" + PORT)
}
