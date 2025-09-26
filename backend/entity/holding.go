package entity
import (
	"gorm.io/datatypes"
	"github.com/shopspring/decimal"
	"time"
	"gorm.io/gorm"
)
// Holding แทนการถือครองในพอร์ต (symbol, quantity, avg cost)
type Holding struct {
	gorm.Model
	PortfolioID       uint		   `gorm:"not null" json:"portfolio_id"` 
	Portfolio         Portfolio      `gorm:"foreignKey:PortfolioID"`

	SymbolID        uint          `gorm:"not null" json:"symbol_id"` // เพื่อความสะดวกในการ query
	Instrument     Instrument    `gorm:"foreignKey:SymbolID"`

	Quantity          decimal.Decimal `gorm:"type:decimal(15,6);not null" json:"quantity"` // จำนวนหน่วยที่ถือครอง
	AverageCost       decimal.Decimal `gorm:"type:decimal(15,4);not null" json:"average_cost"` // ราคาทุนเฉลี่ยต่อหน่วย
	CurrentPrice      *decimal.Decimal `gorm:"type:decimal(15,4)" json:"current_price,omitempty"` // ราคาปัจจุบันต่อหน่วย (ถ้ามี)
	MarketValue       *decimal.Decimal `gorm:"type:decimal(15,2)" json:"market_value,omitempty"` // มูลค่าตลาดปัจจุบัน (ถ้ามี)
	UnrealizedGainLoss *decimal.Decimal `gorm:"type:decimal(15,2)" json:"unrealized_gain_loss,omitempty"` // กำไร/ขาดทุนที่ยังไม่ตระหนัก (ถ้ามี)
	LastPriceUpdate   *time.Time      `json:"last_price_update,omitempty"` // เวลาที่อัพเดตราคาล่าสุด (ถ้ามี)
	Metadata          datatypes.JSON  `gorm:"type:jsonb" json:"metadata,omitempty"` // ข้อมูลเสริมอื่นๆ เก็บเป็น JSONB
}
