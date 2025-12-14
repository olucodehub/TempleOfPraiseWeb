import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { format } from 'date-fns';
import {
  Users,
  Image as ImageIcon,
  Search,
  Check,
  X,
  Loader2,
  Plus,
  Trash2,
  Calendar,
  Upload,
  Film,
  CheckCircle,
  Clock,
  UserCheck,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  Edit2,
  Save,
  AlertCircle,
} from 'lucide-react';
import {
  getAllMembers,
  updateMemberApproval,
  deleteMember,
  getAllMediaEvents,
  createMediaEvent,
  deleteMediaEvent,
  getMediaItemsByEvent,
  uploadMediaItem,
  deleteMediaItem,
} from '../services/azureStorage';
import { Member, MediaEvent, Media } from '../types';

type Tab = 'members' | 'media';
type MemberFilter = 'all' | 'approved' | 'pending';

const Admin: React.FC = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<Tab>('members');
  const [searchTerm, setSearchTerm] = useState('');
  const [memberFilter, setMemberFilter] = useState<MemberFilter>('all');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [eventMediaItems, setEventMediaItems] = useState<Record<string, Media[]>>({});
  const [loadingEventMedia, setLoadingEventMedia] = useState<string | null>(null);

  // New event form state
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [newEventDate, setNewEventDate] = useState('');

  // Upload form state
  const [uploadingToEvent, setUploadingToEvent] = useState<string | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadType, setUploadType] = useState<'image' | 'video'>('image');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Queries
  const { data: members, isLoading: membersLoading } = useQuery('members', getAllMembers);
  const { data: mediaEvents, isLoading: eventsLoading } = useQuery('mediaEvents', getAllMediaEvents);

  // Mutations
  const approvalMutation = useMutation(
    ({ email, isApproved }: { email: string; isApproved: boolean }) =>
      updateMemberApproval(email, isApproved),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('members');
      },
    }
  );

  const deleteMemberMutation = useMutation(deleteMember, {
    onSuccess: () => {
      queryClient.invalidateQueries('members');
    },
  });

  const createEventMutation = useMutation(
    () => createMediaEvent(newEventTitle, newEventDescription, newEventDate),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('mediaEvents');
        setShowNewEventForm(false);
        setNewEventTitle('');
        setNewEventDescription('');
        setNewEventDate('');
      },
    }
  );

  const deleteEventMutation = useMutation(
    ({ eventId, partitionKey }: { eventId: string; partitionKey: string }) =>
      deleteMediaEvent(eventId, partitionKey),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('mediaEvents');
      },
    }
  );

  const deleteMediaMutation = useMutation(
    ({ itemId, eventId }: { itemId: string; eventId: string }) =>
      deleteMediaItem(itemId, eventId),
    {
      onSuccess: (_, variables) => {
        // Refresh media items for this event
        loadEventMedia(variables.eventId);
      },
    }
  );

  // Load media items for an event
  const loadEventMedia = async (eventId: string) => {
    setLoadingEventMedia(eventId);
    try {
      const items = await getMediaItemsByEvent(eventId);
      setEventMediaItems(prev => ({ ...prev, [eventId]: items }));
    } catch (error) {
      console.error('Error loading media items:', error);
    }
    setLoadingEventMedia(null);
  };

  // Toggle event expansion
  const toggleEvent = async (eventId: string) => {
    if (expandedEventId === eventId) {
      setExpandedEventId(null);
    } else {
      setExpandedEventId(eventId);
      if (!eventMediaItems[eventId]) {
        await loadEventMedia(eventId);
      }
    }
  };

  // Handle file upload
  const handleUpload = async (eventId: string) => {
    if (!uploadFile || !uploadTitle) return;

    setIsUploading(true);
    try {
      await uploadMediaItem(eventId, uploadFile, uploadTitle, uploadDescription, uploadType);
      await loadEventMedia(eventId);
      setUploadingToEvent(null);
      setUploadTitle('');
      setUploadDescription('');
      setUploadFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading media:', error);
      alert('Error uploading media. Please try again.');
    }
    setIsUploading(false);
  };

  // Filter members
  const filteredMembers = members?.filter(member => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      memberFilter === 'all' ||
      (memberFilter === 'approved' && member.isApproved) ||
      (memberFilter === 'pending' && !member.isApproved);

    return matchesSearch && matchesFilter;
  });

  // Stats
  const totalMembers = members?.length || 0;
  const approvedMembers = members?.filter(m => m.isApproved).length || 0;
  const pendingMembers = members?.filter(m => !m.isApproved).length || 0;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-purple-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-purple-200 mt-2">Manage members and media content</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{totalMembers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{approvedMembers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{pendingMembers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FolderOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Media Events</p>
                <p className="text-2xl font-bold text-gray-900">{mediaEvents?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-8">
            <button
              onClick={() => setActiveTab('members')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'members'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="h-5 w-5" />
              Members
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'media'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <ImageIcon className="h-5 w-5" />
              Media Management
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'members' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                {(['all', 'approved', 'pending'] as MemberFilter[]).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setMemberFilter(filter)}
                    className={`px-4 py-2 rounded-lg font-medium capitalize ${
                      memberFilter === filter
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Members Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {membersLoading ? (
                <div className="p-8 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto" />
                </div>
              ) : filteredMembers && filteredMembers.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Member
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registered
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                <span className="text-purple-600 font-medium">
                                  {member.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{member.name}</div>
                              <div className="text-sm text-gray-500">{member.address}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{member.email}</div>
                          <div className="text-sm text-gray-500">{member.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(new Date(member.joinDate), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              member.isApproved
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {member.isApproved ? (
                              <>
                                <CheckCircle className="h-3 w-3" />
                                Approved
                              </>
                            ) : (
                              <>
                                <Clock className="h-3 w-3" />
                                Pending
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                approvalMutation.mutate({
                                  email: member.email,
                                  isApproved: !member.isApproved,
                                })
                              }
                              disabled={approvalMutation.isLoading}
                              className={`p-2 rounded-lg transition-colors ${
                                member.isApproved
                                  ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                                  : 'bg-green-100 text-green-600 hover:bg-green-200'
                              }`}
                              title={member.isApproved ? 'Revoke approval' : 'Approve member'}
                            >
                              {member.isApproved ? (
                                <X className="h-4 w-4" />
                              ) : (
                                <Check className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete ${member.name}?`)) {
                                  deleteMemberMutation.mutate(member.email);
                                }
                              }}
                              disabled={deleteMemberMutation.isLoading}
                              className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                              title="Delete member"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No members found matching your criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="space-y-6">
            {/* Create New Event */}
            <div className="bg-white rounded-lg shadow p-6">
              {!showNewEventForm ? (
                <button
                  onClick={() => setShowNewEventForm(true)}
                  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  Create New Media Event
                </button>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Create New Media Event</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Event Title
                      </label>
                      <input
                        type="text"
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                        placeholder="e.g., Youth Day 2025"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Event Date
                      </label>
                      <input
                        type="date"
                        value={newEventDate}
                        onChange={(e) => setNewEventDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={newEventDescription}
                      onChange={(e) => setNewEventDescription(e.target.value)}
                      placeholder="Brief description of the event..."
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => createEventMutation.mutate()}
                      disabled={!newEventTitle || !newEventDate || createEventMutation.isLoading}
                      className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {createEventMutation.isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Save className="h-5 w-5" />
                      )}
                      Create Event
                    </button>
                    <button
                      onClick={() => {
                        setShowNewEventForm(false);
                        setNewEventTitle('');
                        setNewEventDescription('');
                        setNewEventDate('');
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Events List */}
            <div className="space-y-4">
              {eventsLoading ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto" />
                </div>
              ) : mediaEvents && mediaEvents.length > 0 ? (
                mediaEvents.map((event) => {
                  const isExpanded = expandedEventId === event.id;
                  const items = eventMediaItems[event.id] || [];
                  const isLoadingItems = loadingEventMedia === event.id;

                  return (
                    <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden">
                      {/* Event Header */}
                      <div className="px-6 py-4 flex items-center justify-between">
                        <button
                          onClick={() => toggleEvent(event.id)}
                          className="flex items-center gap-4 flex-1 text-left"
                        >
                          <div className="bg-purple-100 rounded-lg p-3">
                            <Calendar className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                            <p className="text-sm text-gray-500">
                              {format(new Date(event.eventDate), 'EEEE, MMMM d, yyyy')}
                            </p>
                            {event.description && (
                              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                            )}
                          </div>
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              deleteEventMutation.mutate({
                                eventId: event.id,
                                partitionKey: event.partitionKey || '',
                              })
                            }
                            disabled={deleteEventMutation.isLoading}
                            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                            title="Delete event"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button onClick={() => toggleEvent(event.id)} className="p-2">
                            {isExpanded ? (
                              <ChevronUp className="h-5 w-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Event Content */}
                      {isExpanded && (
                        <div className="border-t border-gray-200 p-6">
                          {/* Upload Form */}
                          {uploadingToEvent === event.id ? (
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                              <h4 className="font-medium mb-4">Upload Media</h4>
                              <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Title
                                    </label>
                                    <input
                                      type="text"
                                      value={uploadTitle}
                                      onChange={(e) => setUploadTitle(e.target.value)}
                                      placeholder="Media title"
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Type
                                    </label>
                                    <select
                                      value={uploadType}
                                      onChange={(e) => setUploadType(e.target.value as 'image' | 'video')}
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    >
                                      <option value="image">Image (JPG, PNG)</option>
                                      <option value="video">Video (MP4)</option>
                                    </select>
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description (optional)
                                  </label>
                                  <input
                                    type="text"
                                    value={uploadDescription}
                                    onChange={(e) => setUploadDescription(e.target.value)}
                                    placeholder="Brief description"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    File
                                  </label>
                                  <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept={uploadType === 'image' ? 'image/jpeg,image/png,image/jpg' : 'video/mp4'}
                                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleUpload(event.id)}
                                    disabled={!uploadFile || !uploadTitle || isUploading}
                                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    {isUploading ? (
                                      <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                      <Upload className="h-5 w-5" />
                                    )}
                                    Upload
                                  </button>
                                  <button
                                    onClick={() => {
                                      setUploadingToEvent(null);
                                      setUploadTitle('');
                                      setUploadDescription('');
                                      setUploadFile(null);
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setUploadingToEvent(event.id)}
                              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mb-6"
                            >
                              <Upload className="h-5 w-5" />
                              Upload Media to this Event
                            </button>
                          )}

                          {/* Media Items */}
                          {isLoadingItems ? (
                            <div className="text-center py-8">
                              <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto" />
                            </div>
                          ) : items.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                              No media items yet. Upload some photos or videos!
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {items.map((item) => (
                                <div
                                  key={item.id}
                                  className="relative group bg-gray-100 rounded-lg overflow-hidden"
                                >
                                  {item.type === 'image' ? (
                                    <img
                                      src={item.url}
                                      alt={item.title}
                                      className="w-full h-32 object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-32 flex items-center justify-center bg-gray-200">
                                      <Film className="h-8 w-8 text-gray-400" />
                                    </div>
                                  )}
                                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity flex items-center justify-center">
                                    <button
                                      onClick={() => {
                                        if (confirm('Delete this media item?')) {
                                          deleteMediaMutation.mutate({
                                            itemId: item.id,
                                            eventId: event.id,
                                          });
                                        }
                                      }}
                                      className="opacity-0 group-hover:opacity-100 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                  <div className="p-2">
                                    <p className="text-xs font-medium text-gray-900 truncate">
                                      {item.title}
                                    </p>
                                    <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                  <FolderOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No media events yet. Create your first event above!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
