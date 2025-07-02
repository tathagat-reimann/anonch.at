package router

import (
	"log"
	"net/http"

	"github.com/go-chi/render"
	"github.com/gorilla/websocket"

	"github.com/go-chi/chi/v5"
	"github.com/tathagat/anonch.at/cloudflare"
	"github.com/tathagat/anonch.at/conf"
	"github.com/tathagat/anonch.at/room"
)

var (
	upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			origin := r.Header.Get("Origin")
			//log.Printf("Request to upgrade from Origin: %s", origin)
			return origin == conf.AllowedFrontendOrigin
		},
	}
)

func SetupRouter(r *chi.Mux) {
	r.Route("/api", func(r chi.Router) {
		r.Post("/rooms", CreateRoom)
		r.Get("/rooms/{id}/check", CheckRoom)
		r.Get("/rooms/{id}/join", JoinRoom)
	})
}

func CreateRoom(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	var req struct {
		TurnstileToken string `json:"cf-turnstile-response"`
	}

	if err := render.DecodeJSON(r.Body, &req); err != nil {
		log.Printf("Failed to decode JSON request: %v", err)
		http.Error(w, "Missing turnstile token", http.StatusBadRequest)
		return
	}

	if verified, err := cloudflare.VerifyToken(req.TurnstileToken); err != nil {
		log.Printf("Error verifying turnstile token: %v", err)
		http.Error(w, "Error verifying turnstile token", http.StatusInternalServerError)
		return
	} else if !verified {
		log.Println("Turnstile token not verified")
		http.Error(w, "Invalid turnstile token", http.StatusForbidden)
		return
	}

	// Create a new room and return the room ID
	roomID := room.CreateRoom()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	response := map[string]string{"room_id": roomID}

	render.JSON(w, r, response)
}

func CheckRoom(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	roomID := chi.URLParam(r, "id")
	exists, full, room := room.CheckRoom(roomID)

	if !exists {
		http.Error(w, "Room not found", http.StatusNotFound)
		return
	}

	if full {
		http.Error(w, "Room is full", http.StatusForbidden)
		return
	}

	response := map[string]string{"room_id": room.ID}
	render.JSON(w, r, response)
}

func JoinRoom(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	roomID := chi.URLParam(r, "id")
	exists, full, _ := room.CheckRoom(roomID)

	if !exists || full {
		// return error
		http.Error(w, "Failed to join room", http.StatusInternalServerError)
		return
	}

	// conn, err := websocketX.Upgrader.Upgrade(w, r, nil)
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Error upgrading WebSocket connection: %v", err)
		http.Error(w, "Failed to establish WebSocket connection", http.StatusInternalServerError)
		return
	}

	room.JoinRoom(roomID, conn)
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", conf.AllowedFrontendOrigin)
}
