# [Backstage](https://backstage.io)

This is a newly scaffolded Backstage customisable application. It is useful for evaluating, developing on, or demoing Backstage.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** — version 24 (Active LTS)
- **Yarn** — version 4 (via Corepack)

For full details, see the [official prerequisites guide](https://backstage.io/docs/getting-started/#prerequisites).

## Quick Start

To start the app locally, run:

```sh
cp app-config.local.example.yaml app-config.local.yaml
yarn install
yarn start
```

To build the Docker image, run:

```sh
yarn build-image
```

## Guest Access

Backstage's Guest authentication provider is enabled only for local development.

## DevTools

The [DevTools plugin](https://github.com/backstage/backstage/blob/master/plugins/devtools/README.md) is installed but disabled by default. It is gated behind a configuration flag: both the backend plugin loader and the frontend sidebar item check `devtools.enabled` before activating.

To enable it, set the following in your `app-config.local.yaml`:

```yaml
devtools:
  enabled: true
```

This is already included in `app-config.local.example.yaml`.

## Authentication via AWS ALB

This Backstage application can be deployed behind an AWS Application Load Balancer (ALB) to provide seamless authentication for users. The ALB handles the authentication flow before traffic reaches Backstage, so users are transparently authenticated without needing a separate sign-in step within the app.

The exact infrastructure will vary depending on the identity provider in use. One possible setup for PoC purposes might consist of:

1. **AWS IAM Identity Center**: configured with Backstage registered as a SAML 2.0 application, with email attribute mapping.
2. **Amazon Cognito**: integrated with IAM Identity Center as a federated identity provider.
3. **AWS ALB**: configured to authenticate users via Cognito before forwarding requests to the Backstage backend running on Kubernetes.

The ALB authentication would be configured through Kubernetes Ingress annotations:

```yaml
alb.ingress.kubernetes.io/auth-idp-cognito: '{"userPoolARN":"<cognito-user-pool-arn>","userPoolClientID":"<cognito-client-id>","userPoolDomain":"<cognito-domain>"}'
alb.ingress.kubernetes.io/auth-scope: "openid email profile"
alb.ingress.kubernetes.io/auth-session-cookie: "AWSELBAuthSessionCookie"
```

On the Backstage side, the [AWS ALB Proxy Provider](https://backstage.io/docs/auth/aws-alb/provider/) is used to resolve user identity from the ALB-injected headers.

### Bootstrapping the Infrastructure with AI

Rather than providing opinionated IaC manifests tied to a specific tool, you can use the following prompt with an agentic AI assistant to generate the infrastructure in your preferred tech stack (Terraform, CDK, CloudFormation, Pulumi, etc.):

> Set up AWS infrastructure for authenticating a Backstage application deployed on Kubernetes behind an AWS Application Load Balancer. The setup should include:
>
> 1. An AWS IAM Identity Center instance with Backstage registered as a SAML 2.0 application, mapping the email attribute.
> 2. An Amazon Cognito User Pool with IAM Identity Center configured as a federated identity provider.
> 3. A Cognito User Pool Client and domain for use with the ALB.
> 4. An AWS ALB configured to authenticate users via Cognito using OIDC, before forwarding traffic to the Backstage backend.
> 5. Kubernetes Ingress annotations for ALB authentication with Cognito (`auth-idp-cognito`, `auth-scope`, `auth-session-cookie`).
>
> Output the infrastructure code using [your preferred IaC tool].

## References

- [Creating and running a Backstage application](https://backstage.io/docs/getting-started/#creating-and-running-a-backstage-application)
- [Multi-stage Build](https://backstage.io/docs/deployment/docker#multi-stage-build)
- [Authentication](https://backstage.io/docs/getting-started/config/authentication)
- [Sign-in Resolvers](https://backstage.io/docs/auth/identity-resolver#sign-in-resolvers)
- [Sign-In with Proxy Providers](https://backstage.io/docs/auth/#sign-in-with-proxy-providers)
- [Conditionally Render Sign In Provider](https://backstage.io/docs/auth/#conditionally-render-sign-in-provider)
- [AWS ALB Proxy Provider](https://backstage.io/docs/auth/aws-alb/provider/)
- [DevTools](https://github.com/backstage/backstage/blob/master/plugins/devtools/README.md)
- [Defining Configuration for your Plugin](https://backstage.io/docs/conf/defining/)
- [Backstage Helm Chart](https://github.com/backstage/charts/tree/main/charts/backstage)
