import Vue from 'vue'
import axios from 'axios'

const SERVER = "http://127.0.0.1:9000";

const server = axios.create({
  baseURL: SERVER,
})

export {
  server
}

Vue.prototype.$http = axios