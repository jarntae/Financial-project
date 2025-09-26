package entity

import (
	"time"
	"gorm.io/gorm"
)

// RecurringRule แทนกฎการเกิดรายการซ้ำ (เช่น รายเดือน)

type RecurringRule struct {
	gorm.Model
	UserID uint `gorm:"not null" json:"user_id"`
	User   User `gorm:"foreignKey:UserID"`
	Name        string    `gorm:"not null" json:"name"`

	FrequencyID      uint       `gorm:"not null" json:"frequency_id"`
	Frequency        Frequency  `gorm:"foreignKey:FrequencyID"`

	IntervalValue     int        `gorm:"default:1" json:"interval_value"` // ค่าความถี่ เช่น ทุก 2 สัปดาห์, ทุก 3 เดือน
	StartDate         time.Time  `gorm:"type:date;not null" json:"start_date"` // วันที่เริ่มต้น
	EndDate           *time.Time `gorm:"type:date" json:"end_date,omitempty"` // วันที่สิ้นสุด (ถ้ามี)
	IsActive          bool       `gorm:"default:true" json:"is_active"` // กำหนดว่ากฎนี้ยังใช้งานอยู่หรือไม่
	NextExecutionDate *time.Time `gorm:"type:date" json:"next_execution_date,omitempty"` // วันที่คาดว่าจะเกิดรายการถัดไป
	Discription       string     `gorm:"type:text" json:"description,omitempty"` // คำอธิบายเพิ่มเติม (ถ้ามี)

	Transactions      []Transaction `gorm:"foreignKey:RecurringRuleID"` 
}