package entity
import (
	"gorm.io/gorm"
	"gorm.io/datatypes"
	"time"
)
// UserSession เก็บ session / token ของผู้ใช้สำหรับ device ต่าง ๆ
type UserSession struct {
	gorm.Model
	UserID uint `gorm:"not null" json:"user_id"`
	User   User `gorm:"foreignKey:UserID"`

	DeviceInfo datatypes.JSON `gorm:"type:jsonb" json:"device_info,omitempty"`
	IPAddress  string         `gorm:"type:inet" json:"ip_address,omitempty"`
	ExpiresAt  time.Time      `gorm:"not null" json:"expires_at"`
	Token      string         `gorm:"unique;not null" json:"token"`

}