//Options
const CLIENT_ID = '1083450772707-0k8j8iq4c33drs69t8heiqh95shgsaoj.apps.googleusercontent.com';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];

//Authorization scope required by the API. If using multiple scopes, seperated them with spaces
const SCOPES = "https://www.googleapis.com/auth/youtube.readonly";

const authorizeButton = documemt.getElementById('authorize-Button');
const signoutButton =  document.getElementById('signout-button');
const content = document.getElementById('content');
const channelForm = document.getElementById('channel-form');
const channelInput = document.getElementById('channel-input');
const videoContainer = document.getElementById('video-container');

const defaultChannel = 'thenewobject';
//Load API library
function handleClientLoad(){
    gapi.load('client:auth2', initClient);
}

//Init API client library and setup sign in listeners
function initClient(){
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(() =>{
        //Listen for sign in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignStatus);
        //Handle initial sign in state
        updateSignStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick= handleSignoutClick;
    });
}

//update UI signin state changes
function updateSignStatus(isSignedIn){
    if(isSignedIn){
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        content.style.display = 'block';
        videoContainer.style.block = 'block';
        getChannel(defaultChannel);
    }else{
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        content.style.display = 'none';
        videoContainer.style.block = 'none';

    }
}

//Handle login
function handleAuthClick(){
    gapi.auth2.getAuthInstance().signIn();
}

//Handle logout
function handleSignoutClick(){
    gapi.auth2.getAuthInstance().signIn();
}

//Get channel from API
function getChannel(channel){
    console.log(channel)
}