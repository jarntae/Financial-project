package entity
import (
	"gorm.io/gorm"
	"time"
)
// Budget แทนรอบงบประมาณหลัก (เช่น งบเดือนมกราคม)
type Budget struct {
	gorm.Model
	UserID            uint   `gorm:"not null" json:"user_id"`
	User              User   `gorm:"foreignKey:UserID"`

	Name              string `gorm:"not null" json:"name"`
	StartDate         time.Time `gorm:"not null" json:"start_date"`
	EndDate           time.Time `gorm:"not null" json:"end_date"`
	TotalBudgetAmount float64 `gorm:"not null" json:"total_budget_amount"` // งบประมาณรวมทั้งก้อน
	IsActive          bool   `gorm:"not null;default:true" json:"is_active"`
	
	Categories        []BudgetCategory `gorm:"foreignKey:BudgetID"`
}