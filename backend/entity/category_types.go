package entity
import (
	"gorm.io/gorm"
)
// CategoryType แทนประเภทของหมวดหมู่ เช่น รายรับ รายจ่าย โอนเงิน
type CategoryType struct {
	gorm.Model
	Name string `gorm:"unique;not null" json:"name"` // 'income', 'expense', 'transfer', etc.
	Categories []Category `gorm:"foreignKey:CategoryTypeID"`
	Transactions []Transaction `gorm:"foreignKey:CategoryTypeID"`
}