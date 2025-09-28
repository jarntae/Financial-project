package routes

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"github.com/jarntae/Financial-project/middlewares"
	"github.com/jarntae/Financial-project/services"
	"github.com/jarntae/Financial-project/controller"
)

// SetupAPIRoutes สำหรับ API ที่ต้อง login
func SetupAPIRoutes(r *gin.Engine, db *gorm.DB, jwtWrapper *services.JwtWrapper) {
	auth := r.Group("/api")
	auth.Use(middlewares.Authorizes(db, jwtWrapper))
	{
		auth.GET("/profile", func(c *gin.Context) {
			email := c.GetString("email")
			role := c.GetString("role")
			c.JSON(200, gin.H{"email": email, "role": role})
		})
		auth.GET("/me", controller.GetMe(db))

		// เพิ่ม route อื่น ๆ ของ API protected ได้ตรงนี้
	}
}
