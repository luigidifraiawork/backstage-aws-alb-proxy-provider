# [Backstage](https://backstage.io)

This is your newly scaffolded Backstage App, Good Luck!

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
