package entity

import (
    "gorm.io/gorm"
    "time"

)
// User แทนข้อมูลผู้ใช้งานหลักของระบบ
type User struct {
    gorm.Model
    FirstName string `gorm:"unique;not null" json:"first_name"`
    LastName  string `gorm:"unique;not null" json:"last_name"`
    Email    string `gorm:"unique;not null" json:"email"`
    Password string `gorm:"not null" json:"password"`
    IsActive  bool   `gorm:"not null;default:true" json:"is_active"`
    EmailVerified bool `gorm:"not null;default:false" json:"email_verified"` 
    LastLogin time.Time `json:"last_login"`
    RoleID   uint   `gorm:"not null" json:"role_id"`
    Role     Role   `gorm:"foreignKey:RoleID"`
    UserCategories []UserCategory `gorm:"foreignKey:UserID"`
    UserSessions   []UserSession  `gorm:"foreignKey:UserID"`
    Accounts       []Account      `gorm:"foreignKey:UserID"`
}
