# Research Findings: Production Kubernetes Deployment with Dapr & Kafka

**Feature Branch**: `001-k8s-dapr-kafka-deploy`
**Date**: 2026-02-09

## Decisions Made from Clarifications

### 1. Kafka Deployment Choice

-   **Decision**: Redpanda Cloud (starting with free tier).
-   **Rationale**: Aligns with the constraint of using "Redpanda Cloud free tier" from the spec. Redpanda Cloud offers a managed Kafka-compatible service, reducing operational overhead and accelerating development.
-   **Alternatives Considered**: Self-hosted Strimzi on Kubernetes (provides more control but introduces significant operational complexity and management burden).

### 2. Dapr Component Configurations

-   **Decision**: Utilize Dapr's configuration capabilities to define separate component configurations for local (Minikube) and cloud (GKE) environments.
-   **Rationale**: This approach ensures flexibility, allowing for different state stores, pub/sub brokers, and secret stores tailored to each environment's needs (e.g., local Redis vs. cloud-managed Redis/CosmosDB for state, local Kafka vs. Redpanda Cloud for pub/sub). This is crucial for seamless transition from development to production.
-   **Alternatives Considered**: A single, unified configuration (would lead to inflexibility and potential issues when moving between environments).

### 3. Cloud Provider Selection

-   **Decision**: Google Kubernetes Engine (GKE).
-   **Rationale**: GKE is a mature and robust managed Kubernetes service that offers strong integration with other Google Cloud services (e.g., Cloud Monitoring, Cloud Logging). It provides a good balance of features, community support, and operational ease for a production-grade deployment.
-   **Alternatives Considered**: Azure Kubernetes Service (AKS), Oracle Kubernetes Engine (OKE) (both are viable alternatives but GKE is chosen for its ecosystem integration and maturity).

### 4. Monitoring Stack Composition

-   **Decision**: Prometheus and Grafana.
-   **Rationale**: Explicitly stated in the "Key Standards" section of the project constitution and the feature specification. This is a widely adopted, powerful, and flexible open-source stack for Kubernetes monitoring. It aligns with the goal of full observability.
-   **Alternatives Considered**: Cloud-native monitoring solutions (e.g., Google Cloud Monitoring for GKE, Azure Monitor for AKS) (could be integrated in addition to Prometheus/Grafana if deeper cloud-specific metrics or logging are required).

### 5. CI/CD Strategy

-   **Decision**: GitHub Actions.
-   **Rationale**: Explicitly stated in the "Key Standards" section of the project constitution and the feature specification. GitHub Actions provides a robust and integrated CI/CD solution, streamlining the development and deployment workflow for a GitHub-hosted project.
-   **Alternatives Considered**: Cloud-specific pipelines (e.g., Google Cloud Build) (while suitable for GKE, GitHub Actions offers a unified approach across different deployment targets and closer integration with the codebase).
