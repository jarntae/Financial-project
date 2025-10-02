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
            c.JSON(http.StatusBadRequest, gin.H{
                "error": "ข้อมูลไม่ถูกต้อง",
                "details": err.Error(),
            })
            return
        }

        // Check existing email with better error handling
        var user entity.User
        err := db.Where("email = ?", input.Email).First(&user).Error
        if err != nil {
            if err != gorm.ErrRecordNotFound {
                c.JSON(http.StatusInternalServerError, gin.H{"error": "เกิดข้อผิดพลาดในฐานข้อมูล"})
                return
            }
        } else {
            c.JSON(http.StatusBadRequest, gin.H{"error": "อีเมลนี้มีอยู่แล้ว"})
            return
        }

        // Hash password with error handling
        hashedPassword, err := config.HashPassword(input.Password)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "เกิดข้อผิดพลาดในการประมวลผลรหัสผ่าน"})
            return
        }

        // Get default role with better error message
        var role entity.Role
        if err := db.Where("role_name = ?", "user").First(&role).Error; err != nil {
            if err == gorm.ErrRecordNotFound {
                c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่พบบทบาทผู้ใช้ในระบบ"})
            } else {
                c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถกำหนดบทบาทผู้ใช้ได้"})
            }
            return
        }

        // Create new user
        newUser := entity.User{
            FirstName: input.FirstName,
            LastName:  input.LastName,
            Email:     input.Email,
            Password:  hashedPassword,
            RoleID:    role.ID,
            IsActive:  true,
        }

        if err := db.Create(&newUser).Error; err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{
                "error": "ไม่สามารถสร้างผู้ใช้ใหม่ได้",
                "details": err.Error(),
            })
            return
        }

        // Generate JWT with error handling
        token, err := jwtWrapper.GenerateToken(newUser.Email, role.RoleName)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "เกิดข้อผิดพลาดในการสร้างโทเค็นการตรวจสอบสิทธิ์"})
            return
        }

        // Create session
        session := entity.UserSession{
            UserID:     newUser.ID,
            Token:      token,
            DeviceInfo: datatypes.JSON([]byte(`{"device":"browser"}`)),
            IPAddress:  c.ClientIP(),
            ExpiresAt:  time.Now().Add(time.Hour * time.Duration(jwtWrapper.ExpirationHours)),
        }

        if err := db.Create(&session).Error; err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถสร้างเซสชันผู้ใช้ได้"})
            return
        }

        // Set cookie
        c.SetCookie(
            "token",    
            token,      
            3600,       
            "/",        
            "",         
            false,      
            true,       
        )

        // Return success response
        c.JSON(http.StatusOK, gin.H{
            "message": "ลงทะเบียนสำเร็จ",
            "role": role.RoleName,
            "user": gin.H{
                "email": newUser.Email,
                "firstName": newUser.FirstName,
                "lastName": newUser.LastName,
            },
        })
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
			c.JSON(http.StatusUnauthorized, gin.H{"error": "อีเมลหรือรหัสผ่านไม่ถูกต้อง"})
			return
		}

		if !config.CheckPasswordHash(input.Password, user.Password) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "อีเมลหรือรหัสผ่านไม่ถูกต้อง"})
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

		c.SetCookie(
			"token",         // ชื่อ cookie
			token,           // JWT token ที่สร้าง
			3600,            // อายุ cookie (วินาที)
			"/",             // path
			"",              // domain ("" สำหรับ local)
			false,           // secure (true ถ้าใช้ https)
			true,            // httpOnly
		)

		c.JSON(http.StatusOK, gin.H{"message": "เข้าสู่ระบบสำเร็จ", "role": user.Role.RoleName, "token": token})
	}
}

// Logout handler
func Logout(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		sessionID, exists := c.Get("session_id")
		if !exists {
			c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบเซสชัน"})
			return
		}

		db.Delete(&entity.UserSession{}, sessionID)
		c.JSON(http.StatusOK, gin.H{"message": "ออกจากระบบสำเร็จ"})
	}
}

func GetMe(db *gorm.DB) gin.HandlerFunc {
    return func(c *gin.Context) {
        email, _ := c.Get("email")
        var user entity.User
        if err := db.Preload("Role").Where("email = ?", email).First(&user).Error; err != nil {
            c.JSON(http.StatusNotFound, gin.H{"error": "ไม่พบผู้ใช้"})
            return
        }
        c.JSON(http.StatusOK, gin.H{
            "email": user.Email,
            "role":  user.Role.RoleName,
            "firstName": user.FirstName,
            "lastName": user.LastName,
        })
    }
}