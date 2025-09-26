package entity
import (
	"gorm.io/gorm"
)
// Category แทนหมวดหมู่แบบ hierarchical (parent-child)
// type: income|expense|investment
type Category struct {
	gorm.Model
	ParentID       *int       `json:"parent_id,omitempty"` //ใช้สำหรับทำ category แบบ tree/hierarchy (เช่น หมวดหมู่ย่อยมี parent)
	Name           string     `gorm:"size:100;not null" json:"name"` // ชื่อหมวดหมู่
	Type           string     `gorm:"size:20;not null" json:"type"` // income/expense/investment
	Icon           string     `gorm:"size:50" json:"icon,omitempty"`
	Color          string     `gorm:"size:7" json:"color,omitempty"`
	Description    string     `gorm:"type:text" json:"description,omitempty"`
	IsSystemDefined bool      `gorm:"default:false" json:"is_system_defined"` // true = หมวดหมู่ที่ระบบสร้างไว้ (ห้ามลบ/แก้ไข), false = ผู้ใช้สร้างเอง
	SortOrder      int        `gorm:"default:0" json:"sort_order"`
	IsActive       bool       `gorm:"default:true" json:"is_active"`
	CreatedBy      *string    `gorm:"type:uuid" json:"created_by,omitempty"` // ผู้สร้างหมวดหมู่ (User ID)

	UserCategories []UserCategory `gorm:"foreignKey:CategoryID"`
}