import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseForm from '../components/CourseForm'

function CreatePage() {
  const [course_data, set_course_data] = useState(null)
  const [loading, set_loading] = useState(false)
  const go_to = useNavigate()

  const course_ready = (data) => {
    set_course_data(data)
    go_to('/preview', { state: { courseData: data } })
  }

  return (
    <div className="py-16">
      <div className="text-center mb-16">
        <h1 className="heading-lg mb-4">Create Your Course</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto', marginBottom: '2rem'}}>
          Fill out the form below and our AI will generate a complete course outline for you
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <CourseForm 
          on_course_generated={course_ready} 
          loading={loading}
          set_loading={set_loading}
        />
      </div>
    </div>
  )
}

export default CreatePage 