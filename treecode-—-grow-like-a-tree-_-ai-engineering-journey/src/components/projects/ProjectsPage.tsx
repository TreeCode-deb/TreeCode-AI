import React, { useState } from 'react';
import { 
  FolderGit2, 
  Github, 
  ExternalLink, 
  Plus, 
  Edit3, 
  Trash2, 
  Terminal, 
  Check, 
  AlertCircle, 
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';
import { projectAgent, projectDsa, projectAutomation } from '../../data/initialData';

export const ProjectsPage: React.FC = () => {
  const { projects, isAdmin, addProject, updateProject, deleteProject } = useApp();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    demoUrl: '',
    imageUrl: '',
    published: true,
    featured: false,
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Available image presets for easy selection
  const imagePresets = [
    { label: 'AI Agent Architecture', url: projectAgent },
    { label: 'Algorithm Visualizer', url: projectDsa },
    { label: 'Automated Pipeline', url: projectAutomation },
  ];

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      technologies: 'Python 3.13, Data Structures, OOP',
      githubUrl: 'https://github.com/treepilot1212/',
      demoUrl: '',
      imageUrl: projectAgent,
      published: true,
      featured: false,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (proj: Project) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      description: proj.description,
      technologies: proj.technologies.join(', '),
      githubUrl: proj.githubUrl,
      demoUrl: proj.demoUrl || '',
      imageUrl: proj.imageUrl || '',
      published: proj.published,
      featured: proj.featured || false,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setFormError('Project title is required.');
      return;
    }
    if (!formData.description.trim()) {
      setFormError('Project description is required.');
      return;
    }
    if (!formData.githubUrl.trim()) {
      setFormError('GitHub repository URL is required.');
      return;
    }

    const techArray = formData.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingProject) {
      updateProject(editingProject.id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        technologies: techArray,
        githubUrl: formData.githubUrl.trim(),
        demoUrl: formData.demoUrl.trim(),
        imageUrl: formData.imageUrl.trim(),
        published: formData.published,
        featured: formData.featured,
      });
    } else {
      addProject({
        title: formData.title.trim(),
        description: formData.description.trim(),
        technologies: techArray,
        githubUrl: formData.githubUrl.trim(),
        demoUrl: formData.demoUrl.trim(),
        imageUrl: formData.imageUrl.trim(),
        published: formData.published,
        featured: formData.featured,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
    setDeleteConfirmId(null);
  };

  // Only published projects shown to non-admin visitors
  const displayedProjects = isAdmin ? projects : projects.filter((p) => p.published);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-emerald-950/60 pb-8">
        <div>
          <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
            Portfolio Codebase
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Projects
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
            Practical code implementations, algorithms, and experiments developed along my path toward AI Engineering.
          </p>
        </div>

        {/* Admin Action Button */}
        {isAdmin && (
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-all shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)] flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        )}
      </div>

      {/* Projects Grid */}
      {displayedProjects.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-[#09100c] border border-emerald-900/30 text-zinc-400">
          <Terminal className="w-10 h-10 mx-auto text-emerald-500/40 mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No Projects Found</h3>
          <p className="text-xs text-zinc-500">
            {isAdmin ? 'Click "Add Project" above to publish your first repository.' : 'No public projects are published yet. Check back soon!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className={`rounded-2xl bg-[#09110c] border transition-all duration-200 flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                ${project.published ? 'border-emerald-900/30 hover:border-emerald-500/40' : 'border-amber-900/40 bg-[#120f09]'}
              `}
            >
              {/* Image Preview */}
              <div className="relative aspect-video w-full bg-[#060b08] overflow-hidden">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-950/60 to-[#080d0a] text-emerald-400/40">
                    <FolderGit2 className="w-10 h-10" />
                  </div>
                )}
                
                {/* Draft Status Badge for Admin */}
                {isAdmin && !project.published && (
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-amber-500/90 text-amber-950 font-mono text-[10px] font-bold">
                    Draft (Hidden from Visitors)
                  </div>
                )}

                {/* Admin Quick Action Controls */}
                {isAdmin && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEditModal(project)}
                      title="Edit project"
                      className="p-1.5 rounded-lg bg-black/70 hover:bg-black text-zinc-300 hover:text-emerald-300 backdrop-blur-xs border border-white/10"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(project.id)}
                      title="Delete project"
                      className="p-1.5 rounded-lg bg-black/70 hover:bg-black text-zinc-300 hover:text-rose-400 backdrop-blur-xs border border-white/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean Unboxed Metadata */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-emerald-400/80 mb-2 font-mono">
                    {project.technologies.map((t, i) => (
                      <React.Fragment key={t}>
                        <span>{t}</span>
                        {i < project.technologies.length - 1 && <span className="text-zinc-600">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Footer Links */}
                <div className="flex items-center gap-4 pt-3 border-t border-emerald-950/40 text-xs font-medium">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-zinc-300 hover:text-emerald-300 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code Repository</span>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors ml-auto"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="p-6 rounded-2xl bg-[#0b140e] border border-rose-900/40 max-w-sm w-full space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>Confirm Project Deletion</span>
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Are you sure you want to remove this project? This will permanently delete the entry from the authoritative database.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#09110c] border border-emerald-900/50 max-w-lg w-full space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-950/60">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-emerald-400" />
                <span>{editingProject ? 'Edit Project' : 'Add New Project'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/40 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium text-emerald-300 mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Python AI Agent Core"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060b08] border border-emerald-900/40 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-emerald-300 mb-1.5">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the architecture, learning goals, and key implementation details..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060b08] border border-emerald-900/40 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-emerald-300 mb-1.5">
                  Technologies / Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="e.g. Python 3.13, Data Structures, OOP, AsyncIO"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060b08] border border-emerald-900/40 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-emerald-300 mb-1.5">
                    GitHub URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-[#060b08] border border-emerald-900/40 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-emerald-300 mb-1.5">
                    Live Demo URL (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-[#060b08] border border-emerald-900/40 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-emerald-300 mb-1.5">
                  Thumbnail Image Preset
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {imagePresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                      className={`p-1.5 rounded-lg border text-[11px] truncate text-left transition-colors
                        ${formData.imageUrl === preset.url ? 'border-emerald-400 bg-emerald-950/40 text-white' : 'border-emerald-950 bg-[#060b08] text-zinc-400 hover:border-emerald-800'}
                      `}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="Or enter custom image path / URL"
                  className="w-full px-3 py-2 rounded-xl bg-[#060b08] border border-emerald-900/40 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 font-medium">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="accent-emerald-500 w-4 h-4 rounded"
                  />
                  <span>Publish to visitors</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 font-medium">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="accent-emerald-500 w-4 h-4 rounded"
                  />
                  <span>Feature on Home</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-emerald-950/60">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
