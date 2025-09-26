package entity

import (

	"gorm.io/gorm"
	"gorm.io/datatypes"
)

// DataChange สำหรับ audit trail ของการเปลี่ยนแปลงข้อมูล (INSERT/UPDATE/DELETE)
type DataChange struct {
	gorm.Model
	TableName string         `gorm:"size:50;not null" json:"table_name"`
	RecordID  *uint          `json:"record_id,omitempty"`

	Operation string         `gorm:"size:10;not null" json:"operation"` // INSERT, UPDATE, DELETE
	OldData   datatypes.JSON `gorm:"type:jsonb" json:"old_data,omitempty"`
	NewData   datatypes.JSON `gorm:"type:jsonb" json:"new_data,omitempty"`

	ChangedBy uint   `json:"changed_by,omitempty"`
	User	  User   `gorm:"foreignKey:ChangedBy"`


}

