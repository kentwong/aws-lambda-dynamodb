# AWS Secrets Manager Command Reference

This document provides examples and explanations for common AWS Secrets Manager CLI operations.

---

## 1. Store a Secret Value

**Command:**
```sh
aws secretsmanager put-secret-value \
    --secret-id arn:aws:secretsmanager:<region>:<account-id>:secret:<secret-name> \
    --secret-binary fileb://private-key.pem
```
**Description:**  
Uploads the contents of `private-key.pem` as the binary value for the specified secret. Use `--secret-string` for text secrets.

**Example Usage:**
```sh
aws secretsmanager put-secret-value \
    --secret-id arn:aws:secretsmanager:us-west-2:123456789012:secret:my-app/secret-key \
    --secret-binary fileb://private-key.pem
```

---

## 2. Retrieve a Secret Value and Save to File

**Command:**
```sh
aws secretsmanager get-secret-value \
    --secret-id arn:aws:secretsmanager:<region>:<account-id>:secret:<secret-name> \
    --query SecretBinary \
    --output text > restored-key.pem
```
**Description:**  
Downloads the binary secret and writes it to `restored-key.pem`. Useful for restoring private keys or certificates.

**Example Usage:**
```sh
aws secretsmanager get-secret-value \
    --secret-id arn:aws:secretsmanager:us-west-2:123456789012:secret:my-app/secret-key \
    --query SecretBinary \
    --output text > restored-key.pem
```

---

## 3. List All Secret Versions

**Command:**
```sh
aws secretsmanager list-secret-version-ids \
    --secret-id <secret-name> \
    --include-deprecated
```
**Description:**  
Lists all version IDs for the secret, including deprecated ones. Helps track secret rotation history.

**Example Usage:**
```sh
aws secretsmanager list-secret-version-ids \
    --secret-id my-app/secret-key \
    --include-deprecated
```

---

## 4. Display a Specific Secret Version

**Command:**
```sh
aws secretsmanager get-secret-value \
    --secret-id <secret-name> \
    --version-id <version-id>
```
**Description:**  
Retrieves the value of a specific version of the secret using its version ID.

**Example Usage:**
```sh
aws secretsmanager get-secret-value \
    --secret-id my-app/secret-key \
    --version-id 3d0c4eed-c62d-432d-aaff-2cb7d2cdbec4
```

---

## 5. Retrieve the Previous Version of a Secret

**Command:**
```sh
aws secretsmanager get-secret-value \
    --secret-id <secret-name> \
    --version-stage AWSPREVIOUS
```
**Description:**  
Fetches the secret value currently marked as `AWSPREVIOUS`, which is the previous version before the current one.

**Example Usage:**
```sh
aws secretsmanager get-secret-value \
    --secret-id my-app/secret-key \
    --version-stage AWSPREVIOUS
```

---

## 6. Swap AWSCURRENT and AWSPREVIOUS Version Stages

Suppose you have:
- **CURRENT VersionId:** `1b23ff38-12c2-497a-b7ad-36cd2a2cd4ec`
- **PREVIOUS VersionId:** `29d57342-bdf8-4fe7-87bc-b1504dc2498e`

**Command:**
```sh
aws secretsmanager update-secret-version-stage \
    --secret-id <secret-name> \
    --version-stage AWSCURRENT \
    --move-to-version-id <previous-version-id> \
    --remove-from-version-id <current-version-id>
```
**Description:**  
Moves the `AWSCURRENT` stage to the previous version and removes it from the current version, effectively swapping the current and previous secret versions.

**Example Usage:**
```sh
aws secretsmanager update-secret-version-stage \
    --secret-id my-app/secret-key \
    --version-stage AWSCURRENT \
    --move-to-version-id 29d57342-bdf8-4fe7-87bc-b1504dc2498e \
    --remove-from-version-id 1b23ff38-12c2-497a-b7ad-36cd2a2cd4ec
```

---

**Note:**  
Replace `<region>`, `<account-id>`, `<secret-name>`, `<version-id>`, and file names as appropriate for your environment.