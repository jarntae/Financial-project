package entity
import (
	"gorm.io/gorm"
)
// Frequency แทนความถี่ในการทำรายการซ้ำ (recurring transactions)
type Frequency struct {
	gorm.Model
	Name string `gorm:"unique;not null" json:"name"` // 'daily', 'weekly', 'monthly', 'yearly', etc.
	RecurringRule []RecurringRule `gorm:"foreignKey:FrequencyID"`
}