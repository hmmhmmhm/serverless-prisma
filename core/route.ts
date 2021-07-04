import type {
  ProxyIntegrationEvent,
  ProxyIntegrationResult,
} from 'aws-lambda-router/lib/proxyIntegration'
import type { HttpMethod } from 'aws-lambda-router/lib/EventProcessor'
import type { APIGatewayEventRequestContext } from 'aws-lambda'

export interface ProxyIntegrationRoute<T = unknown> {
  path: string
  method: HttpMethod
  action: (
    request: ProxyIntegrationEvent<T>,
    context: APIGatewayEventRequestContext
  ) =>
    | ProxyIntegrationResult
    | Promise<ProxyIntegrationResult>
    | string
    | Promise<string>
}

export const createRoute = <T = unknown>(route: ProxyIntegrationRoute<T>) =>
  route
