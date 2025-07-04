package main

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/httprate"
	"github.com/tathagat/anonch.at/conf"
	"github.com/tathagat/anonch.at/router"
)

func main() {
	r := chi.NewRouter()

	// use middlewares
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(httprate.Limit(
		conf.Requests, // requests
		conf.Duration, // per duration
		httprate.WithKeyFuncs(httprate.KeyByIP, httprate.KeyByEndpoint),
	))

	router.SetupRouter(r)

	log.Println("Server running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
