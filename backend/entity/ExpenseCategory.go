package entity
import (
	"gorm.io/gorm"
)
// ExpenseCategory แทนหมวดหมู่ค่าใช้จ่ายหลัก/รายรับ
type ExpenseCategory struct {
	gorm.Model
	Name              string `gorm:"not null" json:"name"`
	Description       string `json:"description"`
	
	TransactionTypeID uint   `gorm:"not null" json:"transaction_type_id"`
	TransactionType   TransactionType `gorm:"foreignKey:TransactionTypeID"` // ระบุว่าเป็น รายรับ/รายจ่าย
	
	SubCategories     []SubExpenseCategory `gorm:"foreignKey:ExpenseCategoryID"`
	BudgetCategories  []BudgetCategory     `gorm:"foreignKey:ExpenseCategoryID"`
	Transactions      []Transaction        `gorm:"foreignKey:ExpenseCategoryID"`
}