package room

import (
	"log"
	"math/rand"
	"slices"
	"strings"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/tathagat/anonch.at/conf"
)

type Room struct {
	ID        string
	Clients   map[string]*Client // Map client ID to Client struct
	Broadcast chan Message
	Mutex     sync.Mutex
	CreatedAt string
}

type Message struct {
	//Timestamp string `json:"timestamp"` // Timestamp of the message
	Type    string `json:"type"`    // Type of the message (e.g., "chat", "clientName", "info")
	Sender  string `json:"sender"`  // Name of the sender
	Content string `json:"content"` // Message content
}

type Client struct {
	ID   string
	Name string
	Conn *websocket.Conn
	// You can add more fields if needed, e.g., JoinedAt time.Time
}

var (
	rooms   = make(map[string]*Room)
	roomsMu sync.Mutex
)

func getRandomName() string {
	return conf.RandomNames[rand.Intn(len(conf.RandomNames))]
}

func getNewClientName(usedNames []string) string {
	clientName := getRandomName() // Assign a random name to the client

	if slices.Contains(usedNames, clientName) {
		// If the name is already used, generate a new one
		clientName = getNewClientName(usedNames)
	}

	return clientName
}

func CreateRoom() string {
	roomID := getNewUUID()
	roomsMu.Lock()
	defer roomsMu.Unlock()

	rooms[roomID] = &Room{
		ID:        roomID,
		Clients:   make(map[string]*Client),
		Broadcast: make(chan Message),
		CreatedAt: time.Now().Format("2006-01-02 15:04:05"), // Format timestamp
	}

	go sendNewMessageToAllClients(rooms[roomID])

	log.Printf("Room created: %s at %s", roomID, rooms[roomID].CreatedAt)

	return roomID
}

func getNewUUID() string {
	roomID := uuid.New().String()
	roomID = strings.ReplaceAll(roomID, "-", "") // Remove dashes from the roomID
	return roomID
}

func CheckRoom(roomID string) (bool, bool, *Room) {
	log.Printf("Request to check room: %s", roomID)
	roomsMu.Lock()
	room, exists := rooms[roomID]
	roomsMu.Unlock()
	full := false

	if exists {
		if len(room.Clients) >= conf.MaxRoomCapacity {
			full = true
		}
	}

	return exists, full, room
}

func JoinRoom(roomID string, conn *websocket.Conn) {
	log.Printf("Request to join room: %s", roomID)
	exists, full, room := CheckRoom(roomID)

	if !exists || full {
		// return error
		log.Printf("Room not found or full: %s", roomID)
		return
	}

	// Extract the list of used names from the room's Clients map
	room.Mutex.Lock()
	usedNames := make([]string, 0, len(room.Clients))
	for _, client := range room.Clients {
		usedNames = append(usedNames, client.Name)
	}
	room.Mutex.Unlock()

	// Assign a unique name to the client
	clientName := getNewClientName(usedNames)
	clientId := getNewUUID()

	// Add the client to the room
	room.Mutex.Lock()
	room.Clients[clientId] = &Client{ID: clientId, Name: clientName, Conn: conn}
	room.Mutex.Unlock()

	log.Printf("Client %s joined room: %s", clientName, roomID)
	newlyJoinedClient := room.Clients[clientId]
	go sendClientNameToItself(room, newlyJoinedClient)
	go sendClientNameToOtherClients(room, newlyJoinedClient)
	go handleNewMessageFromClient(room, newlyJoinedClient)
}
