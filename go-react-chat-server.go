package main

import (
  "fmt"
	"net/http"
  "github.com/gorilla/websocket"
	"log"
)

type Message struct {
  Username string `json:"username"`
  Message string `json:"message"`
  connID *websocket.Conn
}

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan Message)
var upgrader = websocket.Upgrader{}

func main() {
  // Server static site
  fs := http.FileServer(http.Dir("build"))
  http.Handle("/", fs)

  // Get ready for the connections
  http.HandleFunc("/ws", handleConnections)
  go handleMessages()

  fmt.Println("Starting... port 3001")
  err := http.ListenAndServe(":3001", nil)
  if err != nil {
    log.Printf("error running server - %v", err)
  }
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
  // upgrade Request
  ws, err := upgrader.Upgrade(w, r, nil)

  if err != nil {
    log.Fatal(err)
  }

  defer ws.Close()

  log.Println("New client connected")
  clients[ws] = true

  for {
    var msg Message

    err := ws.ReadJSON(&msg)
    if err != nil {
      log.Printf("Error: %v", err)
      delete(clients, ws)
      break;
    }

    // add the owner
    msg.connID = ws

    // Send the new message
    broadcast <- msg
  }
}

func handleMessages() {
  for {
    // get the data from the broadcast channel
    msg := <-broadcast

    // Pass it forward to everybody else
    for client := range clients {

      if client != msg.connID {
        err := client.WriteJSON(msg)
        if err != nil {
          log.Printf("Error in handleMessages: %v", err)
          client.Close()
          delete(clients, client)
        }
      }
    }
  }
}