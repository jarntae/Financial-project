package entity

import (
	"gorm.io/gorm"
	"gorm.io/datatypes"
)

// SystemSetting เก็บค่ากำหนดจากระบบ (key/value ในรูป JSON)
type SystemSetting struct {
	gorm.Model
	Key       string         `gorm:"size:100;unique;not null" json:"key"`
	Value     datatypes.JSON `gorm:"type:jsonb;not null" json:"value"`
	Description string       `gorm:"type:text" json:"description,omitempty"`
	IsPublic  bool           `gorm:"default:false" json:"is_public"`
}

