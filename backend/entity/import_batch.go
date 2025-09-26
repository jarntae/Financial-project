package entity
import (
	"gorm.io/gorm"
	"gorm.io/datatypes"
	"time"
)
// ImportBatch แทนชุดการนำเข้าไฟล์จาก AI/OCR หรือไฟล์ CSV/Excel
type ImportBatch struct {
	gorm.Model
	UserID      uint           `gorm:"not null" json:"user_id"`
	User        User           `gorm:"foreignKey:UserID"`
	FileName         string         `gorm:"size:255;not null" json:"file_name"` // ชื่อไฟล์ต้นฉบับ
	FilePath         string         `gorm:"type:text;not null" json:"file_path"` // ที่เก็บไฟล์บนเซิร์ฟเวอร์
	FileSize         *int64         `json:"file_size,omitempty"` // ขนาดไฟล์เป็นไบต์
	MimeType         string         `gorm:"size:100" json:"mime_type,omitempty"` // เช่น application/pdf, text/csv
	SourceType       string         `gorm:"size:50" json:"source_type,omitempty"` // pdf_statement, csv_export, manual
	Institution      string         `gorm:"size:100" json:"institution,omitempty"` // ชื่อสถาบันการเงิน/แอพที่นำเข้าข้อมูล
	ProcessingStatus string         `gorm:"size:20;default:pending" json:"processing_status"` // pending|processing|completed|failed
	TotalRecords     int            `gorm:"default:0" json:"total_records"` // จำนวนรายการทั้งหมดที่พยายามนำเข้า
	SuccessfulImports int           `gorm:"default:0" json:"successful_imports"` // จำนวนรายการที่นำเข้าได้สำเร็จ
	FailedImports    int            `gorm:"default:0" json:"failed_imports"` // จำนวนรายการที่นำเข้าไม่สำเร็จ
	ErrorLog         datatypes.JSON `gorm:"type:jsonb" json:"error_log,omitempty"`	// บันทึกข้อผิดพลาดในการนำเข้าเป็น JSONB
	ProcessedAt      *time.Time     `json:"processed_at,omitempty"` // เวลาที่ประมวลผลชุดการนำเข้าเสร็จ

	Transactions []Transaction `gorm:"foreignKey:ImportBatchID"`
	InvestmentTransactions []InvestmentTransaction `gorm:"foreignKey:ImportBatchID"`

}