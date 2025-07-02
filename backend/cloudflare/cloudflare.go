package cloudflare

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"

	"github.com/tathagat/anonch.at/conf"
)

type CloudflareVerificationRequestData struct {
	Secret         string `json:"secret"`
	Response       string `json:"response"`
	IdempotencyKey string `json:"idempotency_key"`
}

type CloudflareVerificationResponseData struct {
	Success bool `json:"success"`
}

var httpClient = &http.Client{}

func VerifyToken(token string) (bool, error) {
	url := "https://challenges.cloudflare.com/turnstile/v0/siteverify"

	// create the JSON payload
	cloudflareVerificationRequestData := CloudflareVerificationRequestData{
		Secret:         conf.CloudFlareTurnstileSecretKey,
		Response:       token,
		IdempotencyKey: "idempotency_key", // This can be any unique string, used to prevent duplicate requests
	}
	marshalled, err := json.Marshal(cloudflareVerificationRequestData)
	if err != nil {
		log.Printf("Error marshalling CloudflareVerificationRequestData: %s", err)
		return false, err
	}

	// create the request
	req, err := http.NewRequest("POST", url, bytes.NewReader(marshalled))
	if err != nil {
		log.Printf("Error creating new Cloudflare verification request: %s", err)
		return false, err
	}
	req.Header.Set("Content-Type", "application/json")

	// send the request
	resp, err := httpClient.Do(req)
	if err != nil {
		log.Printf("Error calling Cloudflare verification API: %s", err)
		return false, err
	}
	defer resp.Body.Close()

	decoder := json.NewDecoder(resp.Body)
	var cloudflareVerificationResponseData CloudflareVerificationResponseData
	err = decoder.Decode(&cloudflareVerificationResponseData)
	if err != nil {
		log.Printf("Error decoding Cloudflare verification API response: %s", err)
		return false, err
	}

	return cloudflareVerificationResponseData.Success, nil
}
