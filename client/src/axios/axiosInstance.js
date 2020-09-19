import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://cms-hacktiv8.herokuapp.com'
})

export default instance

/**
 * npm i -g firebase-tools
 * ke folder client
 * jalanin firebase login
 * firebase init
 * pilih hosting arahin pake arah panah abis itu kasih space sebelum teken enter
 * pilih pake use existing project
 * pilih project
 * ketik pilih folder dist
 * iya mau bikin folder spa
 * ditanya pengen overwrite file index jawabnya jangan kata eas
 */
