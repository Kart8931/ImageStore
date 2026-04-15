import { useState, useEffect } from 'react';
import API from '../api/axios';

const Dashboard = () => {
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [currentFolder, setCurrentFolder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const parentId = currentFolder ? currentFolder._id : 'root';
      const folderRes = await API.get(`/folders?parentId=${parentId === 'root' ? '' : parentId}`);
      setFolders(folderRes.data);

      if (currentFolder) {
        const imageRes = await API.get(`/images/${currentFolder._id}`);
        setImages(imageRes.data);
      } else {
        setImages([]);
      }
    } catch (err) {
      console.error("Data fetch error", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentFolder]);

  const handleCreateFolder = async () => {
    if (!folderName.trim()) return;
    try {
      await API.post('/folders', { name: folderName, parentId: currentFolder?._id });
      setFolderName('');
      fetchData();
    } catch (err) { alert("Error!"); }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folderId', currentFolder._id);
    try {
      await API.post('/images/upload', formData);
      fetchData();
    } catch (err) { alert("Upload failed"); }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Pakka delete karna hai?")) return;
    try {
      await API.delete(`/${type}/${id}`);
      fetchData();
    } catch (err) { alert("Delete failed"); }
  };

  // Search Logic
  const filteredFolders = folders.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredImages = images.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-10 text-blue-400">Dobby Ads</h1>
        <div onClick={() => setCurrentFolder(null)} className={`p-2 rounded cursor-pointer ${!currentFolder ? 'bg-blue-600' : ''}`}>📁 My Drive</div>
      </div>

      <div className="flex-1">
        {/* Topbar */}
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {currentFolder && <button onClick={() => setCurrentFolder(null)} className="text-blue-600 mr-2">← Back</button>}
            <h2 className="text-xl font-semibold">{currentFolder ? currentFolder.name : "My Drive"}</h2>
          </div>
          <button onClick={() => {localStorage.clear(); window.location.href='/login'}} className="text-red-500">Logout</button>
        </header>

        <main className="p-8">
          {/* Search bar */}
          <input 
            type="text" 
            placeholder="Search folders or images..." 
            className="w-full max-w-md mb-8 p-2 border rounded-full px-4"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Controls */}
          <div className="flex gap-4 mb-8">
            <input type="text" className="border p-2 rounded" placeholder="New folder..." value={folderName} onChange={(e)=>setFolderName(e.target.value)} />
            <button onClick={handleCreateFolder} className="bg-blue-600 text-white px-4 py-2 rounded">+ Folder</button>
            {currentFolder && (
               <label className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer">
                 📤 Upload <input type="file" className="hidden" onChange={handleImageUpload} />
               </label>
            )}
          </div>

          {/* List Folders */}
          <div className="grid grid-cols-4 gap-4 mb-10">
            {filteredFolders.map(f => (
              <div key={f._id} className="relative bg-white p-4 border rounded shadow hover:border-blue-500 group">
                <div onClick={() => setCurrentFolder(f)} className="cursor-pointer text-center">
                  <span className="text-4xl block">📁</span>
                  <p className="truncate mt-2">{f.name}</p>
                </div>
                <button onClick={() => handleDelete(f._id, 'folders')} className="absolute top-1 right-1 hidden group-hover:block text-red-500 text-xs">✕</button>
              </div>
            ))}
          </div>

          {/* List Images */}
          <div className="grid grid-cols-6 gap-4">
            {filteredImages.map(img => (
              <div key={img._id} className="relative group bg-white p-2 border rounded shadow">
                <img src={`https://imagestore-2.onrender.com${img.imageUrl}`} className="w-full h-24 object-cover rounded" />
                <button onClick={() => handleDelete(img._id, 'images')} className="absolute top-1 right-1 hidden group-hover:block bg-red-500 text-white rounded-full w-5 h-5 text-[10px]">✕</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;