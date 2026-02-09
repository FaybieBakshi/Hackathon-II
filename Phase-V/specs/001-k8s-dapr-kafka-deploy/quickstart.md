# Quickstart: Production Kubernetes Deployment with Dapr & Kafka

**Feature Branch**: `001-k8s-dapr-kafka-deploy`
**Date**: 2026-02-09

## Overview

This quickstart guide provides instructions for setting up and running the Todo application with its new production-grade Kubernetes deployment, Dapr integration, and Kafka event-driven architecture. It covers local development using Minikube and preparation for cloud deployment.

## Prerequisites

-   **Docker Desktop (with Kubernetes enabled)** or **Minikube**: For local Kubernetes development.
-   **kubectl**: Kubernetes command-line tool.
-   **Helm**: Kubernetes package manager.
-   **Dapr CLI**: For managing Dapr installations and running applications with Dapr.
-   **Redpanda Console / Kafka client**: For interacting with Kafka topics (optional, but useful for debugging).
-   **GitHub Account**: For CI/CD with GitHub Actions.
-   **Google Cloud SDK / Azure CLI**: If deploying to GKE or AKS.

## Local Development Setup (Minikube)

1.  **Start Minikube**:
    ```bash
    minikube start
    ```

2.  **Install Dapr on Minikube**:
    ```bash
    dapr init -k
    ```
    Verify Dapr installation:
    ```bash
    dapr status -k
    ```

3.  **Install Kafka (Redpanda)**:
    *(For local development, you can use a local Kafka/Redpanda instance or a Redpanda Cloud free tier. Here we assume a local setup for quick testing.)*
    ```bash
    # Example using Helm for local Redpanda (ensure Helm is configured for Minikube)
    helm repo add redpanda https://charts.redpanda.com/
    helm install redpanda redpanda/redpanda --namespace default --set console.enabled=true
    ```
    *Note: Adjust installation based on your chosen local Kafka/Redpanda setup.*

4.  **Configure Dapr Components**:
    Create Dapr component YAMLs for Pub/Sub (Kafka), State Store (e.g., Redis), and any Bindings/Secrets required. These will be deployed to Minikube.
    *(Example: Save as `components/pubsub.yaml`, `components/statestore.yaml`)*
    ```yaml
    # components/pubsub.yaml
    apiVersion: dapr.io/v1alpha1
    kind: Component
    metadata:
      name: pubsub-kafka
      namespace: default
    spec:
      type: pubsub.kafka
      version: v1
      metadata:
      - name: brokers
        value: "redpanda-0.redpanda:9092" # Replace with your Kafka broker address
      - name: authRequired
        value: "false"
      - name: disableTls
        value: "true"
    ---
    # components/statestore.yaml
    apiVersion: dapr.io/v1alpha1
    kind: Component
    metadata:
      name: statestore-redis
      namespace: default
    spec:
      type: state.redis
      version: v1
      metadata:
      - name: redisHost
        value: "localhost:6379" # Replace with your Redis host
      - name: redisPassword
        secretKeyRef:
            name: redis-password
            key: redis-password
    auth:
      secretStore: kubernetes # Or your configured secret store
    ```
    Apply components:
    ```bash
    kubectl apply -f components/
    ```

5.  **Deploy Backend Services with Dapr**:
    Use Helm charts (to be created) to deploy the Todo backend services, enabling Dapr sidecars.
    ```bash
    helm install todo-backend ./helm/todo-backend --namespace default
    ```
    Verify deployment and Dapr sidecars:
    ```bash
    kubectl get pods -n default
    dapr list
    ```

6.  **Deploy Frontend Service**:
    Deploy the frontend service (e.g., Next.js) which will communicate with the Dapr-enabled backend.

7.  **Access Application**:
    Use `minikube service <frontend-service-name>` or port-forwarding to access the application.

## Cloud Deployment (GKE) Preparation

1.  **GKE Cluster Setup**: Provision a GKE cluster.
2.  **Dapr Installation on GKE**: `dapr init -k --runtime-version 1.10.0` (or desired version).
3.  **Redpanda Cloud Setup**: Provision a Redpanda Cloud instance and obtain connection details.
4.  **Dapr Component Configuration for GKE**: Update Dapr component YAMLs to use cloud-managed services (e.g., Redpanda Cloud brokers, cloud-managed Redis, GCP Secret Manager for secrets).
5.  **Helm Chart Updates**: Parameterize Helm charts to accept environment-specific values for cloud deployment.
6.  **CI/CD Configuration**: Set up GitHub Actions workflows to deploy to GKE upon merge to `main`.

## Usage

Once deployed, interact with the Todo application as usual. Advanced features (recurring tasks, reminders, etc.) will leverage the Dapr and Kafka infrastructure.

## Next Steps

-   Implement CI/CD pipelines (GitHub Actions).
-   Set up Prometheus and Grafana for monitoring.
-   Conduct load testing and performance tuning.
-   Refine Dapr component configurations for optimal performance and security in production.
