package config

import (
	"fmt"
	"os"

	"github.com/jarntae/Financial-project/entity"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	// "time"
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
		&entity.User{},
		&entity.Role{},
	)

	// RoleAdmin := entity.Role{
	// 	RoleName:   "admin",
	// 	Permissions: map[string]interface{}{
	// 		"can_manage_users":   true,
	// 		"can_manage_roles":   true,
	// 		"can_view_reports":   true,
	// 		"can_edit_settings":  true,
	// 		"can_delete_records": true,
	// 	},
	// 	IsActive:   true,
	// }
	// RoleUser := entity.Role{
	// 	RoleName:   "user",
	// 	Permissions: map[string]interface{}{
	// 		"can_view_content": true,
	// 		"can_post_comments": true,
	// 		"can_edit_own_profile": true,
	// 		"can_delete_own_comments": true,
	// 		"can_like_content": true,
	// 	},
	// 	IsActive:   true,
	// }
	// db.Model(&entity.Role{}).Where("role_name = ?", "admin").FirstOrCreate(&RoleAdmin)
	// db.Model(&entity.Role{}).Where("role_name = ?", "user").FirstOrCreate(&RoleUser)
	fmt.Println("setup database")
}