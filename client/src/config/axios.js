import Axios from 'axios'

export default new Axios.create({ baseURL : 'http://localhost:3000' })
// export default new Axios.create({ baseURL : 'https://aya-cms.herokuapp.com/' })
