package entity
import (
	"gorm.io/gorm"
	"github.com/shopspring/decimal"
	"time"
	"gorm.io/datatypes"
	"github.com/lib/pq"
)
// Transaction แทนรายการทางการเงินของผู้ใช้
type Transaction struct {
	gorm.Model
	UserID uint `gorm:"not null" json:"user_id"`
	User   User `gorm:"foreignKey:UserID"`

	AccountID uint    `gorm:"not null" json:"account_id"`
	Account   Account `gorm:"foreignKey:AccountID"`

	CategoryID uint     `gorm:"not null" json:"category_id"`
	Category   Category `gorm:"foreignKey:CategoryID"`

	CategoryTypeID uint         `gorm:"not null" json:"category_type_id"`
	CategoryType   CategoryType `gorm:"foreignKey:CategoryTypeID"`

	Amount      float64   `gorm:"not null" json:"amount"` // จำนวนเงินในสกุลเงินของบัญชี

	CurrencyID uint      `gorm:"not null" json:"currency_id"`
	Currency   Currency  `gorm:"foreignKey:CurrencyID"`

	ExchangeRate            *decimal.Decimal `gorm:"type:decimal(10,4)" json:"exchange_rate,omitempty"` // อัตราแลกเปลี่ยนไปยังสกุลเงินฐาน (ถ้ามี)
	AmountInBaseCurrency    *decimal.Decimal `gorm:"type:decimal(15,2)" json:"amount_in_base_currency,omitempty"` // จำนวนเงินในสกุลเงินฐาน (ถ้ามี)

	Description             string          `gorm:"type:text" json:"description,omitempty"` 
	TransactionDate         time.Time       `gorm:"type:date;not null" json:"transaction_date"` // วันที่ทำรายการ
	ReferenceNumber         string          `gorm:"size:100" json:"reference_number,omitempty"` // เลขที่อ้างอิง เช่น หมายเลขเช็ค, หมายเลขใบเสร็จ
	ReceiptURL              *string          `gorm:"type:text" json:"receipt_url,omitempty"` // URL ของรูปภาพใบเสร็จรับเงิน (ถ้ามี)
	Location                datatypes.JSON  `gorm:"type:jsonb" json:"location,omitempty"` // ข้อมูลสถานที่ (ถ้ามี) เก็บเป็น JSONB เช่น {"latitude":xx.xxxx,"longitude":yy.yyyy}
	Tags                    pq.StringArray  `gorm:"type:text[]" json:"tags,omitempty"` // แท็ก/ป้ายกำกับเสริม เก็บเป็น array ของ strings
	Metadata                datatypes.JSON  `gorm:"type:jsonb" json:"metadata,omitempty"` // ข้อมูลเสริมอื่นๆ เก็บเป็น JSONB
	IsRecurring             bool            `gorm:"default:false" json:"is_recurring"` // true=รายการซ้ำ, false=รายการปกติ

	RecurringRuleID         uint          `json:"recurring_rule_id,omitempty"`  // ถ้าเป็นรายการซ้ำ จะเชื่อมกับกฎการเกิดรายการซ้ำ
	RecurringRule           *RecurringRule `gorm:"foreignKey:RecurringRuleID"`

	ImportBatchID           uint		   `json:"import_batch_id,omitempty"` // ถ้านำเข้าจากไฟล์/แอพอื่น จะเชื่อมกับชุดการนำเข้า
	ImportBatch             *ImportBatch  `gorm:"foreignKey:ImportBatchID"`

	ImportRecord []ImportRecord `gorm:"foreignKey:TransactionID"`

}
