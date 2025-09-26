package entity
import (
	"gorm.io/gorm"
	"github.com/shopspring/decimal"
	"gorm.io/datatypes"
)
// Account แทนบัญชีการเงิน (bank, investment, cash, credit_card)
type Account struct {
	gorm.Model
	UserID      uint    `gorm:"not null" json:"user_id"`
	User        User    `gorm:"foreignKey:UserID"`
	Name        string  `gorm:"size:100;not null" json:"name"` // ชื่อบัญชี เช่น 'My Bank Account', 'Cash Wallet', etc.

	TypeAccountID uint    `gorm:"not null" json:"type_account_id"` // 'bank', 'credit_card', 'wallet', etc.
	TypeAccount   TypeAccount `gorm:"foreignKey:TypeAccountID"`

	AccountNumber string  `gorm:"size:50" json:"account_number,omitempty"` // เลขบัญชี
	InstitutionName string  `gorm:"size:100" json:"institution_name,omitempty"` // ชื่อสถาบันการเงิน

	CurrencyID   uint    `gorm:"not null" json:"currency_id"` // 'USD', 'EUR', 'THB', etc.
	Currency     Currency `gorm:"foreignKey:CurrencyID"`

	InitialBalance decimal.Decimal `gorm:"type:decimal(15,2);default:0" json:"initial_balance"` // ยอดเงินเริ่มต้น
	CurrentBalance decimal.Decimal `gorm:"type:decimal(15,2);default:0" json:"current_balance"` // ยอดเงินปัจจุบัน
	CreditLimit    *decimal.Decimal `gorm:"type:decimal(15,2)" json:"credit_limit,omitempty"` // วงเงิน (สำหรับบัญชีประเภทบัตรเครดิต)
	InterestRate   *decimal.Decimal `gorm:"type:decimal(5,2)" json:"interest_rate,omitempty"` // อัตราดอกเบี้ย (ถ้ามี)
	IsActive       bool            `gorm:"default:true" json:"is_active"` // true=ใช้งาน, false=ปิดบัญชี
	Metadata       datatypes.JSON  `gorm:"type:jsonb" json:"metadata,omitempty"` // ข้อมูลเสริมอื่นๆ เก็บเป็น JSONB

	Portfolios []Portfolio `gorm:"foreignKey:AccountID"`
}