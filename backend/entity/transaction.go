package entity
import (
	"gorm.io/gorm"
	"time"
)
// Transaction แทนรายการบัญชีทั้งหมด (รายรับ/รายจ่าย)
type Transaction struct {
	gorm.Model
	UserID                 uint   `gorm:"not null" json:"user_id"`
	User                   User   `gorm:"foreignKey:UserID"`

	// บัญชีที่เกี่ยวข้อง (AccountID)
	AccountID              uint   `gorm:"not null" json:"account_id"`
	Account                Account `gorm:"foreignKey:AccountID"`
	
	Amount                 float64 `gorm:"not null" json:"amount"`
	Description            string `json:"description"`
	TransactionDate        time.Time `gorm:"not null" json:"transaction_date"`
	IsRecurring            bool   `gorm:"not null;default:false" json:"is_recurring"`

	ExpenseCategoryID      uint   `gorm:"not null" json:"expense_category_id"`
	ExpenseCategory        ExpenseCategory `gorm:"foreignKey:ExpenseCategoryID"`
	
	SubExpenseCategoryID   uint   `json:"sub_expense_category_id"` // สามารถเป็น nil ได้
	SubExpenseCategory     *SubExpenseCategory `gorm:"foreignKey:SubExpenseCategoryID"`
	
	PaymentMethodID        uint   `gorm:"not null" json:"payment_method_id"`
	PaymentMethod          PaymentMethod `gorm:"foreignKey:PaymentMethodID"`
	
	RecurringRuleExpenseID uint   `json:"recurring_rule_expense_id"` // เชื่อมกับกฎการเกิดซ้ำ ถ้ามี
	RecurringRuleExpense   RecurringRuleExpense `gorm:"foreignKey:RecurringRuleExpenseID"`

	DebtPayment []DebtPayment `gorm:"foreignKey:TransactionID"`
}