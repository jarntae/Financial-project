package entity

import (
	"gorm.io/gorm"
	"gorm.io/datatypes"
)
// Instrument แทนเครื่องมือทางการเงิน เช่น หุ้น พันธบัตร สกุลเงินดิจิทัล 

type Instrument struct {
	gorm.Model
	Symbol           string `gorm:"unique;not null" json:"symbol"` // 'AAPL', 'GOOGL', 'BTC', etc.
	Name             string `gorm:"not null" json:"name"` // 'Apple Inc.', 'Alphabet Inc.', 'Bitcoin', etc.
	InstrumentTypeID uint `json:"instrument_type_id"`
	InstrumentType   InstrumentType `gorm:"foreignKey:InstrumentTypeID"`
	Metadata         datatypes.JSON `gorm:"type:jsonb"`

	Holdings []Holding `gorm:"foreignKey:SymbolID"`
}
