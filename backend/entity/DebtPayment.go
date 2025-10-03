package entity
import (
	"gorm.io/gorm"
	"time"
)
// DebtPayment แทนการชำระหนี้แต่ละครั้ง
type DebtPayment struct {
	gorm.Model
	DebtID                uint   `gorm:"not null" json:"debt_id"`
	Debt                  Debt   `gorm:"foreignKey:DebtID"`

	PaymentDate           time.Time `gorm:"not null" json:"payment_date"`
	Amount                float64 `gorm:"not null" json:"amount"`            // ยอดเงินที่ชำระทั้งหมด
	PrincipalAmount       float64 `gorm:"not null" json:"principal_amount"`  // ส่วนที่ตัดเงินต้น
	InterestAmount        float64 `gorm:"not null" json:"interest_amount"`   // ส่วนที่เป็นดอกเบี้ย

	TransactionID         uint   `gorm:"not null" json:"transaction_id"` // เชื่อมไปยังรายการ Transaction ที่จ่ายเงิน
	Transaction           Transaction `gorm:"foreignKey:TransactionID"`
}