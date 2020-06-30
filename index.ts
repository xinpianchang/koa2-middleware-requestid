import { v4 } from 'uuid'
import { ObjectID } from 'bson'
import { Middleware } from 'koa'

const TYPE_UUID = 'uuid'
const TYPE_OBJECT_ID = 'object-id'

type TypeEnum = 'uuid' | 'object-id'

Object.assign(requestId, {
  TYPE_UUID,
  TYPE_OBJECT_ID,
  generateID,
});

function generateID(type: TypeEnum) {
  switch (type) {
    case TYPE_UUID:
      return v4()
    case TYPE_OBJECT_ID:
      return new ObjectID().toHexString()
    default:
      return v4()
  }
}

interface Options {
  header?: string
  property?: string
  type?: TypeEnum
}

function requestId(options: Options = {}): Middleware {
  const {
    header = 'X-Request-ID',
    property = 'id',
    type = TYPE_OBJECT_ID,
  } = options

  return async (ctx, next) => {
    const reqId = ctx.get(header) || generateID(type)
    ctx.set(header, reqId)

    const propertyDesc = {
      get: () => reqId
    }

    // default ctx.req.id
    Object.defineProperty(ctx.req, property, propertyDesc)
    // default ctx.request.id
    Object.defineProperty(ctx.request, property, propertyDesc)
    // default ctx.id
    // TODO named reqId is better
    Object.defineProperty(ctx, property, propertyDesc)
    
    await next()
  }
}

export default requestId
