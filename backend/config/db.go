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
		&entity.Account{},

		&entity.Budget{},
		&entity.BudgetCategory{},

		&entity.Currency{},

		&entity.Debt{},
		&entity.DebtPayment{},	

		&entity.ExpenseCategory{},

		&entity.PaymentMethod{},

		&entity.RecurringRuleExpense{},

		&entity.Role{},

		&entity.SubExpenseCategory{},

		&entity.Transaction{},
		&entity.TransactionType{},
		&entity.TypeAccount{},

		&entity.UserSession{},
		&entity.User{},	
	)

	// สร้าง role เริ่มต้นถ้ายังไม่มี
	permissionsAdmin, _ := json.Marshal(map[string]bool{
		"manage_categories": true,
		"manage_settings":   true,
		"manage_own_data":   true,
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
		"manage_budgets":    true,
		"manage_debts":      true,
		"manage_reports":    true,
		"manage_accounts":   true,
		"manage_transactions": true,
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

	TransactionType := entity.TransactionType{
		Name: "expense",
		Description: "รายจ่าย",
	}
	db.FirstOrCreate(&TransactionType, entity.TransactionType{Name: "expense"})
	TransactionTypeIncome := entity.TransactionType{
		Name: "income",
		Description: "รายรับ",
	}
	db.FirstOrCreate(&TransactionTypeIncome, entity.TransactionType{Name: "income"})
	TransactionTypeTransfer := entity.TransactionType{
		Name: "transfer",
		Description: "โอนเงิน",
	}
	db.FirstOrCreate(&TransactionTypeTransfer, entity.TransactionType{Name: "transfer"})

	PaymentMethodCash := entity.PaymentMethod{
		Name: "cash",
		Description: "เงินสด",
	}
	db.FirstOrCreate(&PaymentMethodCash, entity.PaymentMethod{Name: "cash"})
	PaymentMethodCreditCard := entity.PaymentMethod{
		Name: "credit_card",
		Description: "บัตรเครดิต",
	}
	db.FirstOrCreate(&PaymentMethodCreditCard, entity.PaymentMethod{Name: "credit_card"})
	PaymentMethodDebitCard := entity.PaymentMethod{
		Name: "debit_card",
		Description: "บัตรเดบิต",
	}
	db.FirstOrCreate(&PaymentMethodDebitCard, entity.PaymentMethod{Name: "debit_card"})
	PaymentMethodBankTransfer := entity.PaymentMethod{
		Name: "bank_transfer",
		Description: "โอนผ่านธนาคาร",
	}
	db.FirstOrCreate(&PaymentMethodBankTransfer, entity.PaymentMethod{Name: "bank_transfer"})
	PaymentMethodMobilePayment := entity.PaymentMethod{
		Name: "mobile_payment",
		Description: "ชำระผ่านมือถือ",
	}
	db.FirstOrCreate(&PaymentMethodMobilePayment, entity.PaymentMethod{Name: "mobile_payment"})
	PaymentMethodOther := entity.PaymentMethod{
		Name: "other",
		Description: "อื่นๆ",
	}
	db.FirstOrCreate(&PaymentMethodOther, entity.PaymentMethod{Name: "other"})

	expenseCategory := entity.ExpenseCategory{
		Name: "General",
		Description: "ค่าใช้จ่ายทั่วไป",
		TransactionTypeID: TransactionType.ID,
	}
	db.FirstOrCreate(&expenseCategory, entity.ExpenseCategory{Name: "General", TransactionTypeID: TransactionType.ID})
	expenseCategoryIncome := entity.ExpenseCategory{
		Name: "Salary",
		Description: "เงินเดือน",
		TransactionTypeID: TransactionTypeIncome.ID,
	}
	db.FirstOrCreate(&expenseCategoryIncome, entity.ExpenseCategory{Name: "Salary", TransactionTypeID: TransactionTypeIncome.ID})
	expenseCategoryIncome2 := entity.ExpenseCategory{
		Name: "Business",
		Description: "ธุรกิจ",
		TransactionTypeID: TransactionTypeIncome.ID,
	}
	db.FirstOrCreate(&expenseCategoryIncome2, entity.ExpenseCategory{Name: "Business", TransactionTypeID: TransactionTypeIncome.ID})
	expenseCategoryIncome3 := entity.ExpenseCategory{
		Name: "Gift",
		Description: "โอนให้",
		TransactionTypeID: TransactionTypeIncome.ID,
	}
	db.FirstOrCreate(&expenseCategoryIncome3, entity.ExpenseCategory{Name: "Gift", TransactionTypeID: TransactionTypeIncome.ID})
	expenseCategoryIncome4 := entity.ExpenseCategory{
		Name: "Other Income",
		Description: "รายรับอื่นๆ",
		TransactionTypeID: TransactionTypeIncome.ID,
	}
	db.FirstOrCreate(&expenseCategoryIncome4, entity.ExpenseCategory{Name: "Other Income", TransactionTypeID: TransactionTypeIncome.ID})
	expenseCategoryOther := entity.ExpenseCategory{
		Name: "Other",
		Description: "ค่าใช้จ่ายอื่นๆ",
		TransactionTypeID: TransactionType.ID,
	}
	db.FirstOrCreate(&expenseCategoryOther, entity.ExpenseCategory{Name: "Other", TransactionTypeID: TransactionType.ID})
	// หมวดหมู่ย่อย
	subCategoryFood := entity.SubExpenseCategory{
		Name: "Food",
		Description: "อาหารและเครื่องดื่ม",
		ExpenseCategoryID: expenseCategory.ID,
	}
	db.FirstOrCreate(&subCategoryFood, entity.SubExpenseCategory{Name: "Food", ExpenseCategoryID: expenseCategory.ID})
	subCategoryTransport := entity.SubExpenseCategory{
		Name: "Transport",
		Description: "การเดินทาง",
		ExpenseCategoryID: expenseCategory.ID,
	}
	db.FirstOrCreate(&subCategoryTransport, entity.SubExpenseCategory{Name: "Transport", ExpenseCategoryID: expenseCategory.ID})
	subCategoryShopping := entity.SubExpenseCategory{
		Name: "Shopping",
		Description: "ช้อปปิ้ง",
		ExpenseCategoryID: expenseCategory.ID,
	}
	db.FirstOrCreate(&subCategoryShopping, entity.SubExpenseCategory{Name: "Shopping", ExpenseCategoryID: expenseCategory.ID})
	subCategoryEntertainment := entity.SubExpenseCategory{
		Name: "Entertainment",
		Description: "ความบันเทิง",
		ExpenseCategoryID: expenseCategory.ID,
	}
	db.FirstOrCreate(&subCategoryEntertainment, entity.SubExpenseCategory{Name: "Entertainment", ExpenseCategoryID: expenseCategory.ID})
	subCategoryHealth := entity.SubExpenseCategory{
		Name: "Health",
		Description: "สุขภาพ",
		ExpenseCategoryID: expenseCategory.ID,
	}
	db.FirstOrCreate(&subCategoryHealth, entity.SubExpenseCategory{Name: "Health", ExpenseCategoryID: expenseCategory.ID})
	subCategoryUtilities := entity.SubExpenseCategory{
		Name: "Utilities",
		Description: "ค่าสาธารณูปโภค",
		ExpenseCategoryID: expenseCategory.ID,
	}
	db.FirstOrCreate(&subCategoryUtilities, entity.SubExpenseCategory{Name: "Utilities", ExpenseCategoryID: expenseCategory.ID})
	subCategoryEducation := entity.SubExpenseCategory{
		Name: "Education",
		Description: "การศึกษา",
		ExpenseCategoryID: expenseCategory.ID,
	}
	db.FirstOrCreate(&subCategoryEducation, entity.SubExpenseCategory{Name: "Education", ExpenseCategoryID: expenseCategory.ID})
	subCategoryTravel := entity.SubExpenseCategory{
		Name: "Travel",
		Description: "การท่องเที่ยว",
		ExpenseCategoryID: expenseCategory.ID,
	}
	db.FirstOrCreate(&subCategoryTravel, entity.SubExpenseCategory{Name: "Travel", ExpenseCategoryID: expenseCategory.ID})



	fmt.Println("setup database")
}