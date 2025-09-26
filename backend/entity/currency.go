package entity
import (
	"gorm.io/gorm"
)
// Currency แทนสกุลเงินที่ใช้ในบัญชีและพอร์ตโฟลิโอ
type Currency struct {
	gorm.Model
	Code string `gorm:"unique;not null" json:"code"` // 'USD', 'EUR', 'THB', etc.
	Name string `gorm:"not null" json:"name"`        // 'US Dollar', 'Euro', 'Thai Baht', etc.
	Symbol string `gorm:"not null" json:"symbol"`     // '$', '€', '฿', etc.

	Accounts []Account `gorm:"foreignKey:CurrencyID"`
	Portfolios []Portfolio `gorm:"foreignKey:CurrencyID"`
}