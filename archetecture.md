# Server Archetecture

## High-Level Connection Flow
- Player provides client key in echange for identification code (POST /v1/player/auth [authorization: xxx])
- Player opens a WS connection using the given token for identification (WS /v1/player/ws [authorization: xxx])
- Player displays code so it can be entered in the Controller

- VRController provides identification code read from Player for requests (POST /v1/controller/auth [authorization: xxx])
- VRController opens a WS connection using the code for identification (WS /v1/controller/ws [authorization: xxx])
- VRController reads realtime Player status via WS
- VRController can read available catalog data via HTTP
- VRController can write to send commands to the Player via HTTP (uses Player WS connection)

## API Breakdown
    /v1
        /api
            /auth (HTTP)
                POST /player     -> Generate a token for display on the playback device
                POST /controller -> Take a token to confirm controller validity

            /library (HTTP)
                GET /           -> Return all video options in library (token required)

            /remote (HTTP)
                POST /play/:id  -> Play the selected video on the paired player (token required)
        /events
            :9080 (WS)
                CONN            -> Add pair session for pending remote connection (token required)
                /// list events the gateway will listen to here
        
            :9090 (WS)
                CONN            -> Update the pair session for remote connection (token required)
                /// list events the gateway will listen to here

