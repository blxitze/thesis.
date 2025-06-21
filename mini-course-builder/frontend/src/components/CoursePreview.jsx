import { useState } from 'react'
import { 
  FaCheckCircle, 
  FaClock, 
  FaBadgeCheck, 
  FaDownload, 
  FaSpinner, 
  FaInfoCircle, 
  FaChevronDown,
  FaCheck
} from 'react-icons/fa'

const API_BASE_URL = 'http://localhost:8000/api'

function CoursePreview({ course_data }) {
  const [open_modules, set_open_modules] = useState(new Set([0]))
  const [downloading, set_downloading] = useState(false)
  
  const outline = course_data.ai_payload || course_data.outline || course_data
  const request_id = course_data.request_id || course_data.id

  const toggle_module = (index) => {
    set_open_modules(prev => {
      const new_set = new Set(prev)
      if (new_set.has(index)) {
        new_set.delete(index)
      } else {
        new_set.add(index)
      }
      return new_set
    })
  }

  const open_all = () => {
    set_open_modules(new Set(outline.modules?.map((_, index) => index) || []))
  }

  const close_all = () => {
    set_open_modules(new Set())
  }

  const download_pdf = async () => {
    set_downloading(true)
    try {
      if (!request_id) {
        console.error('No request_id available for PDF download')
        alert('Unable to download PDF: Missing request ID')
        return
      }
      
      const response = await fetch(`${API_BASE_URL}/pdf/${request_id}/`)
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${(outline?.title || 'course').replace(/[^a-zA-Z0-9]/g, '_')}_outline.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      } else {
        const errorText = await response.text()
        console.error('PDF download failed:', response.status, errorText)
        alert('Failed to download PDF: ' + (response.status === 404 ? 'Course not found' : 'Server error'))
      }
    } catch (error) {
      console.error('Error downloading PDF:', error)
      alert('Failed to download PDF: ' + error.message)
    } finally {
      set_downloading(false)
    }
  }

  const total_time = outline.modules?.reduce((total, module) => {
    const match = module.duration?.match(/(\d+)/)
    return total + (match ? parseInt(match[1]) : 0)
  }, 0) || 0

  console.log('=== DEBUG: CoursePreview data structure ===')
  console.log('course_data:', course_data)
  console.log('course_data.ai_payload:', course_data.ai_payload)
  console.log('course_data.outline:', course_data.outline)
  console.log('outline (selected):', outline)
  console.log('outline.modules:', outline?.modules)
  console.log('request_id:', request_id)
  
  if (outline?.modules) {
    console.log('=== DEBUG: Module data in CoursePreview ===')
    console.log('First module data:', outline.modules[0])
    outline.modules.forEach((module, index) => {
      console.log(`Module ${index + 1}:`, {
        title: module.title,
        objectives: module.objectives,
        key_points: module.key_points,
        hasObjectives: !!module.objectives,
        hasKeyPoints: !!module.key_points,
        objectivesLength: module.objectives?.length || 0,
        keyPointsLength: module.key_points?.length || 0
      })
    })
  } else {
    console.log('=== DEBUG: No modules found ===')
    console.log('outline:', outline)
  }

  return (
    <div className="space-y-8">
      <div className="card-web3 hover-lift overflow-hidden relative">
        <div className="bg-primary-gradient p-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full pulse-web3"></div>
                <span className="text-sm font-bold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  ✨ Course Generated Successfully
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                {outline?.title || 'Course Title'}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <FaCheckCircle className="w-5 h-5 text-green-400" />
                  <span className="font-bold text-white">{outline?.modules?.length || 0} Modules</span>
                </div>
                
                <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <FaClock className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold text-white">~{total_time}h Total</span>
                </div>
                
                <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <FaBadgeCheck className="w-5 h-5 text-purple-400" />
                  <span className="font-bold text-white">AI Enhanced</span>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <button
                onClick={download_pdf}
                disabled={downloading || !request_id}
                className="bg-white/20 hover:bg-white/30 disabled:bg-white/10 disabled:text-white/50 text-white font-bold py-4 px-8 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center gap-3 hover-glow group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                {downloading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <FaDownload className="w-6 h-6" />
                    <span>Download PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-success-gradient rounded-xl flex items-center justify-center glow-green">
                <FaInfoCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Course Overview</h2>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed">
              {outline?.overview || 'Course overview will appear here once generated.'}
            </p>
          </div>
        </div>
      </div>

      <div className="card-web3 hover-lift overflow-hidden">
        <div className="bg-secondary-gradient p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <FaCheckCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Training Modules</h2>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={open_all}
                className="text-white/80 hover:text-white font-semibold transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
              >
                Expand All
              </button>
              <div className="w-px h-6 bg-white/30"></div>
              <button
                onClick={close_all}
                className="text-white/80 hover:text-white font-semibold transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="space-y-6">
            {outline?.modules?.map((module, index) => (
              <div
                key={index}
                className="border border-white/10 rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              >
                <button
                  onClick={() => toggle_module(index)}
                  className="w-full px-6 py-6 flex items-center justify-between transition-all duration-300 group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-primary-gradient rounded-2xl flex items-center justify-center text-white font-black text-xl glow-blue group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                        {module.title}
                      </h3>
                      <div className="flex items-center gap-6">
                        <span className="text-sm text-cyan-400 bg-cyan-400/20 px-4 py-2 rounded-full font-bold backdrop-blur-sm">
                          {module.duration}
                        </span>
                        <span className="text-sm text-slate-400 font-medium flex items-center gap-2">
                          <FaCheckCircle className="w-4 h-4" />
                          {(module.objectives?.length || module.key_points?.length || 0)} learning objectives
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-400 font-bold">
                      {open_modules.has(index) ? 'Collapse' : 'Expand'}
                    </span>
                    <FaChevronDown
                      className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${
                        open_modules.has(index) ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                
                {open_modules.has(index) && (
                  <div className="px-6 pb-6">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <FaBadgeCheck className="w-4 h-4 text-purple-400" />
                        </div>
                        <h4 className="text-lg font-bold text-white">Learning Objectives</h4>
                      </div>
                      
                      <div className="space-y-4">
                        {(module.objectives || module.key_points || []).map((objective, obj_index) => (
                          <div key={obj_index} className="flex items-start gap-4 group">
                            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-green-500/30 transition-colors">
                              <FaCheck className="w-3 h-3 text-green-400" />
                            </div>
                            <p className="text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                              {objective}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePreview 