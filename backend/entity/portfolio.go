package entity
import (
	"gorm.io/gorm"
	"github.com/shopspring/decimal"

)
// Portfolio แทนพอร์ตโฟลิโอการลงทุนของผู้ใช้
type Portfolio struct {
	gorm.Model
	UserID uint `gorm:"not null" json:"user_id"`
	User   User `gorm:"foreignKey:UserID"`
	Name        string  `gorm:"not null" json:"name"`
	Description string  `json:"description,omitempty"`

	AccountID uint    `gorm:"not null" json:"account_id"`
	Account   Account `gorm:"foreignKey:AccountID"`

	CurrencyID uint     `gorm:"not null" json:"currency_id"`
	Currency   Currency `gorm:"foreignKey:CurrencyID"`

	TotalInvestment decimal.Decimal `gorm:"type:decimal(15,2);default:0" json:"total_investment"`
	CurrentValue    decimal.Decimal `gorm:"type:decimal(15,2);default:0" json:"current_value"`
	UnrealizedGainLoss decimal.Decimal `gorm:"type:decimal(15,2);default:0" json:"unrealized_gain_loss"`
	IsActive       bool            `gorm:"default:true" json:"is_active"` 
}    