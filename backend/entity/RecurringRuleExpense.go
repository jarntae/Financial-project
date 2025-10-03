package entity
import (
	"gorm.io/gorm"
	"time"
)
// RecurringRuleExpense แทนกฎการทำรายการเกิดซ้ำ เช่น ทุกวันที่ 5 ของเดือน
type RecurringRuleExpense struct {
	gorm.Model
	UserID          uint   `gorm:"not null" json:"user_id"`
	User            User   `gorm:"foreignKey:UserID"`

	Name            string `gorm:"not null" json:"name"`
	Amount          float64 `gorm:"not null" json:"amount"`
	StartDate       time.Time `gorm:"not null" json:"start_date"`
	EndDate         time.Time `json:"end_date"`
	NextExecutionDate time.Time `json:"next_execution_date"`
	Description     string `json:"description"`
	IsActive        bool   `gorm:"not null;default:true" json:"is_active"`

	Transactions    []Transaction `gorm:"foreignKey:RecurringRuleExpenseID"`
}