import { TableClient, TableEntity } from '@azure/data-tables';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import { Member, MemberRegistration, Media, MediaEvent } from '../types';

// Azure Storage configuration using SAS Token
const storageAccount = import.meta.env.VITE_AZURE_STORAGE_ACCOUNT || '';
const sasToken = import.meta.env.VITE_AZURE_STORAGE_SAS_TOKEN || '';

const tableUrl = `https://${storageAccount}.table.core.windows.net`;
const blobUrl = `https://${storageAccount}.blob.core.windows.net`;

// Table clients
const getMembersTableClient = (): TableClient => {
  return new TableClient(`${tableUrl}${sasToken}`, 'members');
};

const getMediaEventsTableClient = (): TableClient => {
  return new TableClient(`${tableUrl}${sasToken}`, 'mediaevents');
};

const getMediaItemsTableClient = (): TableClient => {
  return new TableClient(`${tableUrl}${sasToken}`, 'mediaitems');
};

// Blob client
const getBlobContainerClient = (): ContainerClient => {
  const blobServiceClient = new BlobServiceClient(`${blobUrl}${sasToken}`);
  return blobServiceClient.getContainerClient('media');
};

// Helper to add SAS token to blob URLs for viewing
const addSasToUrl = (url: string): string => {
  if (!url) return url;
  // If URL already has query params, append SAS token properly
  return url.includes('?') ? `${url}&${sasToken.substring(1)}` : `${url}${sasToken}`;
};

// ============ MEMBER FUNCTIONS ============

interface MemberEntity extends TableEntity {
  name: string;
  email: string;
  phone: string;
  address: string;
  isApproved: boolean;
  isAdmin?: boolean;
  registeredDate: string;
}

export const registerMember = async (registration: MemberRegistration): Promise<Member> => {
  const tableClient = getMembersTableClient();
  const rowKey = encodeURIComponent(registration.email.toLowerCase());

  // Check if member already exists
  try {
    await tableClient.getEntity('member', rowKey);
    throw new Error('A member with this email already exists');
  } catch (error: unknown) {
    const err = error as { statusCode?: number; message?: string };
    if (err.statusCode !== 404) {
      if (err.message?.includes('already exists')) {
        throw error;
      }
    }
  }

  const entity: MemberEntity = {
    partitionKey: 'member',
    rowKey,
    name: registration.name,
    email: registration.email.toLowerCase(),
    phone: registration.phone,
    address: registration.address,
    isApproved: false,
    registeredDate: new Date().toISOString(),
  };

  await tableClient.createEntity(entity);

  return {
    id: rowKey,
    name: entity.name,
    email: entity.email,
    phone: entity.phone,
    address: entity.address,
    joinDate: entity.registeredDate,
    isApproved: entity.isApproved,
  };
};

export const getMemberByEmail = async (email: string): Promise<Member | null> => {
  const tableClient = getMembersTableClient();
  const rowKey = encodeURIComponent(email.toLowerCase());

  try {
    const entity = await tableClient.getEntity<MemberEntity>('member', rowKey);
    return {
      id: entity.rowKey as string,
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
      address: entity.address,
      joinDate: entity.registeredDate,
      isApproved: entity.isApproved,
      isAdmin: entity.isAdmin || false,
    };
  } catch (error: unknown) {
    const err = error as { statusCode?: number };
    if (err.statusCode === 404) {
      return null;
    }
    throw error;
  }
};

export const getAllMembers = async (): Promise<Member[]> => {
  const tableClient = getMembersTableClient();
  const members: Member[] = [];

  const entities = tableClient.listEntities<MemberEntity>({
    queryOptions: { filter: "PartitionKey eq 'member'" }
  });

  for await (const entity of entities) {
    members.push({
      id: entity.rowKey as string,
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
      address: entity.address,
      joinDate: entity.registeredDate,
      isApproved: entity.isApproved,
      isAdmin: entity.isAdmin || false,
    });
  }

  return members.sort((a, b) =>
    new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
  );
};

export const updateMemberApproval = async (email: string, isApproved: boolean): Promise<Member> => {
  const tableClient = getMembersTableClient();
  const rowKey = encodeURIComponent(email.toLowerCase());

  const entity = await tableClient.getEntity<MemberEntity>('member', rowKey);

  // Update only the isApproved field using upsert to avoid etag issues
  await tableClient.upsertEntity({
    partitionKey: 'member',
    rowKey,
    name: entity.name,
    email: entity.email,
    phone: entity.phone,
    address: entity.address,
    isApproved,
    isAdmin: entity.isAdmin || false,
    registeredDate: entity.registeredDate,
  }, 'Replace');

  return {
    id: rowKey,
    name: entity.name,
    email: entity.email,
    phone: entity.phone,
    address: entity.address,
    joinDate: entity.registeredDate,
    isApproved,
    isAdmin: entity.isAdmin || false,
  };
};

export const deleteMember = async (email: string): Promise<void> => {
  const tableClient = getMembersTableClient();
  const rowKey = encodeURIComponent(email.toLowerCase());
  await tableClient.deleteEntity('member', rowKey);
};

// ============ MEDIA EVENT FUNCTIONS ============

interface MediaEventEntity extends TableEntity {
  title: string;
  description: string;
  eventDate: string;
  createdDate: string;
}

export const createMediaEvent = async (
  title: string,
  description: string,
  eventDate: string
): Promise<MediaEvent> => {
  const tableClient = getMediaEventsTableClient();
  const id = uuidv4();
  const year = new Date(eventDate).getFullYear().toString();

  const entity: MediaEventEntity = {
    partitionKey: year,
    rowKey: id,
    title,
    description,
    eventDate,
    createdDate: new Date().toISOString(),
  };

  await tableClient.createEntity(entity);

  return {
    id,
    title,
    description,
    eventDate,
    createdDate: entity.createdDate,
    partitionKey: year,
    rowKey: id,
  };
};

export const getAllMediaEvents = async (): Promise<MediaEvent[]> => {
  const tableClient = getMediaEventsTableClient();
  const events: MediaEvent[] = [];

  const entities = tableClient.listEntities<MediaEventEntity>();

  for await (const entity of entities) {
    events.push({
      id: entity.rowKey as string,
      title: entity.title,
      description: entity.description,
      eventDate: entity.eventDate,
      createdDate: entity.createdDate,
      partitionKey: entity.partitionKey,
      rowKey: entity.rowKey,
    });
  }

  return events.sort((a, b) =>
    new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
  );
};

export const getMediaEvent = async (eventId: string): Promise<MediaEvent | null> => {
  const tableClient = getMediaEventsTableClient();

  // Since we don't know the year, we need to search
  const entities = tableClient.listEntities<MediaEventEntity>({
    queryOptions: { filter: `RowKey eq '${eventId}'` }
  });

  for await (const entity of entities) {
    return {
      id: entity.rowKey as string,
      title: entity.title,
      description: entity.description,
      eventDate: entity.eventDate,
      createdDate: entity.createdDate,
      partitionKey: entity.partitionKey,
      rowKey: entity.rowKey,
    };
  }

  return null;
};

export const updateMediaEvent = async (
  eventId: string,
  partitionKey: string,
  title: string,
  description: string,
  eventDate: string
): Promise<MediaEvent> => {
  const tableClient = getMediaEventsTableClient();

  const entity = await tableClient.getEntity<MediaEventEntity>(partitionKey, eventId);

  const updatedEntity: MediaEventEntity = {
    ...entity,
    partitionKey,
    rowKey: eventId,
    title,
    description,
    eventDate,
  };

  await tableClient.updateEntity(updatedEntity, 'Merge');

  return {
    id: eventId,
    title,
    description,
    eventDate,
    createdDate: entity.createdDate,
    partitionKey,
    rowKey: eventId,
  };
};

export const deleteMediaEvent = async (eventId: string, partitionKey: string): Promise<void> => {
  const tableClient = getMediaEventsTableClient();
  await tableClient.deleteEntity(partitionKey, eventId);

  // Also delete all media items for this event
  const mediaItems = await getMediaItemsByEvent(eventId);
  for (const item of mediaItems) {
    await deleteMediaItem(item.id, eventId);
  }
};

// ============ MEDIA ITEM FUNCTIONS ============

interface MediaItemEntity extends TableEntity {
  type: 'image' | 'video';
  url: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  uploadDate: string;
}

export const uploadMediaItem = async (
  eventId: string,
  file: File,
  title: string,
  description: string,
  type: 'image' | 'video'
): Promise<Media> => {
  const containerClient = getBlobContainerClient();
  const mediaTableClient = getMediaItemsTableClient();

  const id = uuidv4();
  const extension = file.name.split('.').pop();
  const blobName = `${eventId}/${id}.${extension}`;

  // Upload file to blob storage
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadData(await file.arrayBuffer(), {
    blobHTTPHeaders: { blobContentType: file.type }
  });

  const url = `${blobUrl}/media/${blobName}`;

  const entity: MediaItemEntity = {
    partitionKey: eventId,
    rowKey: id,
    type,
    url,
    thumbnailUrl: type === 'video' ? '' : url,
    title,
    description,
    uploadDate: new Date().toISOString(),
  };

  await mediaTableClient.createEntity(entity);

  return {
    id,
    title,
    type,
    url,
    thumbnailUrl: entity.thumbnailUrl || undefined,
    description,
    uploadDate: entity.uploadDate,
    eventId,
  };
};

export const getMediaItemsByEvent = async (eventId: string): Promise<Media[]> => {
  const tableClient = getMediaItemsTableClient();
  const items: Media[] = [];

  const entities = tableClient.listEntities<MediaItemEntity>({
    queryOptions: { filter: `PartitionKey eq '${eventId}'` }
  });

  for await (const entity of entities) {
    items.push({
      id: entity.rowKey as string,
      title: entity.title,
      type: entity.type,
      url: addSasToUrl(entity.url),
      thumbnailUrl: entity.thumbnailUrl ? addSasToUrl(entity.thumbnailUrl) : undefined,
      description: entity.description,
      uploadDate: entity.uploadDate,
      eventId,
    });
  }

  return items.sort((a, b) =>
    new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
  );
};

export const getAllMediaItems = async (): Promise<Media[]> => {
  const tableClient = getMediaItemsTableClient();
  const items: Media[] = [];

  const entities = tableClient.listEntities<MediaItemEntity>();

  for await (const entity of entities) {
    items.push({
      id: entity.rowKey as string,
      title: entity.title,
      type: entity.type,
      url: addSasToUrl(entity.url),
      thumbnailUrl: entity.thumbnailUrl ? addSasToUrl(entity.thumbnailUrl) : undefined,
      description: entity.description,
      uploadDate: entity.uploadDate,
      eventId: entity.partitionKey,
    });
  }

  return items;
};

export const deleteMediaItem = async (itemId: string, eventId: string): Promise<void> => {
  const tableClient = getMediaItemsTableClient();
  const containerClient = getBlobContainerClient();

  // Get the item first to get the blob URL
  try {
    const entity = await tableClient.getEntity<MediaItemEntity>(eventId, itemId);

    // Delete from blob storage
    const blobName = entity.url.split('/media/')[1];
    if (blobName) {
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.deleteIfExists();
    }

    // Delete from table
    await tableClient.deleteEntity(eventId, itemId);
  } catch (error: unknown) {
    const err = error as { statusCode?: number };
    if (err.statusCode !== 404) {
      throw error;
    }
  }
};

export const updateMediaItem = async (
  itemId: string,
  eventId: string,
  title: string,
  description: string
): Promise<Media> => {
  const tableClient = getMediaItemsTableClient();

  const entity = await tableClient.getEntity<MediaItemEntity>(eventId, itemId);

  const updatedEntity: MediaItemEntity = {
    ...entity,
    partitionKey: eventId,
    rowKey: itemId,
    title,
    description,
  };

  await tableClient.updateEntity(updatedEntity, 'Merge');

  return {
    id: itemId,
    title,
    type: entity.type,
    url: entity.url,
    thumbnailUrl: entity.thumbnailUrl || undefined,
    description,
    uploadDate: entity.uploadDate,
    eventId,
  };
};
