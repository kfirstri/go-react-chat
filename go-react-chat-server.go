package main

import (
  "fmt"
	"net/http"
)

func main() {
  fs := http.FileServer(http.Dir("build"))
  http.Handle("/", fs)

  fmt.Println("Starting...")
  http.ListenAndServe(":3000", nil)
}