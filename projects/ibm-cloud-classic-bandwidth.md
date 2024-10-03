---
title: IBM Cloud Bandwidth
description: Hybrid cloud UI for monitoring bandwidth usage and pools for classic IaaS servers.
layout: layouts/project.njk
publishedDate: 2022
year: 2022
tags: projects
type: React Microservice
---
<!-- ![image](/assets/img/projects/IBM/Summary-Dark.png) -->

<p class="body-display">As part of IBM Cloud's effort to unify the UX across all products, I led the transformation of the classic bandwidth service from a legacy application to a modern architecture leveraging React, Apollo GraphQL, and Carbon Design System.</p>

<p class="body-display mar-btm-5">This product is responsible for managing the network bandwidth of IBM Cloud’s infrastructure products, including bare metal servers, virtual servers, and application delivery controllers. The project aimed to improve the usability, scalability, and performance of the application while aligning it with IBM’s modern design principles.</p>

## Background
In 2019, IBM Cloud launched an initiative to unify the customer experience across its entire console using Carbon, IBM’s open source design system. To achieve this consistency, Cloud PAL (an internal pattern asset library) was created on top of Carbon v10, providing a foundation for visual and UX uniformity across all of IBM's public cloud products. By 2021, nearly 90% of IBM Cloud products had successfully adopted Carbon and Cloud PAL, delivering a cohesive experience for most users.

When I joined IBM Cloud's classic networking team in 2022, the classic bandwidth product remained on an outdated, legacy PHP application. This inconsistency created a stark contrast with the rest of the cloud offerings, resulting in a jarring experience for users accustomed to the more modern, streamlined UI across other products in IBM Cloud. Modernizing this product became a priority, both to align with IBM’s design standards and to improve the user experience for classic infrastructure customers.

### Legacy UI
| Bandwidth Summary | Pools | Pool Details |
| --- | --- | --- |
| [![Legacy bandwidth summary](/assets/img/projects/IBM/Legacy-Summary.png)](/assets/img/projects/IBM/Legacy-Summary.png) | [![Legacy pools](/assets/img/projects/IBM/Legacy-Pools.png)](/assets/img/projects/IBM/Legacy-Pools.png) | [![legacy pool details](/assets/img/projects/IBM/Legacy-Pool-Details.png)](/assets/img/projects/IBM/Legacy-Pool-Details.png) |

## Challenges
- **Limited Design Resources:** Our team initially had only a single designer on loan, with the remaining design work falling on us after a few months. Without a dedicated design team, adopting Carbon Design System and Cloud PAL was difficult, especially when we faced late-stage design requests.
- **Bandwidth API Issues:** The API for managing bandwidth pools was poorly documented and contained several quirks:
  - Pool costs were not accurately calculated, especially when devices were reclaimed mid-billing cycle, resulting in inconsistent pricing information.
  - Users could not immediately delete bandwidth pools or unpool devices, and these actions had to be scheduled at the end of a billing cycle.
  - The regions for bandwidth pools did not align with the global datacenter structure, adding further complexity for users.
  - Support for legacy devices, no longer offered, had to be maintained for long-standing accounts, complicating the backend logic.
- **Outdated Carbon Design System:** During the project, Carbon v11 was released, but we were unable to adopt it due to delays in migrating Cloud PAL. Support for Carbon v10, which we were using, was shifted to v11, making it harder to find up-to-date documentation and support for the version we relied on.
- **Cloud PAL Maintenance:** Cloud PAL, the platform underpinning our UI, was a community-maintained project without a dedicated engineering team. This meant that any bugs we encountered required our team to step in and contribute fixes directly, further stretching our resources and development timeline.
- **Reduced Managerial Support:** Our team faced reduced involvement from offering managers, leaving us to make critical decisions on product direction and user experience. This resulted in a heavier burden on the developers to align the technical implementation with user needs and business goals.

These challenges required our team to be adaptive and resourceful, balancing the demands of UI modernization with technical and organizational constraints.

## Goals
- Successfully migrate the UI to a modern, scalable architecture with React and Apollo GraphQL.
- Ensure the UI adhered to IBM's Carbon Design System, including support for dark mode, despite the limited design resources available.
- Improve the user experience by making complex workflows, like bandwidth pool management, more intuitive for users.
- Address technical limitations in the legacy APIs, such as the poorly documented bandwidth API, while providing a clear interface for users.
- Overcome design and technical hurdles with minimal support from offering managers and a temporary designer.
- Design the application in a maintainable way, reducing overhead for future upgrades to Carbon and Cloud PAL.

## Approach
The approach to modernizing the UI for IBM Cloud's classic infrastructure was rooted in collaboration, optimization, and a focus on maintainability. To ensure the project aligned with stakeholder expectations, we used Figma and Mural to document UI workflow changes and solicit continuous feedback from stakeholders throughout development.

We bootstrapped the project using a microservice template developed by another IBM Cloud team, which we modified to suit the unique needs of our bandwidth management system. This allowed us to kickstart development with a solid foundation, reducing setup time and ensuring architectural consistency across teams.

For the frontend, we optimized the application with React Router for smooth client-side navigation, and Apollo Client’s caching enabled more efficient data fetching, reducing unnecessary page loads and improving the overall user experience.

On the backend, we extended the GraphQL server by defining new schemas and resolvers to fetch bandwidth usage and pool data more efficiently. This reduced the strain on the API and ensured users received real-time updates on their bandwidth metrics. Additionally, we worked closely with our backend engineers to improve the bandwidth API.

To maintain robust documentation, we employed JSDoc’s flavor of TypeScript to ensure maximum type safety while still working within a JavaScript environment. This helped improve developer efficiency and reduced the likelihood of runtime errors.

Our team also adopted test-driven development (TDD), writing unit tests with Jest and Enzyme. This approach ensured that our code was thoroughly tested at each stage of development, reducing bugs and improving the reliability of the final product.

## Outcome
| Bandwidth Summary | Dark mode |
| --- | --- |
| [![Bandwidth summary](/assets/img/projects/IBM/Summary.png)](/assets/img/projects/IBM/Summary.png) | [![Bandwidth summary dark mode](/assets/img/projects/IBM/Summary-Dark.png)](/assets/img/projects/IBM/Summary-dark.png) |

The modernization of IBM Cloud's classic infrastructure UI delivered significant improvements across performance, user experience, and development efficiency. By adopting React, Apollo GraphQL, and the Carbon Design System, we were able to create a highly responsive, scalable, and visually consistent UI.

**Improved Stakeholder Engagement:** Using Figma and Mural to document UI workflows and collect feedback from stakeholders allowed for more informed decision-making and better alignment with project goals.

**Seamless User Experience:** By optimizing with React Router and Apollo Client's caching, we reduced unnecessary page loads and improved data-fetching efficiency. This created a more intuitive and faster interface, allowing users to move between tasks smoothly.

**Efficient Data Management:** The newly defined GraphQL schemas and resolvers optimized the retrieval of bandwidth usage and pool data, ensuring accurate and timely information. This helped address the complexities of managing bandwidth pools, which had previously been confusing due to quirks in the API.

**Robust Documentation and Testing:** Documenting the codebase using JSDoc typings ensured the project was well-documented and easy to maintain. The practice of test-driven development (TDD) with Jest and Enzyme resulted in fewer bugs and more reliable code, making the application more stable and easier to extend.

**Scalable and Future-Proof Architecture:** The application was built with scalability in mind, thanks to the component-driven architecture and microservice foundation. The GraphQL server's flexible data-fetching mechanisms also ensured that future changes to backend services could be handled with minimal impact on the UI.

Overall, the project was a success, transforming an outdated, inconsistent UI into a modern, efficient interface that aligns with IBM's design standards and enhances the user experience for managing IaaS resources.

### Additional Screenshots
| Pools | Pool Details | Add devices to Pool |
| --- | --- | --- |
| [![Bandwidth pools](/assets/img/projects/IBM/Pools.png)](/assets/img/projects/IBM/Pools.png) | [![Pool details](/assets/img/projects/IBM/Pool-Details.png)](/assets/img/projects/IBM/-Pool-Details.png) | [![Add devices to pools](/assets/img/projects/IBM/Add-Devices.png)](/assets/img/projects/IBM/Add-Devices.png) |
| [![Bandwidth pools dark mode](/assets/img/projects/IBM/Pools-Dark.png)](/assets/img/projects/IBM/Pools-Dark.png) | [![Pool details dark mode](/assets/img/projects/IBM/Pool-Details-Dark.png)](/assets/img/projects/IBM/-Pool-Details-Dark.png) | [![Add devices to pools dark mode](/assets/img/projects/IBM/Add-Devices-Dark.png)](/assets/img/projects/IBM/Add-Devices-Dark.png) |