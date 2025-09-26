package middlewares

import (
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jarntae/Financial-project/entity"
	"github.com/jarntae/Financial-project/services"
	"gorm.io/gorm"
)

// ตรวจสอบ JWT และ UserSession
func Authorizes(db *gorm.DB, jwtWrapper *services.JwtWrapper) gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.Request.Header.Get("Authorization")
		if token == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "ไม่พบ Authorization header"})
			return
		}

		tokenParts := strings.Fields(token)
		if len(tokenParts) != 2 || strings.ToLower(tokenParts[0]) != "bearer" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "รูปแบบ Authorization header ไม่ถูกต้อง"})
			return
		}

		token = tokenParts[1]

		// ตรวจ JWT
		claims, err := jwtWrapper.ValidateToken(token)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		// ตรวจ UserSession
		var session entity.UserSession
		if err := db.Preload("User").Where("token = ?", token).First(&session).Error; err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Session not found"})
			return
		}

		// ตรวจสอบว่า session หมดอายุหรือไม่
		if time.Now().After(session.ExpiresAt) {
			db.Delete(&session)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Session expired"})
			return
		}

		// Sliding expiration: ต่ออายุ session 2 ชั่วโมง
		if time.Until(session.ExpiresAt) < 30*time.Minute {
            session.ExpiresAt = time.Now().Add(2 * time.Hour)
            db.Save(&session)
        }

		// ใส่ email, role ลง context
		c.Set("email", claims.Email)
		c.Set("role", claims.Role)
		c.Set("session_id", session.ID)

		c.Next()
	}
}

