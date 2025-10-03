package entity

import (
	"gorm.io/gorm"
)
// BudgetCategory แทนงบประมาณที่จัดสรรให้กับแต่ละหมวดหมู่ค่าใช้จ่าย
type BudgetCategory struct {
	gorm.Model
	BudgetID          uint   `gorm:"not null" json:"budget_id"`
	Budget            Budget `gorm:"foreignKey:BudgetID"`

	ExpenseCategoryID uint   `gorm:"not null" json:"expense_category_id"`
	ExpenseCategory   ExpenseCategory `gorm:"foreignKey:ExpenseCategoryID"`
	
	Name              string `gorm:"not null" json:"name"`
	Description       string `json:"description"`
	BudgetedAmount    float64 `gorm:"not null" json:"budgeted_amount"` // งบที่ตั้งใจจะใช้
	SpentAmount       float64 `gorm:"not null;default:0" json:"spent_amount"` // ยอดใช้จ่ายจริง (ต้องคำนวณจาก Transactions)
	IsActive          bool   `gorm:"not null;default:true" json:"is_active"`
}