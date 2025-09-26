package entity
import (
	"gorm.io/gorm"
)
// InstrumentType แทนประเภทของเครื่องมือทางการเงิน เช่น หุ้น พันธบัตร สกุลเงินดิจิทัล
type InstrumentType struct {
    gorm.Model
    Name string `gorm:"unique;not null"`

    Instruments []Instrument `gorm:"foreignKey:InstrumentTypeID"`
}
