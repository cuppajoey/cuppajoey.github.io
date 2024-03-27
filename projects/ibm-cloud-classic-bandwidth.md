---
title: IBM Cloud Bandwidth
description: Hybrid cloud UI for monitoring bandwidth usage and pools for classic IaaS servers.
layout: layouts/project.njk
year: 2022
tags: projects
type: React Microservice
---
![image](/assets/img/projects/IBM-Cloud__Bandwidth%20Summary.png)

I led development of IBM Cloud’s Classic Bandwidth interface which enables customers to manage and pool the collective bandwidth of their IaaS (infrastructure as a service) servers within the cloud console.

- Built on Carbon for Cloud’s React component library with Sass tokens for proper theming and dark mode.
- Optimized with React Router and Apollo Client’s caching, for seamless rendering and fewer page loads.
- Defined object types and wrote resolvers in our GraphQL server to fetch bandwidth usage data and pools.
- Documented codebase with JSDoc’s flavor of Typescript for maximum type safety in a Javascript project.
- Practiced test-driven development when writing unit and integration tests with Jest and Enzyme.
