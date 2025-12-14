# Azure Table Storage Setup Instructions

This guide will help you set up Azure Table Storage for the Temple of Praise website.

## Step 1: Create a Storage Account

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **"Create a resource"**
3. Search for **"Storage account"** and select it
4. Click **"Create"**

### Configuration:
| Setting | Value |
|---------|-------|
| Subscription | Select your subscription |
| Resource Group | Create new or use existing (e.g., `templeofpraise-rg`) |
| Storage account name | `templeofpraisestorage` (must be globally unique, lowercase, no spaces) |
| Region | Select closest to your users (e.g., `West Europe`) |
| Performance | **Standard** (cheaper, sufficient for your needs) |
| Redundancy | **LRS (Locally-redundant storage)** (cheapest option) |

5. Click **"Review + Create"** then **"Create"**
6. Wait for deployment to complete

## Step 2: Create Tables

1. Once created, go to your Storage Account
2. In the left menu, under **"Data storage"**, click **"Tables"**
3. Click **"+ Table"** and create these tables:

| Table Name | Purpose |
|------------|---------|
| `members` | Store registered members |
| `mediaevents` | Store media event/topic metadata |
| `mediaitems` | Store individual media items (photos/videos) |

## Step 3: Create Blob Container for Media Files

1. In the left menu, under **"Data storage"**, click **"Containers"**
2. Click **"+ Container"**
3. Create a container:
   - Name: `media`
   - Public access level: **Blob (anonymous read access for blobs only)**

   > This allows images/videos to be publicly viewable via URL

## Step 4: Get Connection String and Keys

1. In the left menu, under **"Security + networking"**, click **"Access keys"**
2. Click **"Show"** next to key1
3. Copy the following values (you'll need these):

```
Storage Account Name: templeofpraisestorage
Key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Connection String: DefaultEndpointsProtocol=https;AccountName=...
```

## Step 5: Enable CORS (Required for Browser Access)

1. In the left menu, under **"Settings"**, click **"Resource sharing (CORS)"**
2. Under **"Table service"** tab, add a rule:

| Setting | Value |
|---------|-------|
| Allowed origins | `*` (or your specific domain for production) |
| Allowed methods | `GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS` |
| Allowed headers | `*` |
| Exposed headers | `*` |
| Max age | `3600` |

3. Click **"Save"**

4. Repeat the same for **"Blob service"** tab

## Step 6: Configure Environment Variables

Create a `.env` file in your project root with these values:

```env
# Your storage account name
VITE_AZURE_STORAGE_ACCOUNT=templeofpraisestorage

# Your access key (from Step 4) - RECOMMENDED: Never expires!
VITE_AZURE_STORAGE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Getting the Access Key:
1. Go to your Storage Account in Azure Portal
2. In the left menu, under **"Security + networking"**, click **"Access keys"**
3. Click **"Show"** next to key1
4. Copy the **Key** value (not the connection string)

> **Important Security Notes:**
> - The Access Key **never expires**, making it simpler to manage
> - Keep this key secure and **never commit it to version control**
> - Add `.env` to your `.gitignore` file
> - If the key is ever compromised, you can rotate it in Azure Portal

### Alternative: Use SAS Token (optional)
If you prefer to use a SAS token instead (has expiry date):

```env
VITE_AZURE_STORAGE_ACCOUNT=templeofpraisestorage
VITE_AZURE_STORAGE_SAS_TOKEN=?sv=2022-11-02&ss=bt&srt=sco&sp=rwdlacupiytfx&se=2026-01-01...
```

To generate a SAS token:
1. In the left menu, click **"Shared access signature"**
2. Configure:
   - Allowed services: **Blob, Table**
   - Allowed resource types: **Service, Container, Object**
   - Allowed permissions: **Read, Write, Delete, List, Add, Create, Update**
   - Start date: Today
   - End date: Set to 1+ year from now
   - Allowed protocols: **HTTPS only**
3. Click **"Generate SAS and connection string"**
4. Copy the **SAS token** (starts with `?sv=...`)

## Table Schemas

### Members Table
| Property | Type | Description |
|----------|------|-------------|
| PartitionKey | string | Always "member" |
| RowKey | string | Email address (URL encoded) |
| name | string | Full name |
| email | string | Email address |
| phone | string | Phone number |
| address | string | Home address |
| isApproved | boolean | Whether member is approved to view media |
| registeredDate | string | ISO date when registered |

### MediaEvents Table
| Property | Type | Description |
|----------|------|-------------|
| PartitionKey | string | Year (e.g., "2025") |
| RowKey | string | Unique event ID (UUID) |
| title | string | Event title (e.g., "Youth Day") |
| description | string | Event description |
| eventDate | string | ISO date of the event |
| createdDate | string | ISO date when created |

### MediaItems Table
| Property | Type | Description |
|----------|------|-------------|
| PartitionKey | string | Event ID (links to MediaEvents) |
| RowKey | string | Unique media item ID (UUID) |
| type | string | "image" or "video" |
| url | string | Blob storage URL |
| thumbnailUrl | string | Thumbnail URL (for videos) |
| title | string | Media title |
| description | string | Media description |
| uploadDate | string | ISO date when uploaded |

## Cost Estimate

Azure Table Storage is very affordable:
- Storage: ~$0.045 per GB per month
- Transactions: ~$0.00036 per 10,000 transactions

For a small church website with a few hundred members and media items, expect costs under $1/month.

## Troubleshooting

### CORS Errors
If you see CORS errors in the browser console:
1. Double-check CORS settings in Azure Portal
2. Make sure both Table and Blob services have CORS configured
3. Clear browser cache and try again

### Authentication Errors
If you see 403 Forbidden errors:
1. Check that your Access Key or SAS token is correct
2. If using SAS token, check it hasn't expired
3. Verify the storage account name is correct
4. Make sure CORS is properly configured

### Table Not Found
If you get "Table not found" errors:
1. Verify the table names match exactly (case-sensitive)
2. Check you're using the correct storage account
