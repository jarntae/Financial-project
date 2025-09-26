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
	Name        string  `gorm:"size:100;not null" json:"name"`
	Type        string  `gorm:"size:50;not null" json:"type"` // bank, investment, cash, credit_card
	AccountNumber string  `gorm:"size:50" json:"account_number,omitempty"`
	InstitutionName string  `gorm:"size:100" json:"institution_name,omitempty"`
	Currency       string          `gorm:"size:3;default:THB" json:"currency"`
	InitialBalance decimal.Decimal `gorm:"type:decimal(15,2);default:0" json:"initial_balance"`
	CurrentBalance decimal.Decimal `gorm:"type:decimal(15,2);default:0" json:"current_balance"`
	CreditLimit    *decimal.Decimal `gorm:"type:decimal(15,2)" json:"credit_limit,omitempty"`
	InterestRate   *decimal.Decimal `gorm:"type:decimal(5,2)" json:"interest_rate,omitempty"`
	IsActive       bool            `gorm:"default:true" json:"is_active"`
	Metadata       datatypes.JSON  `gorm:"type:jsonb" json:"metadata,omitempty"`
}