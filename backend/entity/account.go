package entity
import (
	"gorm.io/gorm"
)
// Account แทนบัญชีการเงินของผู้ใช้
type Account struct {
	gorm.Model
	UserID            uint   `gorm:"not null" json:"user_id"`
	User              User   `gorm:"foreignKey:UserID"`
	
	Name              string `gorm:"not null" json:"name"`
	AccountNumber     string `gorm:"unique" json:"account_number"`
	InstitutionName   string `json:"institution_name"`
	Description       string `json:"description"`
	IsSystemDefined   bool   `gorm:"not null;default:false" json:"is_system_defined"`
	IsActive          bool   `gorm:"not null;default:true" json:"is_active"`
	
	TypeAccountID     uint   `gorm:"not null" json:"type_account_id"`
	TypeAccount       TypeAccount `gorm:"foreignKey:TypeAccountID"`
	
	CurrencyID        uint   `gorm:"not null" json:"currency_id"`
	Currency          Currency `gorm:"foreignKey:CurrencyID"`
	
	Transactions      []Transaction `gorm:"foreignKey:AccountID"`
}