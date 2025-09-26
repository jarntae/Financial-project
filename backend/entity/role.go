package entity
import (
	"gorm.io/gorm"
	"gorm.io/datatypes"
)
// UserRole แทน role ของผู้ใช้ (dynamic role management)
// เก็บ permissions เป็น JSONB เช่น {"can_manage_categories":true}
type Role struct {
	gorm.Model
	RoleName string `gorm:"unique;not null" json:"role_name"` 
	Permissions datatypes.JSON `gorm:"type:jsonb" json:"permissions,omitempty"`
	IsActive  bool   `gorm:"not null;default:true" json:"is_active"`

	User    []User `gorm:"foreignKey:RoleID"` 
}