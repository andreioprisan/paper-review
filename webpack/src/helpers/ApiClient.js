import superagent from 'superagent'
import config from '../config'

const methods = ['get', 'post', 'put', 'patch', 'del']

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath
}

export default class ApiClient {
  constructor(req) {
    methods.forEach(method =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path))

        if (params) {
          request.query(params)
        }

        if (data) {
          request.send(data)
        }

        request.end((err, { body, statusCode } = {}) => {
          if (body) {
            body.statusCode = statusCode
          }
          return err ? reject(body || err) : resolve(body)
        })
      }))
  }
  empty() {}
}
