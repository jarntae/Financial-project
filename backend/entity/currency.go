package entity

import (
	"gorm.io/gorm"
)
// Currency แทนสกุลเงินที่ใช้งาน เช่น THB, USD
type Currency struct {
	gorm.Model
	Code   string `gorm:"unique;not null;size:3" json:"code"`   // เช่น THB
	Name   string `gorm:"not null" json:"name"`
	Symbol string `gorm:"not null" json:"symbol"`
	
	Accounts []Account `gorm:"foreignKey:CurrencyID"`
}