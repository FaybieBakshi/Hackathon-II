# This file should contain authentication logic for existing backend services.
# T009: Adapt existing authentication to work with Dapr Secrets for credential management.

# Example: If your existing auth uses a SECRET_KEY from an environment variable,
# you would modify it to fetch the secret from Dapr's secret store.

# import os
# from dapr.clients import DaprClient

# DAPR_SECRET_STORE_NAME = "secretstore-kubernetes" # Defined in infrastructure/dapr/minikube/secretstore-kubernetes.yaml
# SECRET_KEY_NAME = "my-app-secret-key"

# def get_secret_key():
#     # Try to get from Dapr Secret Store first
#     with DaprClient() as d:
#         try:
#             secret = d.get_secret(store_name=DAPR_SECRET_STORE_NAME, key=SECRET_KEY_NAME)
#             return secret.secrets[SECRET_KEY_NAME]
#         except Exception as e:
#             print(f"Could not retrieve secret from Dapr: {e}")
#             # Fallback to environment variable or raise error
#             return os.getenv("FALLBACK_SECRET_KEY")

# Now your authentication functions would use get_secret_key()
# instead of directly reading from os.getenv() for sensitive keys.