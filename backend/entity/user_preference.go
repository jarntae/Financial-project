package entity

import (
	"time"

	"gorm.io/gorm"
	"gorm.io/datatypes"
)

// UserPreference เก็บตั้งค่าผู้ใช้ (key/value)
type UserPreference struct {
	gorm.Model
	UserID    uint		   `gorm:"not null" json:"user_id"`
	User      User         `gorm:"foreignKey:UserID"`
	Key       string         `gorm:"size:100;not null" json:"key"`
	Value     datatypes.JSON `gorm:"type:jsonb;not null" json:"value"`
	CreatedAt time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
}

