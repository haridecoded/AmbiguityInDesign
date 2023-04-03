## AmbiguityInDesign

### Running the app locally

1. Join the AmbiguityInDesign Miro Developer Team using the [invite link](https://miro.com/welcome/WGZ4RE5KSFhrbktRaWhIRDJhZDQ1cUR4OEppVERXMUxRVDl6cXpNYks2ekdXRFRrbmw1N1hTTkNJR0tLY0VwQ3wzNDU4NzY0NTM3ODY2NDk0ODA4fDM=?share_link_id=279314084218)

2. Create a `.env` file in the root with the following variables and update the `value ` with relevant information:

```
MIRO_CLIENT_ID="value"
MIRO_CLIENT_SECRET="value"
MIRO_REDIRECT_URL="http://localhost:3000/api/redirect"
OPENAI_API_KEY="value"
```

3. Run `npm start` to start developing.

When your server is up and running:

- Go to [Miro.com](https://miro.com).
- In your developer team, open a board.
- To start your app, click the app icon in the app toolbar on the left.
