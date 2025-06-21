import { useState } from 'react'
import axios from 'axios'
import { FaSpinner } from 'react-icons/fa'

function CourseForm({ on_course_generated, loading, set_loading }) {
  const [form_data, set_form_data] = useState({
    topic: '',
    audience: 'beginners',
    modules: [],
    design: 'elegant'
  })
  const [error, set_error] = useState('')

  const change_input = (e) => {
    const { name, value } = e.target
    set_form_data(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const change_module = (index, value) => {
    const new_modules = [...form_data.modules]
    new_modules[index] = value
    set_form_data(prev => ({
      ...prev,
      modules: new_modules
    }))
  }

  const add_module = () => {
    set_form_data(prev => ({
      ...prev,
      modules: [...prev.modules, '']
    }))
  }

  const remove_module = (index) => {
    set_form_data(prev => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index)
    }))
  }

  const send_form = async (e) => {
    e.preventDefault()
    set_error('')

    if (!form_data.topic.trim()) {
      set_error('Please enter a course topic')
      return
    }

    if (form_data.modules.length === 0 || form_data.modules.some(m => !m.trim())) {
      set_error('Please add at least one module with a title')
      return
    }

    set_loading(true)

    try {
      const request_data = {
        topic: form_data.topic,
        audience: form_data.audience,
        modules: form_data.modules.filter(m => m.trim()),
        design: form_data.design
      }
      
      console.log('Sending request:', request_data)
      
      const response = await axios.post('http://localhost:8000/api/generate/', request_data)
      
      console.log('Received response:', response.data)
      
      on_course_generated(response.data)
    } catch (error) {
      console.error('Error generating course:', error)
      set_error('Failed to generate course. Please try again.')
    } finally {
      set_loading(false)
    }
  }

  return (
    <form onSubmit={send_form} className="card">
      <div className="form-group">
        <label className="label">What's your course topic?</label>
        <input
          type="text"
          name="topic"
          value={form_data.topic}
          onChange={change_input}
          placeholder="e.g., Introduction to Web Development"
          className="input"
          required
        />
      </div>

      <div className="form-group">
        <label className="label">Who is your target audience?</label>
        <div className="radio-group">
          {[
            { value: 'beginners', label: '🌱 Beginners', desc: 'New to the topic' },
            { value: 'intermediate', label: '📈 Intermediate', desc: 'Some experience' },
            { value: 'advanced', label: '🚀 Advanced', desc: 'Experienced learners' },
            { value: 'professionals', label: '💼 Professionals', desc: 'Working experts' }
          ].map(option => (
            <label key={option.value} className="radio-option">
              <input
                type="radio"
                name="audience"
                value={option.value}
                checked={form_data.audience === option.value}
                onChange={change_input}
              />
              <div className="radio-card">
                <div>
                  <div className="radio-label" style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                    {option.label}
                  </div>
                  <div className="radio-desc">
                    {option.desc}
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <div className="flex items-center justify-between mb-4">
          <label className="label" style={{ margin: 0 }}>Course Modules(Minimum 3)</label>
          <button
            type="button"
            onClick={add_module}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
          >
            + Add Module
          </button>
        </div>
        
        {form_data.modules.length === 0 && (
          <div 
            className="text-center py-8" 
            style={{ 
              border: '2px dashed var(--border)', 
              borderRadius: '0.75rem',
              color: 'var(--text-muted)'
            }}
          >
            <p>Click "Add Module" to start adding course modules</p>
          </div>
        )}

        {form_data.modules.map((module, index) => (
          <div key={index} className="flex gap-3 mb-3">
            <input
              type="text"
              value={module}
              onChange={(e) => change_module(index, e.target.value)}
              placeholder={`Module ${index + 1} title`}
              className="input"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={() => remove_module(index)}
              className="btn btn-secondary"
              style={{ padding: '0.75rem', color: 'var(--danger)' }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="form-group">
        <label className="label">Choose a design template</label>
        <div className="template-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1rem' 
        }}>
          {[
            { value: 'classic', label: '📝 Classic', desc: 'Clean and traditional serif design' },
            { value: 'modern', label: '✨ Modern', desc: 'Colorful and vibrant layout' },
            { value: 'dark', label: '🌙 Dark', desc: 'Sleek dark theme with neon accents' },
            { value: 'elegant', label: '🎨 Elegant', desc: 'Sophisticated with subtle gradients' },
            { value: 'corporate', label: '💼 Corporate', desc: 'Professional blue business style' },
            { value: 'creative', label: '🌈 Creative', desc: 'Artistic with rainbow gradients' },
            { value: 'minimalist', label: '⚪ Minimalist', desc: 'Clean lines and lots of white space' },
            { value: 'academic', label: '🎓 Academic', desc: 'Scholarly university-style layout' },
            { value: 'magazine', label: '📰 Magazine', desc: 'Modern magazine-style design' },
            { value: 'tech', label: '💻 Tech', desc: 'Futuristic terminal-inspired theme' }
          ].map(option => (
            <label key={option.value} className="radio-option template-option">
              <input
                type="radio"
                name="design"
                value={option.value}
                checked={form_data.design === option.value}
                onChange={change_input}
              />
              <div className="radio-card template-card">
                <div>
                  <div className="radio-label" style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: '600' }}>
                    {option.label}
                  </div>
                  <div className="radio-desc" style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
                    {option.desc}
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div 
          className="mb-6 p-4"
          style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid var(--danger)',
            borderRadius: '0.75rem',
            color: 'var(--danger)'
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
        style={{ 
          width: '100%', 
          padding: '1rem',
          fontSize: '1.1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin" />
            Generating Course...
          </>
        ) : (
          'Generate Course'
        )}
      </button>
    </form>
  )
}

export default CourseForm 