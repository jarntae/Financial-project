package services
import(
	"gorm.io/gorm"
	"github.com/jarntae/Financial-project/entity"
)
func GetTypeAccountService(db *gorm.DB, typeAccount entity.TypeAccount) (entity.TypeAccount, error) {
	var result entity.TypeAccount
	err := db.First(&result, typeAccount.ID).Error
	return result, err
}