package entity
import (
	"gorm.io/gorm"
	"time"	
)
// Debt แทนรายละเอียดหนี้สินแต่ละรายการ (สินเชื่อ, บัตรเครดิต)
type Debt struct {
	gorm.Model
	UserID            uint   `gorm:"not null" json:"user_id"`
	User              User   `gorm:"foreignKey:UserID"`

	Name              string `gorm:"not null" json:"name"`
	InitialAmount     float64 `gorm:"not null" json:"initial_amount"`      // ยอดหนี้เริ่มต้น
	CurrentBalance    float64 `gorm:"not null" json:"current_balance"`     // ยอดหนี้คงเหลือปัจจุบัน
	InterestRate      float64 `gorm:"not null" json:"interest_rate"`       // อัตราดอกเบี้ยต่อปี
	DueDate           time.Time `gorm:"not null" json:"due_date"`
	PaymentFrequency  string `json:"payment_frequency"`                   // ความถี่ในการชำระ
	CreditorName      string `json:"creditor_name"`                       // ชื่อเจ้าหนี้
	IsActive          bool   `gorm:"not null;default:true" json:"is_active"`

	Payments          []DebtPayment `gorm:"foreignKey:DebtID"`
}
