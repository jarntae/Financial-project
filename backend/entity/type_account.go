package entity
import (
	"gorm.io/gorm"
)
// TypeAccount แทนประเภทของบัญชี เช่น บัญชีธนาคาร บัตรเครดิต กระเป๋าเงิน
type TypeAccount struct {
	gorm.Model
	Name string `gorm:"unique;not null" json:"name"` // 'bank', 'credit_card', 'wallet', etc.
	Accounts []Account `gorm:"foreignKey:TypeAccountID"`
}