package middlewares

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jarntae/Financial-project/entity"
	"github.com/jarntae/Financial-project/services"
	"gorm.io/gorm"
)

// ตรวจสอบ JWT และ UserSession
func Authorizes(db *gorm.DB, jwtWrapper *services.JwtWrapper) gin.HandlerFunc {
    return func(c *gin.Context) {
        token, err := c.Cookie("token")
        if err != nil {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "No token"})
            return
        }

        // ใช้ token ตรงๆ ไม่ต้อง split
        claims, err := jwtWrapper.ValidateToken(token)
        if err != nil {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
            return
        }

        // ...โค้ดเดิม...
        var session entity.UserSession
        if err := db.Preload("User").Where("token = ?", token).First(&session).Error; err != nil {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Session not found"})
            return
        }

        if time.Now().After(session.ExpiresAt) {
            db.Delete(&session)
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Session expired"})
            return
        }

        if time.Until(session.ExpiresAt) < 30*time.Minute {
            session.ExpiresAt = time.Now().Add(2 * time.Hour)
            db.Save(&session)
        }

        c.Set("email", claims.Email)
        c.Set("role", claims.Role)
        c.Set("session_id", session.ID)
        c.Next()
    }
}
