package entity
import (
	"gorm.io/gorm"
)
// SubExpenseCategory แทนหมวดหมู่ย่อยของค่าใช้จ่าย
type SubExpenseCategory struct {
	gorm.Model
	Name              string `gorm:"not null" json:"name"`
	Description       string `json:"description"`
	
	ExpenseCategoryID uint   `gorm:"not null" json:"expense_category_id"`
	ExpenseCategory   ExpenseCategory `gorm:"foreignKey:ExpenseCategoryID"`
	
	Transactions      []Transaction `gorm:"foreignKey:SubExpenseCategoryID"`
}