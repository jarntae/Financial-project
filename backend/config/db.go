package config

import (
	"fmt"
	"os"
	"time"
	"encoding/json"
	"github.com/jarntae/Financial-project/entity"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	// ดึงค่าจาก environment variables
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	sslmode := os.Getenv("DB_SSLMODE") // usually "disable" for local

	// สร้าง DSN สำหรับ Postgres
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		host, port, user, password, dbname, sslmode,
	)

	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database: " + err.Error())
	}

	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {
	db.AutoMigrate(
		&entity.Role{},
		&entity.User{},
		&entity.UserSession{},
		&entity.Category{},
		&entity.UserCategory{},
		&entity.Account{},
		&entity.Portfolio{},
		&entity.Transaction{},
		&entity.RecurringRule{},
		&entity.Holding{},
		&entity.InvestmentTransaction{},
		&entity.ImportBatch{},
		&entity.ImportRecord{},
		&entity.ActivityLog{},
		&entity.DataChange{},
		&entity.SystemSetting{},
		&entity.UserPreference{},
		&entity.ExchangeRate{},
	)

	// สร้าง role เริ่มต้นถ้ายังไม่มี
	permissionsAdmin, _ := json.Marshal(map[string]bool{
		"manage_users":      true,
		"manage_categories": true,
		"manage_accounts":   true,
		"manage_settings":   true,
	})
	RoleAdmin := entity.Role{ 
		RoleName: "admin",
		Permissions: permissionsAdmin,
		IsActive:  true,
	}
	db.FirstOrCreate(&RoleAdmin, entity.Role{RoleName: "admin"})
	permissionsUser, _ := json.Marshal(map[string]bool{
		"manage_own_data": true,
		"manage_categories": true,
	})
	RoleUser := entity.Role{
		RoleName: "user",
		Permissions: permissionsUser,
		IsActive:  true,
	}
	db.FirstOrCreate(&RoleUser, entity.Role{RoleName: "user"})

	// สร้าง user admin เริ่มต้นถ้ายังไม่มี
	password, _ := HashPassword("123456")
	UsesAdmin := entity.User{
		FirstName: "Admin",
		LastName:  "User",
		Email:    "dev@gmail.com",
		Password: password,
		IsActive:  true,
		EmailVerified: true,
		LastLogin: time.Now(),
		RoleID:   RoleAdmin.ID,
	}
	db.FirstOrCreate(&UsesAdmin, entity.User{Email: "dev@gmail.com"})

	currency := entity.Currency{
		Code:     "THB",
		Name:     "Thai Baht",
		Symbol:   "฿",
	}
	db.FirstOrCreate(&currency, entity.Currency{Code: "THB"})
	currencyUSD := entity.Currency{
		Code:     "USD",
		Name:     "US Dollar",
		Symbol:   "$",
	}
	db.FirstOrCreate(&currencyUSD, entity.Currency{Code: "USD"})
	currencyEUR := entity.Currency{
		Code:     "EUR",
		Name:     "Euro",
		Symbol:   "€",
	}
	db.FirstOrCreate(&currencyEUR, entity.Currency{Code: "EUR"})
	typeAccountBank := entity.TypeAccount{
		Name: "bank",
		Description: "บัญชีธนาคาร",
	}
	db.FirstOrCreate(&typeAccountBank, entity.TypeAccount{Name: "bank"})
	typeAccountCreditCard := entity.TypeAccount{
		Name: "credit_card",
		Description: "บัตรเครดิต",
	}
	db.FirstOrCreate(&typeAccountCreditCard, entity.TypeAccount{Name: "credit_card"})
	typeAccountWallet := entity.TypeAccount{
		Name: "wallet",
		Description: "กระเป๋าเงินสด",
	}
	db.FirstOrCreate(&typeAccountWallet, entity.TypeAccount{Name: "wallet"})
	
	
	fmt.Println("setup database")
}