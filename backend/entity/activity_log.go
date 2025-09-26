package entity

import (
	"time"
	"gorm.io/gorm"
	"gorm.io/datatypes"
)

// ActivityLog บันทึกกิจกรรมของผู้ใช้สำหรับ audit / UI activity feed
type ActivityLog struct {
	gorm.Model
	UserID     uint           `gorm:"not null" json:"user_id"`
	User       User           `gorm:"foreignKey:UserID"`

	Action     string         `gorm:"size:50;not null" json:"action"` // create, update, delete, login, export
	// EntityType string         `gorm:"size:50;not null" json:"entity_type"` //
	// EntityID   *uuid.UUID     `gorm:"type:uuid" json:"entity_id,omitempty"`
	OldValues  datatypes.JSON `gorm:"type:jsonb" json:"old_values,omitempty"`
	NewValues  datatypes.JSON `gorm:"type:jsonb" json:"new_values,omitempty"`
	IPAddress  string         `gorm:"type:inet" json:"ip_address,omitempty"`
	UserAgent  string         `gorm:"type:text" json:"user_agent,omitempty"`
	CreatedAt  time.Time      `gorm:"autoCreateTime" json:"created_at"`
}


