import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FaDownload, FaSpinner, FaChevronDown } from 'react-icons/fa'

function PreviewPage() {
  const current_page = useLocation()
  const go_to = useNavigate()
  const course_data = current_page.state?.courseData
  const [downloading, set_downloading] = useState(false)

  if (!course_data) {
    return (
      <div className="py-20 text-center">
        <h2 className="heading-md mb-4">No course data found</h2>
        <p className="text-muted mb-8">Please generate a course first</p>
        <button 
          onClick={() => go_to('/create')} 
          className="btn btn-primary"
        >
          Create Course
        </button>
      </div>
    )
  }

  const download_file = async () => {
    set_downloading(true)
    try {
      const pdf_id = course_data.request_id || course_data.uuid || course_data.id
      if (!pdf_id) {
        alert('Unable to download PDF: Missing request ID')
        return
      }
      const response = await fetch(`http://localhost:8000/api/pdf/${pdf_id}/`)
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${course_data.topic.replace(/[^a-zA-Z0-9]/g, '_')}_course.pdf`
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
      console.error('Download error:', error)
      alert('Failed to download PDF: ' + error.message)
    } finally {
      set_downloading(false)
    }
  }

  return (
    <div className="py-16">
      <div className="flex items-center justify-between mb-16">
        <div>
          <h1 className="heading-lg mb-2">{course_data.topic}</h1>
          <p className="text-muted">
            For {course_data.audience} • {course_data.modules?.length || 0} modules
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => go_to('/create')} 
            className="btn btn-secondary"
          >
            Create Another
          </button>
          <button 
            onClick={download_file}
            disabled={downloading}
            className="btn btn-primary"
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {downloading ? (
              <>
                <FaSpinner className="animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <FaDownload />
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <div className="card sticky top-8">
            <h3 className="heading-sm mb-6">Course Overview</h3>
            
            <div className="mb-6">
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Topic</h4>
              <p className="text-muted">{course_data.topic}</p>
            </div>

            <div className="mb-6">
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Audience</h4>
              <p className="text-muted" style={{ textTransform: 'capitalize' }}>
                {course_data.audience}
              </p>
            </div>

            <div className="mb-6">
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Design</h4>
              <p className="text-muted" style={{ textTransform: 'capitalize' }}>
                {course_data.design} theme
              </p>
            </div>

            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Generated</h4>
              <p className="text-muted">
                {new Date(course_data.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="mb-8">
            <h3 className="heading-md mb-2">Course Modules</h3>
            <p className="text-muted">
              Click on any module to expand and view the content
            </p>
          </div>

          <div className="space-y-6">
            {course_data.ai_payload?.modules?.map((module, index) => (
              <details key={index} className="card">
                <summary 
                  className="cursor-pointer flex items-center justify-between py-3"
                  style={{ outline: 'none' }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="btn-primary"
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                        {module.title}
                      </h4>
                      <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                        {(module.objectives || module.learning_objectives)?.length || 0} learning objectives
                      </p>
                    </div>
                  </div>
                  <FaChevronDown className="text-muted" />
                </summary>

                <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                  {module.overview && (
                    <div className="mb-8">
                      <h5 style={{ fontWeight: '600', marginBottom: '1rem' }}>
                        Overview
                      </h5>
                      <p className="text-muted leading-relaxed">
                        {module.overview}
                      </p>
                    </div>
                  )}

                  {(module.objectives || module.learning_objectives) && (module.objectives || module.learning_objectives).length > 0 && (
                    <div className="mb-8">
                      <h5 style={{ fontWeight: '600', marginBottom: '1rem' }}>
                        Learning Objectives
                      </h5>
                      <ul className="space-y-3">
                        {(module.objectives || module.learning_objectives).map((objective, obj_index) => (
                          <li key={obj_index} className="flex items-start gap-3">
                            <span className="text-primary">•</span>
                            <span className="text-muted">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {module.key_topics && module.key_topics.length > 0 && (
                    <div className="mb-8">
                      <h5 style={{ fontWeight: '600', marginBottom: '1rem' }}>
                        Key Topics
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {module.key_topics.map((topic, topic_index) => (
                          <span 
                            key={topic_index}
                            className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {module.activities && module.activities.length > 0 && (
                    <div className="mb-8">
                      <h5 style={{ fontWeight: '600', marginBottom: '1rem' }}>
                        Activities
                      </h5>
                      <ul className="space-y-3">
                        {module.activities.map((activity, activity_index) => (
                          <li key={activity_index} className="flex items-start gap-3">
                            <span className="text-primary">→</span>
                            <span className="text-muted">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {module.resources && module.resources.length > 0 && (
                    <div>
                      <h5 style={{ fontWeight: '600', marginBottom: '1rem' }}>
                        Resources
                      </h5>
                      <ul className="space-y-3">
                        {module.resources.map((resource, resource_index) => (
                          <li key={resource_index} className="flex items-start gap-3">
                            <span className="text-primary">📚</span>
                            <span className="text-muted">{resource}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewPage 