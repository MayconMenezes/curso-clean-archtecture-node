import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

export const createdStatus = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const okStatus = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const deletedStatus = (data: any): HttpResponse => ({
  statusCode: 204,
  body: data
})
