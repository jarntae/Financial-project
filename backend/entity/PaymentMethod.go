package entity
import (
	"gorm.io/gorm"
)
// PaymentMethod แทนวิธีการชำระเงิน เช่น Cash, Transfer, Credit Card
type PaymentMethod struct {
	gorm.Model
	Name        string `gorm:"unique;not null" json:"name"`
	NameTH      string `json:"name_th"`
	Description string `json:"description"`
	
	Transactions []Transaction `gorm:"foreignKey:PaymentMethodID"`
}