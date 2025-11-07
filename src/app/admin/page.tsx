'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { db, storage } from '@/lib/firebase'
import { Trash2, Edit2, PlusCircle, Settings, Users, MessageSquare, FolderOpen, Database, BarChart3, Download, Upload } from 'lucide-react'
import Image from 'next/image'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Toaster, toast } from 'react-hot-toast'

type Project = any
type Message = any
type Testimonial = any

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [databaseStats, setDatabaseStats] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')
  const [form, setForm] = useState<any>({ title: '', description: '', techStack: [], images: [], githubUrl: '', liveDemoUrl: '' })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'dashboard'|'projects'|'messages'|'testimonials'|'database'>('dashboard')
  const lastMessagesRef = useRef<Record<string, boolean>>({})
  const messagesInitRef = useRef<Record<string, boolean>>({})

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(data || [])
    } catch (err) {
      console.error(err)
      setProjects([])
    } finally { setLoading(false) }
  }, [])

  const fetchMessages = useCallback(async () => {
    if (!token) return
    setLoading(true)
    try {
      const res = await fetch('/api/messages/admin', { headers: { 'x-admin-token': token } })
      if (!res.ok) {
        console.error('Failed to fetch messages:', res.status, res.statusText)
        throw new Error('Unauthorized')
      }
      const data = await res.json()
      console.log('Fetched messages:', data)

      const seen = lastMessagesRef.current
      const updated = data.map((m:any) => ({ ...m, _isNew: !seen[m.id] }))
      data.forEach((m:any) => { seen[m.id] = true })
      lastMessagesRef.current = seen

      setMessages(updated)
    } catch (err) {
      console.error('Error fetching messages:', err)
      setMessages([])
    } finally { setLoading(false) }
  }, [token])

  const fetchTestimonials = useCallback(async () => {
    if (!token) return
    setLoading(true)
    try {
      const res = await fetch('/api/testimonials')
      if (res.ok) {
        const data = await res.json()
        setTestimonials(data)
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err)
    } finally {
      setLoading(false)
    }
  }, [token])

  const fetchDatabaseStats = useCallback(async () => {
    if (!token) return
    try {
      const res = await fetch('/api/admin/stats', { headers: { 'x-admin-token': token } })
      if (res.ok) {
        const data = await res.json()
        setDatabaseStats(data)
      }
    } catch (err) {
      console.error('Error fetching database stats:', err)
    }
  }, [token])

  useEffect(() => {
    const saved = localStorage.getItem('admin_token') || ''
    setToken(saved)

    // variables to hold unsubscribe functions and interval id
    let unsubProjects: (() => void) | null = null
    const unsubscribers: Array<() => void> = []
    let intervalId: number | null = null

    // load initial data when token exists
    if (saved) {
      ;(async () => {
        try {
          await Promise.all([
            fetchProjects(),
            fetchMessages(),
            fetchTestimonials(),
            fetchDatabaseStats()
          ])
        } catch (err) {
          console.warn('Initial data load failed', err)
        }
      })()

      // Real-time listeners
      try {
        const projectsRef = collection(db, 'projects')
        unsubProjects = onSnapshot(projectsRef, (snap) => {
          const arr: any[] = []
          snap.forEach(d => arr.push({ id: d.id, ...d.data() }))
          arr.sort((a, b) => {
            const ta = a.createdAt?.seconds ? a.createdAt.seconds*1000 : (a.createdAt ? new Date(a.createdAt).getTime() : 0)
            const tb = b.createdAt?.seconds ? b.createdAt.seconds*1000 : (b.createdAt ? new Date(b.createdAt).getTime() : 0)
            return tb - ta
          })
          setProjects(arr)
        }, (err)=>console.warn('projects listener err', err))
      } catch (e) {
        console.warn('projects listener setup failed', e)
      }

      try {
        const messagesCollections = ['contact_messages', 'messages']
        for (const col of messagesCollections) {
          try {
            const ref = collection(db, col)
            const unsub = onSnapshot(ref, (snap) => {
              const isInitial = !messagesInitRef.current[col]
              if (!messagesInitRef.current[col]) messagesInitRef.current[col] = true
              if (!isInitial) {
                try {
                  snap.docChanges().forEach((change) => {
                    const data: any = change.doc.data()
                    const who = data?.name || data?.email || 'Someone'
                    if (change.type === 'added') {
                      toast.success(`New message from ${who}`)
                    } else if (change.type === 'modified') {
                      toast(`Message updated from ${who}`, { icon: '✏️' })
                    } else if (change.type === 'removed') {
                      toast.error(`Message deleted (${who})`)
                    }
                  })
                } catch (e) {
                  console.warn('toast notify failed', e)
                }
              }
              fetchMessages()
            }, (err)=>console.warn(`listener ${col} err`, err))
            unsubscribers.push(unsub)
          } catch(e) {
            console.warn('listener setup failed for', col, e)
          }
        }
      } catch (e) {
        console.warn('messages listeners setup failed', e)
      }

      // Periodic refresh
      intervalId = window.setInterval(() => {
        if (localStorage.getItem('admin_token')) {
          fetchMessages()
          fetchDatabaseStats()
        }
      }, 5000)
    }

    // cleanup
    return () => {
      try {
        if (intervalId) window.clearInterval(intervalId)
      } catch(e) {}
      try { if (unsubProjects) unsubProjects() } catch(e) {}
      for (const u of unsubscribers) try { u() } catch(e) {}
    }
  }, [token, fetchProjects, fetchMessages, fetchTestimonials, fetchDatabaseStats])

  const totalProjects = projects?.length || 0
  const unreadMessages = messages?.filter(m => m._isNew).length || 0

  // Export data function
  const exportData = async (collection: string) => {
    if (!token) {
      alert('Please enter admin token first')
      return
    }
    try {
      const res = await fetch(`/api/admin/export/${collection}`, {
        headers: { 'x-admin-token': token }
      })
      if (!res.ok) throw new Error('Export failed')
      const data = await res.json()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${collection}_${new Date().toISOString().split('T')[0]}.json`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Export failed:', err)
      alert('Failed to export data')
    }
  }

  // Project management functions
  const startEdit = (project: any) => {
    setEditingId(project.id)
    setForm({
      title: project.title,
      description: project.description,
      techStack: project.techStack || [],
      images: project.images || [],
      githubUrl: project.githubUrl || '',
      liveDemoUrl: project.liveDemoUrl || ''
    })
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

  const uploadImageOrBase64 = async (file: File): Promise<string> => {
    try {
      const path = `projects/${Date.now()}_${file.name}`
      const refObj = storageRef(storage, path)
      await uploadBytes(refObj, file)
      const url = await getDownloadURL(refObj)
      return url
    } catch (e) {
      try {
        const dataUrl = await toBase64(file)
        return dataUrl
      } catch (err) {
        throw err
      }
    }
  }

  const onSelectImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    setLoading(true)
    try {
      const uploaded: string[] = []
      for (const f of files) {
        const url = await uploadImageOrBase64(f)
        uploaded.push(url)
      }
      setForm({ ...form, images: [...(form.images || []), ...uploaded] })
    } catch (err) {
      console.error('Image upload failed', err)
      alert('Failed to add images')
    } finally {
      setLoading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) {
      alert('Please enter admin token first')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/projects/admin`, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token
        },
        body: JSON.stringify(editingId ? { id: editingId, ...form } : form)
      })
      if (!res.ok) throw new Error('Failed to save project')
      setForm({ title: '', description: '', techStack: [], images: [], githubUrl: '', liveDemoUrl: '' })
      setEditingId(null)
      await fetchProjects()
    } catch (err) {
      console.error('Save failed:', err)
      alert('Failed to save project')
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = async (id: string) => {
    if (!token || !window.confirm('Are you sure you want to delete this project?')) return
    setLoading(true)
    try {
      const res = await fetch(`/api/projects/admin?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token }
      })
      if (!res.ok) throw new Error('Failed to delete project')
      await fetchProjects()
    } catch (err) {
      console.error('Delete failed:', err)
      alert('Failed to delete project')
    } finally {
      setLoading(false)
    }
  }

  // Message management functions
  const deleteMessage = async (id: string, type: string = 'contact_messages') => {
    if (!token || !window.confirm('Are you sure you want to delete this message?')) return
    setLoading(true)
    try {
      const res = await fetch(`/api/messages/${id}?type=${type}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token }
      })
      if (!res.ok) throw new Error('Failed to delete message')
      await fetchMessages()
    } catch (err) {
      console.error('Delete failed:', err)
      alert('Failed to delete message')
    } finally {
      setLoading(false)
    }
  }

  // Testimonial management functions
  const deleteTestimonial = async (id: string) => {
    if (!token || !window.confirm('Are you sure you want to delete this testimonial?')) return
    setLoading(true)
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token }
      })
      if (!res.ok) throw new Error('Failed to delete testimonial')
      await fetchTestimonials()
    } catch (err) {
      console.error('Delete failed:', err)
      alert('Failed to delete testimonial')
    } finally {
      setLoading(false)
    }
  }

  // Test message function
  const testMessage = async () => {
    if (!token) {
      alert('Please enter admin token first')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/admin/test', {
        headers: { 'x-admin-token': token }
      })
      const data = await res.json()
      alert(data.message || 'Connection successful')
    } catch (err) {
      console.error('Test failed:', err)
      alert('Connection test failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Image
              src="/assets/appkraft_logo-removebg-preview.png"
              alt="AppSetz Logo"
              width={32}
              height={32}
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
            />
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            <input 
              type="password"
              value={token} 
              onChange={(e) => { setToken(e.target.value); localStorage.setItem('admin_token', e.target.value) }} 
              placeholder="Enter admin token" 
              className="bg-gray-800 border border-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg focus:outline-none focus:border-white transition-colors placeholder-gray-400 text-sm sm:text-base" 
            />
            <button 
              onClick={() => { fetchProjects(); fetchMessages(); fetchTestimonials(); fetchDatabaseStats() }} 
              className="px-4 py-2 bg-white hover:bg-gray-100 text-black font-medium rounded-lg transition-colors text-sm sm:text-base"
            >
              Load All
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="lg:col-span-3">
            {/* Navigation */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
              <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                <button 
                  onClick={() => setActiveTab('dashboard')} 
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base ${
                    activeTab==='dashboard' ? 'bg-white text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Overview</span>
                </button>
                <button 
                  onClick={() => setActiveTab('projects')} 
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base ${
                    activeTab==='projects' ? 'bg-white text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <FolderOpen className="w-4 h-4" />
                  <span>Projects</span>
                </button>
                <button 
                  onClick={() => setActiveTab('messages')} 
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base ${
                    activeTab==='messages' ? 'bg-white text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Messages</span>
                  {(unreadMessages || 0) > 0 && (
                    <span className="ml-2 inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {unreadMessages}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab('testimonials')} 
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base ${
                    activeTab==='testimonials' ? 'bg-white text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Testimonials</span>
                </button>
                <button 
                  onClick={() => setActiveTab('database')} 
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base ${
                    activeTab==='database' ? 'bg-white text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span>Database</span>
                </button>
              </nav>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                    <div className="text-xs sm:text-sm text-gray-300">Projects: <strong className="text-white">{totalProjects}</strong></div>
                    <div className="text-xs sm:text-sm text-gray-300">Messages: <strong className="text-white">{messages?.length || 0}</strong></div>
                    <div className="text-xs sm:text-sm text-gray-300">Testimonials: <strong className="text-white">{testimonials?.length || 0}</strong></div>
              </div>
            </div>

            {/* Main content */}
            <div className="bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-700 p-4 sm:p-6">
              {activeTab === 'dashboard' && (
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Database Overview</h2>
                  
                  {/* Database Statistics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="p-4 sm:p-6 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="flex items-center space-x-3 mb-2">
                        <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                        <div className="text-xs sm:text-sm text-gray-400">Projects</div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-white">{databaseStats.stats?.projects?.total || 0}</div>
                      <div className="text-xs text-gray-500">Recent: {databaseStats.stats?.projects?.recent || 0}</div>
                    </div>
                    <div className="p-4 sm:p-6 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="flex items-center space-x-3 mb-2">
                        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                        <div className="text-xs sm:text-sm text-gray-400">Messages</div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-white">{databaseStats.stats?.contact_messages?.total || 0}</div>
                      <div className="text-xs text-gray-500">Recent: {databaseStats.stats?.contact_messages?.recent || 0}</div>
                    </div>
                    <div className="p-4 sm:p-6 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="flex items-center space-x-3 mb-2">
                        <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                        <div className="text-xs sm:text-sm text-gray-400">Testimonials</div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-white">{databaseStats.stats?.testimonials?.total || 0}</div>
                      <div className="text-xs text-gray-500">Recent: {databaseStats.stats?.testimonials?.recent || 0}</div>
                    </div>
                    <div className="p-4 sm:p-6 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="flex items-center space-x-3 mb-2">
                        <Database className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                        <div className="text-xs sm:text-sm text-gray-400">Total Docs</div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-white">{databaseStats.totals?.totalDocuments || 0}</div>
                      <div className="text-xs text-gray-500">Collections: {databaseStats.totals?.collections || 0}</div>
                    </div>
                  </div>

                </div>
              )}

              {/* Database Management Tab */}
              {activeTab === 'database' && (
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Database Management</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <h3 className="font-semibold text-white mb-3">Export Data</h3>
                      <div className="space-y-2">
                        <button 
                          onClick={() => exportData('projects')}
                          className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors text-sm flex items-center justify-center"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export Projects
                        </button>
                        <button 
                          onClick={() => exportData('testimonials')}
                          className="w-full px-3 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors text-sm flex items-center justify-center"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export Testimonials
                        </button>
                        <button 
                          onClick={() => exportData('contact_messages')}
                          className="w-full px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors text-sm flex items-center justify-center"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export Messages
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <h3 className="font-semibold text-white mb-3">Database Stats</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Documents:</span>
                          <span className="text-white font-semibold">{databaseStats.totals?.totalDocuments || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Recent (7 days):</span>
                          <span className="text-white font-semibold">{databaseStats.totals?.recentDocuments || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Collections:</span>
                          <span className="text-white font-semibold">{databaseStats.totals?.collections || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Last Updated:</span>
                          <span className="text-white font-semibold">
                            {databaseStats.timestamp ? new Date(databaseStats.timestamp).toLocaleTimeString() : 'Never'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Testimonials Tab */}
              {activeTab === 'testimonials' && (
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Testimonials Management</h2>
                  <div className="space-y-3 sm:space-y-4">
                    {(!testimonials || testimonials.length === 0) && <div className="text-gray-400 text-center py-6 sm:py-8">No testimonials</div>}
                    {(testimonials || []).map((t: any) => (
                      <div key={t.id} className="bg-gray-800 rounded-lg border border-gray-700 p-3 sm:p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-white">{t.name}</h3>
                            <p className="text-sm text-gray-400">{t.role}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-sm ${i < t.rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
                              ))}
                            </div>
                          </div>
                          <button 
                            onClick={() => deleteTestimonial(t.id)}
                            className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors text-xs sm:text-sm"
                          >
                            Delete
                          </button>
                        </div>
                        <p className="text-gray-300 text-sm sm:text-base">{t.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Projects Management</h2>
                  
                  {/* Project Form */}
                  <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 sm:p-6 mb-6">
                    <h3 className="font-semibold text-white mb-4">{editingId ? 'Edit Project' : 'Create New Project'}</h3>
                    <form onSubmit={saveProject} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Project Title"
                          value={form.title}
                          onChange={(e) => setForm({...form, title: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
                        />
                      </div>
                      <div>
                        <textarea
                          placeholder="Project Description"
                          value={form.description}
                          onChange={(e) => setForm({...form, description: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white resize-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Tech Stack (comma separated)"
                          value={(form.techStack || []).join(', ')}
                          onChange={(e) => setForm({...form, techStack: e.target.value.split(', ').filter(t => t.trim())})}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
                        />
                      </div>
                      {/* Media field removed; using image uploader below */}
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Project Images (16:9)</label>
                        <div className="flex items-center space-x-3">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={onSelectImages}
                            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-600 file:text-white hover:file:bg-gray-500"
                          />
                        </div>
                        {Array.isArray(form.images) && form.images.length > 0 && (
                          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {form.images.map((img: string, idx: number) => (
                              <div key={idx} className="relative rounded-lg overflow-hidden border border-gray-700">
                                <div className="w-full aspect-[16/9] bg-gray-700">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={img} alt={`project-${idx}`} className="w-full h-full object-cover" />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setForm({ ...form, images: form.images.filter((_: string, i: number) => i !== idx) })}
                                  className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white text-xs rounded"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div>
                        <input
                          type="url"
                          placeholder="GitHub URL (optional)"
                          value={form.githubUrl || ''}
                          onChange={(e) => setForm({...form, githubUrl: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
                        />
                      </div>
                      <div>
                        <input
                          type="url"
                          placeholder="Live Demo URL (optional)"
                          value={form.liveDemoUrl || ''}
                          onChange={(e) => setForm({...form, liveDemoUrl: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
                        />
                    </div>
                      <div className="flex space-x-3">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-white hover:bg-gray-100 text-black font-medium rounded-lg transition-colors"
                        >
                          {editingId ? 'Update Project' : 'Create Project'}
                        </button>
                        {editingId && (
                        <button
                          type="button"
                          onClick={() => { setEditingId(null); setForm({ title: '', description: '', techStack: [], images: [], githubUrl: '', liveDemoUrl: '' }) }}
                          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                        )}
                    </div>
                  </form>
                          </div>

                  {/* Projects List */}
                  <div className="space-y-3 sm:space-y-4">
                    {(!projects || projects.length === 0) && <div className="text-gray-400 text-center py-6 sm:py-8">No projects found</div>}
                    {(projects || []).map((p: any) => (
                      <div key={p.id} className="bg-gray-800 rounded-lg border border-gray-700 p-3 sm:p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-start gap-3">
                            {Array.isArray(p.images) && p.images[0] && (
                              <div className="w-24 h-14 rounded overflow-hidden border border-gray-700 flex-shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div>
                              <h3 className="font-semibold text-white">{p.title}</h3>
                              <p className="text-sm text-gray-400">{p.description}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                              {(p.techStack || []).map((tech: string, i: number) => (
                                <span key={i} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                                  {tech}
                                </span>
                              ))}
                              </div>
                              {(p.githubUrl || p.liveDemoUrl) && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                {p.githubUrl && (
                                  <a 
                                    href={p.githubUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-2 py-1 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded transition-colors"
                                  >
                                    GitHub
                                  </a>
                                )}
                                {p.liveDemoUrl && (
                                  <a 
                                    href={p.liveDemoUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors"
                                  >
                                    Live Demo
                                  </a>
                                )}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => startEdit(p)}
                              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors text-xs sm:text-sm"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => deleteProject(p.id)}
                              className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors text-xs sm:text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages Tab */}
              {activeTab === 'messages' && (
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Messages Management</h2>
                  <div className="space-y-3 sm:space-y-4">
                    {(!messages || messages.length === 0) && <div className="text-gray-400 text-center py-6 sm:py-8">No messages found</div>}
                    {(messages || []).map((m: any) => (
                      <div key={m.id} className={`bg-gray-800 rounded-lg border border-gray-700 p-3 sm:p-4 ${m._isNew ? 'border-yellow-500 bg-gray-750' : ''}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-white">{m.name}</h3>
                            <p className="text-sm text-gray-400">{m.email}</p>
                            {m.phone && <p className="text-sm text-gray-400">{m.phone}</p>}
                            <p className="text-xs text-gray-500 mt-1">
                              {m.submittedAt?.seconds ? new Date(m.submittedAt.seconds * 1000).toLocaleString() : 'Unknown date'}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            {m._isNew && <span className="px-2 py-1 bg-yellow-500 text-black text-xs rounded-full">New</span>}
                            <button 
                              onClick={() => deleteMessage(m.id, m.type)}
                              className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors text-xs sm:text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm sm:text-base">{m.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Existing tabs content would go here - Projects, Messages */}
              {/* For brevity, I'm not including the full content of all tabs */}
            </div>
          </div>

          <aside className="bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-700 p-4 sm:p-6">
            <h3 className="font-semibold text-white mb-3 sm:mb-4">Admin Actions</h3>
            <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-gray-600">
              <div className="text-xs text-gray-400 mb-2">
                <div>1. Enter admin token to access</div>
                <div>2. Use tabs to manage content</div>
                <div>3. Delete and update items as needed</div>
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <button 
                onClick={()=>{ localStorage.removeItem('admin_token'); setToken(''); alert('Signed out successfully') }} 
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors text-sm sm:text-base"
              >
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
