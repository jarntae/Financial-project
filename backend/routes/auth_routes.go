package routes

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"github.com/jarntae/Financial-project/controller"
	"github.com/jarntae/Financial-project/services"
	"github.com/jarntae/Financial-project/middlewares"
	"time"
)

// SetupAuthRoutes สร้าง group สำหรับ auth
func SetupAuthRoutes(r *gin.Engine, db *gorm.DB, jwtWrapper *services.JwtWrapper) {
	// Public routes
	//1*time.Minute → ช่วงเวลา (window) คือ 1 นาที
	//5 → จำนวนคำขอสูงสุดที่อนุญาตในช่วงเวลานี้คือ 5 คำขอ
	r.POST("/signup",  middlewares.RateLimit(1*time.Minute, 5), controller.Signup(db, jwtWrapper))
	r.POST("/login", middlewares.RateLimit(1*time.Minute, 5), controller.Login(db, jwtWrapper))

	// Logout protected route
	auth := r.Group("/auth")
	auth.Use(middlewares.Authorizes(db, jwtWrapper))
	auth.POST("/logout", controller.Logout(db))
}
