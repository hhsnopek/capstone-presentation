package middleware

import (
	"encoding/json"
	"errors"
	"github.com/carrot/carrot-admin-permissions-api/models"
	"github.com/carrot/carrot-admin-permissions-api/utils"
	"github.com/labstack/echo"
	"log"
	"net/http"
	"strings"
)

// RequestBody - holds GoogleAuthToken
type RequestBody struct {
	GoogleOAuthTokenID string `json:"GoogleOAuthTokenID"`
}

/*
GoogleAuthMiddleware - Custom Google Auth Middleware
Middleware Structure from:
//github.com/labstack/echo/blob/master/middleware/auth.go

	For vaild creditentials, it returns nil
	For invalid Authorization header, it sends "400 - Bad Request" response.
	For invalid credentials, it sends "401 - Unauthorized" response.
*/
func GoogleAuthMiddleware() echo.HandlerFunc {
	return func(c *echo.Context) error {
		request := c.Request()
		contentType := request.Header.Get(echo.ContentType)
		badRequest := echo.NewHTTPError(http.StatusBadRequest)
		unauthorized := echo.NewHTTPError(http.StatusUnauthorized)

		// Verify Content-Type is `application/json`
		if strings.EqualFold(contentType, echo.ApplicationJSON) {
			origin := request.Header.Get("Origin")
			app, err := ParseAppName(origin)
			if err != nil {
				log.Printf("Error: %s", err)
				log.Printf("Origin(len(%d)): %s", len(origin), origin)
				return unauthorized // Unauthorized App
			}

			// Decode JSON GoogleOAuthTokenID
			decoder := json.NewDecoder(request.Body)
			var body RequestBody
			decoderErr := decoder.Decode(&body)
			if decoderErr != nil {
				log.Printf("Error: Bad Request")
				return badRequest
			}

			if AuthGoogleToken(body.GoogleOAuthTokenID, app) {
				return nil // Success
			}

			log.Printf("Error: Bad Token")
			return unauthorized // Unauthorized User
		}

		log.Printf("Error: Content-type Mismatch")
		return badRequest // Bad Request
	}
}

// ParseAppName - Returns app name based on origin
// returns subdomain from http://subdomain.example.com/foo/bar
func ParseAppName(originURL string) (string, error) {
	urlArr := strings.Split(originURL, ":")
	if len(urlArr) > 1 {
		// splits //subdomain.example.com/foo/bar by `.`
		// removes all `/` to left of //subdomain
		// removes any spaces
		return strings.TrimSpace(strings.TrimLeft(strings.Split(urlArr[1], ".")[0], "/")), nil
	}

	return "", errors.New("originURL does not match")
}

// AuthGoogleToken - Checks if GoogleUser has access to an app
func AuthGoogleToken(token string, app string) bool {
	jwt, err := utils.GetGoogleAuthJwtToken(token)
	if err != nil {
		log.Printf("Error: Unable to decode token: %s", err)
		return false
	}

	email := jwt.Claims["email"].(string)
	user := models.User{}
	user.Load(email)

	if user.HasAccess(app) {
		return true
	}

	return false
}
