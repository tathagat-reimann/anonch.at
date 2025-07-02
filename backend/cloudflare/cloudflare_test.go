package cloudflare

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/tathagat/anonch.at/conf"

	"os"
)

func TestVerifyToken_TestKey_Success(t *testing.T) {
	// because we use the test token from Cloudflare
	// https://developers.cloudflare.com/turnstile/troubleshooting/testing/
	// we can pass any dummy token and it should pass
	verificationResult, _ := VerifyToken("asdf")

	assert.Equal(t, true, verificationResult)
}

func TestVerifyToken_RealKey_Failure(t *testing.T) {
	cloudFlareTurnstileSecretKey := os.Getenv("ANONCHAT_CLOUDFLARE_TURNSTILE_SECRET_KEY")

	// Restore environment variables after tests
	defer func() {
		os.Setenv("ANONCHAT_CLOUDFLARE_TURNSTILE_SECRET_KEY", cloudFlareTurnstileSecretKey)
	}()

	// because we use the real key, the dummy token should fail
	os.Setenv("ANONCHAT_CLOUDFLARE_TURNSTILE_SECRET_KEY", "0x4AAAAAABBAkFGPmR3VOj9LmjmRefNeMQ4")
	conf.LoadConfig()
	verificationResult, err := VerifyToken("asdf")

	assert.NoError(t, err)
	assert.Equal(t, false, verificationResult)
}
