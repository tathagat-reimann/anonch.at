package conf

import (
	"log"
	"os"
	"strconv"
	"time"
)

var (
	//AllowedHost     string
	MaxRoomCapacity              int
	RandomNames                  = []string{"Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"}
	AllowedFrontendOrigin        = "http://localhost:3000"
	Requests                     int
	Duration                     time.Duration
	CloudFlareTurnstileSecretKey = "1x0000000000000000000000000000000AA"
)

func init() {
	LoadConfig()
}

func LoadConfig() {
	// Initialize AllowedHost
	// AllowedHost = os.Getenv("ALLOWED_HOST")
	// if AllowedHost == "" {
	// 	AllowedHost = "localhost:8080" // Default to localhost if ALLOWED_HOST is not set
	// }
	// log.Printf("AllowedHost for Websocket: %s", AllowedHost)

	// Initialize MaxRoomCapacity
	MaxRoomCapacity = 2 // Default value
	capacity := os.Getenv("ANONCHAT_MAX_ROOM_CAPACITY")
	if capacity != "" {
		value, err := strconv.Atoi(capacity)
		if err == nil {
			MaxRoomCapacity = value
		}
	}
	log.Printf("MaxRoomCapacity: %d", MaxRoomCapacity)

	allowedFrontEndOrigin := os.Getenv("ANONCHAT_ALLOWED_FRONTEND_ORIGIN")
	if allowedFrontEndOrigin != "" {
		AllowedFrontendOrigin = allowedFrontEndOrigin
	}
	log.Printf("AllowedFrontendOrigin: %s", AllowedFrontendOrigin)

	// Ensure RandomNames length is sufficient
	if len(RandomNames) < MaxRoomCapacity {
		log.Fatalf("RandomNames length (%d) must be greater than or equal to MaxRoomCapacity (%d)", len(RandomNames), MaxRoomCapacity)
	}

	Requests = 10 // Default value
	// Load Requests from environment variable
	requests := os.Getenv("ANONCHAT_REQUESTS")
	if requests != "" {
		value, err := strconv.Atoi(requests)
		if err == nil {
			Requests = value
		}
	}
	log.Printf("Requests: %d", Requests)
	Duration = 10 * time.Second // Default value
	duration := os.Getenv("ANONCHAT_DURATION")
	if duration != "" {
		value, err := strconv.Atoi(duration)
		if err == nil {
			Duration = time.Duration(value) * time.Second
		}
	}
	log.Printf("Duration: %s", Duration)

	cloudFlareTurnstileSiteKey := os.Getenv("ANONCHAT_CLOUDFLARE_TURNSTILE_SECRET_KEY")
	if cloudFlareTurnstileSiteKey != "" {
		CloudFlareTurnstileSecretKey = cloudFlareTurnstileSiteKey
	}
	log.Printf("CloudFlareTurnstileSecretKey: %s", CloudFlareTurnstileSecretKey)
}
