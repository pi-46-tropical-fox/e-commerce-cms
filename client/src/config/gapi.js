// import the plugin
import VueGAPI from 'vue-gapi'

// create the 'options' object
const apiConfig = {
    apiKey: 'AIzaSyCs8E4pjOro23_s2LhBLZQ3dvgWTAQ2HdQ',
    clientId: '58820793100-hl9qi1d8gfrv4sm8c7i1ohc7jd21ts74.apps.googleusercontent.com',
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
    scope: 'https://www.googleapis.com/auth/spreadsheets',

    // works only with `ux_mode: "prompt"`
    refreshToken: true,
}

export default { gapi: VueGAPI, config: apiConfig }