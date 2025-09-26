package entity
import (
	"gorm.io/gorm"
	"gorm.io/datatypes"
)
// ImportRecord แทนแต่ละรายการที่นำเข้าจาก batch
type ImportRecord struct {
	gorm.Model
	BatchID    uint           `gorm:"not null" json:"batch_id"`
	
	RawData                 datatypes.JSON `gorm:"type:jsonb;not null" json:"raw_data"`
	ParsedData              datatypes.JSON `gorm:"type:jsonb" json:"parsed_data,omitempty"`
	ConfidenceScore         *float32       `json:"confidence_score,omitempty"` // 0.00 - 1.00
	Status                  string         `gorm:"size:20;default:pending" json:"status"`

	TransactionID           *uint          `json:"transaction_id,omitempty"`
	Transaction             *Transaction   `gorm:"foreignKey:TransactionID"`
	InvestmentTransactionID  *uint          `json:"investment_transaction_id,omitempty"`
	InvestmentTransaction   *InvestmentTransaction `gorm:"foreignKey:InvestmentTransactionID"`
	ErrorMessage            string         `gorm:"type:text" json:"error_message,omitempty"`
}