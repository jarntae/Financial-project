package entity
import(
	"gorm.io/gorm"
	"github.com/shopspring/decimal"
	"time"
)
// InvestmentTransaction แทนธุรกรรมซื้อขาย/รับปันผลในพอร์ต
type InvestmentTransaction struct {
	gorm.Model
	PortfolioID       uint		   `gorm:"not null" json:"portfolio_id"`
	Portfolio         Portfolio      `gorm:"foreignKey:PortfolioID"`

	HoldingID        uint          `gorm:"not null" json:"holding_id"`
	Holding          Holding       `gorm:"foreignKey:HoldingID"`

	Type           string          `gorm:"size:20;not null" json:"type"` // buy,sell,dividend,...
	Symbol         string          `gorm:"size:20;not null" json:"symbol"`

	Quantity       *decimal.Decimal `gorm:"type:decimal(15,6)" json:"quantity,omitempty"`
	PricePerUnit   *decimal.Decimal `gorm:"type:decimal(15,4)" json:"price_per_unit,omitempty"`
	TotalAmount    decimal.Decimal `gorm:"type:decimal(15,2);not null" json:"total_amount"`
	Fees           decimal.Decimal `gorm:"type:decimal(15,2);default:0" json:"fees"`
	Tax            decimal.Decimal `gorm:"type:decimal(15,2);default:0" json:"tax"`
	NetAmount      decimal.Decimal `gorm:"type:decimal(15,2);not null" json:"net_amount"`
	TransactionDate time.Time      `gorm:"type:date;not null" json:"transaction_date"`
	SettlementDate *time.Time      `gorm:"type:date" json:"settlement_date,omitempty"`
	ReferenceNumber string         `gorm:"size:100" json:"reference_number,omitempty"`
	BrokerName     string          `gorm:"size:100" json:"broker_name,omitempty"`
	Notes          string          `gorm:"type:text" json:"notes,omitempty"`

	ImportBatchID   uint		   `json:"import_batch_id,omitempty"` // ถ้านำเข้าจากไฟล์/แอพอื่น จะเชื่อมกับชุดการนำเข้า
	ImportBatch     *ImportBatch  `gorm:"foreignKey:ImportBatchID"`

	ImportRecord []ImportRecord `gorm:"foreignKey:InvestmentTransactionID"`

}