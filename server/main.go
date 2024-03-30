package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/rs/cors"
	qrcode "github.com/skip2/go-qrcode"
)

func handleRequest(writer http.ResponseWriter, request *http.Request) {

	writer.Header().Set("Access-Control-Allow-Origin", "*")
	writer.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if request.Method == "OPTIONS" {
		writer.WriteHeader(http.StatusOK)
		return
	}

	url := request.FormValue("url")

	if url == "" {
		http.Error(writer, "URL is missing", http.StatusBadRequest)
		return
	}

	qrCode, err := qrcode.Encode(url, qrcode.Medium, 256)
	if err != nil {
		http.Error(writer, fmt.Sprintf("Failed to generate QR: %v", err), http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "image/png")
	if _, err := writer.Write(qrCode); err != nil {
		log.Printf("Failed to write QR code: %v", err)
	}

}

func main() {

	c := cors.Default()

	http.HandleFunc("/generate", handleRequest)
	handler := c.Handler(http.DefaultServeMux)
	http.ListenAndServe(":3030", handler)
}
