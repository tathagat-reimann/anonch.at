package websocketX

import (
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/tathagat/anonch.at/conf"
)

var Upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return r.Host == conf.AllowedFrontendOrigin
	},
}
