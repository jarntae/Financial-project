package controller

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/datatypes"
	"gorm.io/gorm"

	"github.com/jarntae/Financial-project/entity"
	"github.com/jarntae/Financial-project/services"
	"github.com/jarntae/Financial-project/config"
)

// Signup Input
type SignupInput struct {
	FirstName string `json:"first_name" binding:"required"`
	LastName  string `json:"last_name" binding:"required"`
	Email     string `json:"email" binding:"required,email"`
	Password  string `json:"password" binding:"required,min=6"`
}

// Login Input
type LoginInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// Signup handler
func Signup(db *gorm.DB, jwtWrapper *services.JwtWrapper) gin.HandlerFunc {
	return func(c *gin.Context) {
		var input SignupInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Check existing email
		var user entity.User
		if err := db.Where("email = ?", input.Email).First(&user).Error; err == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Email already exists"})
			return
		}

		hashedPassword, _ := config.HashPassword(input.Password)

		// Default role "user"
		var role entity.Role
		if err := db.Where("role_name = ?", "user").First(&role).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Default role not found"})
			return
		}

		user = entity.User{
			FirstName: input.FirstName,
			LastName:  input.LastName,
			Email:     input.Email,
			Password:  hashedPassword,
			RoleID:    role.ID,
			IsActive:  true,
		}

		if err := db.Create(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Signup failed"})
			return
		}

		// Generate JWT
		token, _ := jwtWrapper.GenerateToken(user.Email, role.RoleName)

		// Create UserSession
		session := entity.UserSession{
			UserID:     user.ID,
			Token:      token,
			DeviceInfo: datatypes.JSON([]byte(`{"device":"browser"}`)),
			IPAddress:  c.ClientIP(),
			ExpiresAt:  time.Now().Add(time.Hour * time.Duration(jwtWrapper.ExpirationHours)),
		}
		db.Create(&session)
        var Role = role.RoleName
		c.JSON(http.StatusOK, gin.H{"token": token,"Role":Role ,"message": "Signup successful"})
	}
}

// Login handler
func Login(db *gorm.DB, jwtWrapper *services.JwtWrapper) gin.HandlerFunc {
	return func(c *gin.Context) {
		var input LoginInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var user entity.User
		if err := db.Preload("Role").Where("email = ?", input.Email).First(&user).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
			return
		}

		if !config.CheckPasswordHash(input.Password, user.Password) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
			return
		}

		// Generate JWT
		token, _ := jwtWrapper.GenerateToken(user.Email, user.Role.RoleName)

		// Create UserSession
		session := entity.UserSession{
			UserID:     user.ID,
			Token:      token,
			DeviceInfo: datatypes.JSON([]byte(`{"device":"browser"}`)),
			IPAddress:  c.ClientIP(),
			ExpiresAt:  time.Now().Add(time.Hour * time.Duration(jwtWrapper.ExpirationHours)),
		}
		db.Create(&session)

		c.JSON(http.StatusOK, gin.H{"token": token, "message": "Login successful", "role": user.Role.RoleName})
	}
}

// Logout handler
func Logout(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		sessionID, exists := c.Get("session_id")
		if !exists {
			c.JSON(http.StatusBadRequest, gin.H{"error": "No session found"})
			return
		}

		db.Delete(&entity.UserSession{}, sessionID)
		c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
	}
}
