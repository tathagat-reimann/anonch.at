package room

import (
	"testing"

	"github.com/gorilla/websocket"
	"github.com/tathagat/anonch.at/conf"
)

func TestJoinRoom(t *testing.T) {
	t.Run("JoinRoom_Success", func(t *testing.T) {
		// Create a room
		roomID := CreateRoom()

		roomsMu.Lock()
		room := rooms[roomID]
		roomsMu.Unlock()

		// initially the room has no clients
		if len(room.Clients) != 0 {
			t.Errorf("Expected no clients in the room, but found %d", len(room.Clients))
		}

		// Call JoinRoom
		JoinRoom(roomID, nil)

		// Verify the client was added to the room
		roomsMu.Lock()
		room = rooms[roomID]
		roomsMu.Unlock()

		if len(room.Clients) != 1 {
			t.Errorf("Expected 1 client in the room, but found %d", len(room.Clients))
		}

		room.Mutex.Lock()
		for clientId, _ := range room.Clients {
			clientName := room.Clients[clientId].Name
			if clientName == "" {
				t.Errorf("Client name was not assigned")
			}
		}
		room.Mutex.Unlock()
	})

	t.Run("JoinRoom_RoomDoesNotExist", func(t *testing.T) {
		// Mock a WebSocket connection
		conn := &websocket.Conn{}

		// Call JoinRoom with a non-existent room ID
		JoinRoom("nonexistent-room-id", conn)

		// Verify no room was created
		roomsMu.Lock()
		_, exists := rooms["nonexistent-room-id"]
		roomsMu.Unlock()

		if exists {
			t.Errorf("Room with ID 'nonexistent-room-id' should not exist")
		}
	})

	t.Run("JoinRoom_RoomFull", func(t *testing.T) {
		// Set MaxRoomCapacity to 1 for testing
		conf.MaxRoomCapacity = 1

		// Create a room
		roomID := CreateRoom()

		// Add the first client to the room
		JoinRoom(roomID, nil)

		// Attempt to add the second client to the room
		JoinRoom(roomID, nil)

		// Verify the second client was not added
		roomsMu.Lock()
		room, exists := rooms[roomID]
		roomsMu.Unlock()

		if !exists {
			t.Fatalf("Room with ID %s does not exist", roomID)
		}

		if len(room.Clients) != 1 {
			t.Errorf("Expected 1 client in the room, but found %d", len(room.Clients))
		}
	})
}

func TestCreateRoom(t *testing.T) {
	t.Run("CreateRoom_Success", func(t *testing.T) {
		// Create a room
		roomID := CreateRoom()

		// Verify the room was created
		roomsMu.Lock()
		room, exists := rooms[roomID]
		roomsMu.Unlock()

		if !exists {
			t.Fatalf("Room with ID %s does not exist", roomID)
		}

		if room.ID != roomID {
			t.Errorf("Expected room ID to be %s, got %s", roomID, room.ID)
		}

		if room.Broadcast == nil {
			t.Errorf("Broadcast channel was not initialized")
		}

		if len(room.Clients) != 0 {
			t.Errorf("Expected no clients in the room, but found %d", len(room.Clients))
		}
	})
}

func TestCheckRoom(t *testing.T) {
	t.Run("CheckRoom_Success_Found", func(t *testing.T) {
		// Create a room
		roomID := CreateRoom()

		// Test
		exists, _, _ := CheckRoom(roomID)
		if !exists {
			t.Errorf("Expected room to exist, but it does not")
		}
	})
	t.Run("CheckRoom_Success_NotFound", func(t *testing.T) {
		// Create a room
		roomID := "fake-room-id"

		// Test
		exists, _, _ := CheckRoom(roomID)
		if exists {
			t.Errorf("Expected room to NOT exist, but it does ")
		}
	})
	t.Run("CheckRoom_Success_Full", func(t *testing.T) {
		// Set MaxRoomCapacity to 1 for testing
		conf.MaxRoomCapacity = 1
		// Create a room
		roomID := CreateRoom()
		// Mock a WebSocket connection
		conn := &websocket.Conn{}
		// Call JoinRoom
		JoinRoom(roomID, conn)

		// Test
		_, full, _ := CheckRoom(roomID)
		if !full {
			t.Errorf("Expected room to be full, but it is not")
		}
	})
}
