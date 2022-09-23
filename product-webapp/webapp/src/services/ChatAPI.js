import axios from "axios";

// const baseUrl = 'http://localhost:8080/chat-service';
//const baseUrl = 'http://13.235.16.107:8080/chat-service';

const routeUrl = window.location.href
const url = routeUrl.slice(0,-6)
var ip = url.split('/')[2].split(':')[0];
const baseUrl = "http://"+ ip + ':8080/chat-service';
console.log("RouteUrl > ",routeUrl)
console.log("IP > ",ip)
console.log(" Baseurl> ",baseUrl)

export const getUsers = () => {
    var data = {
        isSuccess: false,
        data:'',
    };

    var type = localStorage.getItem("MyType") && localStorage.getItem("MyType") === 'vendor' ? 'clients' : 'vendors';
    var emailId = JSON.parse(localStorage.getItem("MyProfile")).emailId;
    
   return axios.get(`${baseUrl}/api/v3/${type}/${emailId}`)
    .then( (response) => {
        data.isSuccess = true;
        data.data = response.data;
        return data
    } )
    .catch(err => {
        data.isSuccess = false;
        data.data = err;
        return data
    })

}

export const getAllMessages = (emailId) => {
    var data = {
        isSuccess: false,
        data:'',
    };
    var type = localStorage.getItem("MyType");
    var clientId = "";
    var vendorId = '';
    if(type === 'client') {
        clientId = JSON.parse(localStorage.getItem("MyProfile")).emailId;
        vendorId = emailId;
    }
    else {
        vendorId = JSON.parse(localStorage.getItem("MyProfile")).emailId;
        clientId = emailId;
    }

    return axios.get(`${baseUrl}/api/v3/getMessages/${clientId}/${vendorId}`)
    .then( (response) => {
        data.isSuccess = true;
        data.data = response.data;
        return data
    } )
    .catch(err => {
        data.isSuccess = false;
        data.data = err;
        return data
    })

}

export const sentNewMessage = (chatData) => {
    var data = {
        isSuccess: false,
        data:'',
    };

    return axios.post(`${baseUrl}/api/v3/chat1`, chatData)
    .then( (response) => {
        data.isSuccess = true;
        data.data = response.data;
        return data
    } )
    .catch(err => {
        data.isSuccess = false;
        data.data = err;
        return data
    })
}
