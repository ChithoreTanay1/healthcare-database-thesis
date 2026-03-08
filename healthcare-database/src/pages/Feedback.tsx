import { FC, useState } from 'react'
import { useAppStore } from '@/store/appStore'
import { MessageCircle, Eye, Reply, Archive } from 'lucide-react'

const Feedback: FC = () => {
  const { feedbacks } = useAppStore()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'Company Culture', 'Team Leader', 'Benefits', 'Development']
  const filtered = selectedCategory === 'all' ? feedbacks : feedbacks.filter((f) => f.category === selectedCategory)

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="animate-fade-in-down">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-sage-900">New feedback</h1>
            <p className="text-sage-600 mt-1">Review and manage team feedback</p>
          </div>
          <div className="bg-sage-700 text-white px-4 py-2 rounded-lg font-semibold">
            {feedbacks.filter((f) => f.status === 'new').length}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-sage-700 text-white'
                : 'bg-sage-100 text-sage-700 hover:bg-sage-200'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Feedback List */}
      <div className="space-y-4 animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-sage-300 mx-auto mb-4" />
            <p className="text-sage-600">No feedback in this category</p>
          </div>
        ) : (
          filtered.map((feedback) => (
            <div key={feedback.id} className="bg-white rounded-xl border border-sage-200 p-6 card-hover">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-sage-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-sage-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-sage-900">{feedback.author}</p>
                    <span className="text-xs text-sage-500">{feedback.timestamp}</span>
                  </div>
                  <p className="text-xs font-medium text-sage-600 mb-3">{feedback.category}</p>
                  <p className="text-sm text-sage-700 mb-4">{feedback.content}</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-xs text-sage-600 hover:text-sage-700">
                      <Eye className="w-3 h-3" /> View
                    </button>
                    <button className="flex items-center gap-2 text-xs text-sage-600 hover:text-sage-700">
                      <Reply className="w-3 h-3" /> Reply
                    </button>
                    <button className="flex items-center gap-2 text-xs text-sage-600 hover:text-sage-700">
                      <Archive className="w-3 h-3" /> Archive
                    </button>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    feedback.status === 'new'
                      ? 'bg-blue-100 text-blue-700'
                      : feedback.status === 'reviewed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-sage-100 text-sage-700'
                  }`}
                >
                  {feedback.status}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Feedback
