import { StoreAdapter } from 'lib/pdf-annotate/PDFJSAnnotate'

import ApiClient from 'helpers/ApiClient'

const client = new ApiClient()
let ApiStoreAdapter = new StoreAdapter({
  getAnnotations(documentId, pageNumber) {
    return new Promise((resolve, reject) => {
      getAnnotations(documentId).then((data) => {

        let annotations = data.filter((i) => {
          return i.page === pageNumber
        })

        resolve({
          documentId,
          pageNumber,
          annotations
        })
      })
    })
  },

  addAnnotation(documentId, pageNumber, annotation) {
    return new Promise((resolve, reject) => {
      annotation.page = pageNumber

      client.post(`papers/${documentId}/annotations`, { data: { annotation: annotation }}).then((response) => {
        annotation.uuid = response.id
        resolve(annotation)
      })
    })
  },

  editAnnotation(documentId, annotationId, annotation) {
    return new Promise((resolve, reject) => {
      resolve(annotation)
    })
  },

  deleteAnnotation(documentId, annotationId) {
    return new Promise((resolve, reject) => {
      client.del(`papers/${documentId}/annotations/${annotationId}`).then(() => {
        resolve(true)
      })
    })
  },

  getComments(documentId, annotationId) {
    return client.get(`papers/${documentId}/annotations/${annotationId}/comments`)
  },

  addComment(documentId, annotationId, content) {
    return new Promise((resolve, reject) => {
      client.post(`papers/${documentId}/annotations/${annotationId}/comments`, { data: { content: content }}).then((response) => {
        resolve(response)
      })
    })
  },

  deleteComment(documentId, commentId) {
    return new Promise((resolve, reject) => {
      client.del(`papers/${documentId}/annotations/${annotationId}/comments/${commentId}`).then(() => {
        resolve(true)
      })
    })
  }
})

export default ApiStoreAdapter

function getAnnotations(documentId) {
  return new Promise((resolve, reject) => {
    client.get(`papers/${documentId}/annotations`).then((data) => {
      const annotations = data.map((i) => {
        i.annotation.uuid = i.id
        return i.annotation
      })

      resolve(annotations)
    })
  })
}
