package entity
import (
	"gorm.io/gorm"
)
// TransactionType แทนประเภทรายการ เช่น รายรับ (Income), รายจ่าย (Expense), การลงทุน (Investment)
type TransactionType struct {
	gorm.Model
	Name            string `gorm:"unique;not null" json:"name"`
	Description     string `json:"description"`
	
	ExpenseCategories []ExpenseCategory `gorm:"foreignKey:TransactionTypeID"`
}
