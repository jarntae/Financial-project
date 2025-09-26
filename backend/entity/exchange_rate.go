package entity

import (
	"gorm.io/gorm"
	"time"
	"github.com/shopspring/decimal"
)

// ExchangeRate เก็บอัตราแลกเปลี่ยน (unique: from,to,date)
type ExchangeRate struct {
	gorm.Model
	FromCurrencyID uint      `gorm:"not null" json:"from_currency_id"`
	FromCurrency Currency `gorm:"foreignKey:FromCurrencyID"`
	
	ToCurrencyID   uint      `gorm:"not null" json:"to_currency_id"`
	ToCurrency   Currency `gorm:"foreignKey:ToCurrencyID"`

	Rate         decimal.Decimal   `gorm:"type:decimal(10,6);not null" json:"rate"`
	Date         time.Time `gorm:"type:date;not null" json:"date"`
	Source       string    `gorm:"size:50" json:"source,omitempty"`

}


