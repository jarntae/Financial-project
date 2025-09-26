package entity
import (
	"gorm.io/gorm"
)
// UserCategory แทนการแมปหมวดหมู่ที่ผู้ใช้สร้าง/ตั้งค่าเฉพาะตน
type UserCategory struct {
	gorm.Model
	UserID     uint     `gorm:"not null" json:"user_id"`
	User       User     `gorm:"foreignKey:UserID"`
	CategoryID uint     `gorm:"not null" json:"category_id"`
	Category   Category `gorm:"foreignKey:CategoryID"`
	CustomName string    `gorm:"size:100" json:"custom_name,omitempty"`
	IsFavorite bool      `gorm:"default:false" json:"is_favorite"`
	SortOrder  int       `gorm:"default:0" json:"sort_order"`
}