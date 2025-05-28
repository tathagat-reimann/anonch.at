package room

import (
	"encoding/json"
	"log"
)

func sendNewMessageToAllClients(room *Room) {
	for {
		message := <-room.Broadcast
		room.Mutex.Lock()
		for clientId, client := range room.Clients {
			clientConn := client.Conn
			err := clientConn.WriteJSON(message)
			if err != nil {
				log.Printf("Error sending message to %s: %v", client.Name, err)
				clientConn.Close()
				delete(room.Clients, clientId)
			}
		}
		room.Mutex.Unlock()
	}
}

func handleNewMessageFromClient(room *Room, newlyJoinedClient *Client) {
	defer func() {
		room.Mutex.Lock()
		delete(room.Clients, newlyJoinedClient.ID)
		room.Mutex.Unlock()
		newlyJoinedClient.Conn.Close()
		message := Message{
			Type:    "info",
			Sender:  "System",
			Content: newlyJoinedClient.Name + " has left the room.",
		}
		room.Broadcast <- message
		log.Printf("Client %s disconnected from room: %s", newlyJoinedClient.Name, room.ID)
	}()

	for {
		_, msg, err := newlyJoinedClient.Conn.ReadMessage()
		if err != nil {
			log.Printf("Error reading message from %s: %v", newlyJoinedClient.Name, err)
			break
		}

		// Parse the incoming message
		var incomingMessage string
		if err := json.Unmarshal(msg, &incomingMessage); err != nil {
			log.Printf("Error parsing message: %v", err)
			continue
		}

		// Handle regular chat messages
		message := Message{
			Type:    "chat",
			Sender:  newlyJoinedClient.Name,
			Content: incomingMessage,
		}

		room.Broadcast <- message
	}
}

func sendClientNameToItself(room *Room, newlyJoinedClient *Client) {
	room.Mutex.Lock()
	message := Message{
		Type:    "clientName",
		Sender:  "System",
		Content: newlyJoinedClient.Name,
	}

	clientConn := newlyJoinedClient.Conn
	if clientConn == nil {
		log.Printf("Nil websocket connection for client: %s", newlyJoinedClient.Name)
		delete(room.Clients, newlyJoinedClient.ID)
		return
	}
	if err := clientConn.WriteJSON(message); err != nil {
		log.Printf("Error sending client name to client: %v", err)
		clientConn.Close()
		delete(room.Clients, newlyJoinedClient.ID)
	}
	room.Mutex.Unlock()
}

func sendClientNameToOtherClients(room *Room, newlyJoinedClient *Client) {
	message := Message{
		Type:    "info",
		Sender:  "System",
		Content: newlyJoinedClient.Name + " has joined the room.",
	}

	room.Mutex.Lock()
	for clientId, client := range room.Clients {
		if clientId == newlyJoinedClient.ID {
			continue // Skip sending the message to the client itself
		}
		clientConn := client.Conn
		if clientConn == nil {
			log.Printf("Nil websocket connection for client: %s", client.Name)
			delete(room.Clients, clientId)
			continue
		}
		err := clientConn.WriteJSON(message)
		if err != nil {
			log.Printf("Error sending message to %s: %v", client.Name, err)
			clientConn.Close()
			delete(room.Clients, clientId)
		}
	}
	room.Mutex.Unlock()
}
