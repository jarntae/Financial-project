package middlewares

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

type Visitor struct {
	Timestamps []time.Time
}

var visitors = make(map[string]*Visitor)
var mu sync.Mutex

// RateLimit middleware
func RateLimit(duration time.Duration, maxRequests int) gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.ClientIP()
		now := time.Now()

		mu.Lock()
		visitor, exists := visitors[ip]
		if !exists {
			visitor = &Visitor{Timestamps: []time.Time{}}
			visitors[ip] = visitor
		}

		// ลบ request เก่าที่อยู่นอก window
		validTimestamps := []time.Time{}
		for _, t := range visitor.Timestamps {
			if now.Sub(t) < duration {
				validTimestamps = append(validTimestamps, t)
			}
		}
		visitor.Timestamps = validTimestamps

		if len(visitor.Timestamps) >= maxRequests {
			mu.Unlock()
			c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{
				"error": "ส่งคำขอมากเกินไป โปรดลองอีกครั้งในภายหลัง",
			})
			return
		}

		// บันทึก request ปัจจุบัน
		visitor.Timestamps = append(visitor.Timestamps, now)
		mu.Unlock()

		c.Next()
	}
}
