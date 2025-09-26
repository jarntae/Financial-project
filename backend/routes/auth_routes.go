package routes

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"github.com/jarntae/Financial-project/controller"
	"github.com/jarntae/Financial-project/services"
	"github.com/jarntae/Financial-project/middlewares"
)

// SetupAuthRoutes สร้าง group สำหรับ auth
func SetupAuthRoutes(r *gin.Engine, db *gorm.DB, jwtWrapper *services.JwtWrapper) {
	// Public routes
	r.POST("/signup", controller.Signup(db, jwtWrapper))
	r.POST("/login", controller.Login(db, jwtWrapper))

	// Logout protected route
	auth := r.Group("/auth")
	auth.Use(middlewares.Authorizes(db, jwtWrapper))
	auth.POST("/logout", controller.Logout(db))
}
